const express = require('express');
const router = express.Router();
const multer = require('multer');
const { parse } = require('csv-parse/sync');
const fs = require('fs');
const auth = require('../middleware/auth');
const { categoriseTransaction } = require('../utils/categoriser');
const sqlite3 = require('better-sqlite3');
const db = new sqlite3('futurepaise.db');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('csv'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No data stream received." });

    const content = fs.readFileSync(req.file.path, 'utf8');
    const records = parse(content, { columns: true, skip_empty_lines: true });

    const processed = [];
    
    records.forEach(row => {
        // Indian Bank Detection Logic
        let date = row['Date'] || row['Txn Date'] || row['Transaction Date'] || row['Tran Date'];
        let description = row['Narration'] || row['Description'] || row['Transaction Remarks'] || row['PARTICULARS'];
        let debit = parseFloat(row['Debit Amount'] || row['Debit'] || row['Withdrawal Amount (INR)'] || row['DR'] || 0);

        if (debit > 0) {
            // Ignore internal transfers
            const descLower = description.toLowerCase();
            const ignoreList = ['neft own', 'transfer to fd', 'self', 'salary', 'credit card payment'];
            if (ignoreList.some(k => descLower.includes(k))) return;

            const { category, confidence } = categoriseTransaction(description);
            
            const stmt = db.prepare('INSERT INTO transactions (userId, date, description, amount, category, confidence) VALUES (?, ?, ?, ?, ?, ?)');
            stmt.run(req.user.id, date, description, debit, category, confidence);
            
            processed.push({ date, description, amount: debit, category });
        }
    });

    fs.unlinkSync(req.file.path); // Clean up
    res.json({ message: "Wealth fabric analysed.", count: processed.length, data: processed });
});

router.get('/', auth, (req, res) => {
    const transactions = db.prepare('SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC').all(req.user.id);
    res.json(transactions);
});

module.exports = router;
