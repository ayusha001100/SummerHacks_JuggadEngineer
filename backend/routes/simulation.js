const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sqlite3 = require('better-sqlite3');
const db = new sqlite3('futurepaise.db');

router.get('/run', auth, (req, res) => {
    const transactions = db.prepare('SELECT category, amount FROM transactions WHERE userId = ?').all(req.user.id);
    
    if (transactions.length === 0) {
        return res.json({ message: "No transaction history. Initialize data to run simulation." });
    }

    // Grouping by category
    const catTotals = {};
    transactions.forEach(t => {
        catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
    });

    // Strategy: Assume data is for last 90 days, so monthly avg = total / 3
    const categories = Object.keys(catTotals).map(cat => {
        const monthlyAvg = catTotals[cat] / 3;
        
        // FV Formula: FV = PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
        // r = 0.12 (12%), n = 12, t = 10
        const r = 0.12;
        const n = 12;
        const calcFV = (years) => {
            if (cat === 'Utilities') return 0; // Exclude non-discretionary
            const t = years;
            return Math.round(monthlyAvg * (((Math.pow(1 + r/n, n * t)) - 1) / (r/n)));
        };

        return {
            category: cat,
            monthlyAvg: Math.round(monthlyAvg),
            futureLoss: {
                "1y": calcFV(1),
                "5y": calcFV(5),
                "10y": calcFV(10),
                "20y": calcFV(20)
            }
        };
    });

    const totalMonthly = categories.reduce((sum, c) => sum + c.monthlyAvg, 0);
    const totalLoss10y = categories.reduce((sum, c) => sum + c.futureLoss["10y"], 0);

    res.json({
        summary: {
            userId: req.user.id,
            totalMonthlySpend: totalMonthly,
            totalFutureLoss10y: totalLoss10y
        },
        byCategory: categories.sort((a,b) => b.monthlyAvg - a.monthlyAvg)
    });
});

module.exports = router;
