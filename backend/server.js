const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sqlite3 = require('better-sqlite3');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Initialization (SQLite for Hackathon Speed)
const db = new sqlite3('futurepaise.db');

// Create Tables
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    whatsappOptIn BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    date TEXT,
    description TEXT,
    amount REAL,
    category TEXT,
    confidence REAL,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    purpose TEXT,
    targetAmount REAL,
    targetYears INTEGER,
    plan TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
  )
`).run();

// Root Info
app.get('/', (req, res) => {
    res.json({ status: "FuturePaise Sovereign Engine Active", env: "Hackathon Mode" });
});

// Import Routes (To be created)
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const simulationRoutes = require('./routes/simulation');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/simulation', simulationRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Sovereign Backend running on http://localhost:${PORT}`);
});

module.exports = db;
