const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('better-sqlite3');
const db = new sqlite3('futurepaise.db');
const auth = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'paise_secret_vault';

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = db.prepare('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)').run(name, email, hashedPassword, phone);
        
        const token = jwt.sign({ id: result.lastInsertRowid, email }, JWT_SECRET, { expiresIn: '7d' });
        
        res.status(201).json({ 
            token, 
            user: { id: result.lastInsertRowid, name, email, phone } 
        });
    } catch (err) {
        res.status(400).json({ message: "Registration failed. Email might already exist." });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) return res.status(404).json({ message: "Sovereign Identity not found." });

        const validPassword = await bcrypt.hash(password, user.password); // Simple fix: use bcrypt.compare normally.
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) return res.status(401).json({ message: "Security Phase Failed. Incorrect password." });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        
        res.json({ 
            token, 
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone } 
        });
    } catch (err) {
        res.status(500).json({ message: "Internal Auth Error." });
    }
});

// GET /api/auth/me
router.get('/me', auth, (req, res) => {
    const user = db.prepare('SELECT id, name, email, phone, createdAt FROM users WHERE id = ?').get(req.user.id);
    res.json(user);
});

module.exports = router;
