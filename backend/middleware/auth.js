const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "Sovereign Access Denied. Token missing." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'paise_secret_vault');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Signature. Session terminated." });
    }
};
