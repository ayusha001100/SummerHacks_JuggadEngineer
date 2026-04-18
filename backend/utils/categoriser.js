const axios = require('axios');

const RULES = {
  'Food Delivery': ['swiggy', 'zomato', 'blinkit', 'bigbasket', 'dunzo', 'shadowfax'],
  'Subscriptions': ['netflix', 'spotify', 'amazon prime', 'hotstar', 'zee5', 'youtube premium', 'apple', 'icloud'],
  'Transport': ['ola', 'uber', 'rapido', 'irctc', 'makemytrip', 'redbus', 'bmtc', 'metro', 'namma yatri'],
  'Shopping': ['amazon', 'flipkart', 'myntra', 'ajio', 'meesho', 'nykaa', 'reliance', 'dmart', 'blinkit'],
  'Entertainment': ['bookmyshow', 'pvr', 'inox', 'paytm movies'],
  'Coffee & Chai': ['cafe coffee day', 'starbucks', 'ccd', 'chaayos', 'blue tokai', 'tea', 'chai'],
  'Utilities': ['electricity', 'bescom', 'tata power', 'airtel', 'jio', 'vi', 'vodafone', 'bsnl', 'recharge'],
  'Dining Out': ['restaurant', 'hotel', 'biryani', 'sweets', 'bakery', 'pizza', 'burger', 'cafe'],
};

const categoriseTransaction = (description) => {
    const desc = description.toLowerCase();
    
    // Pass 1: Rule-based
    for (const [category, keywords] of Object.entries(RULES)) {
        if (keywords.some(k => desc.includes(k))) {
            return { category, confidence: 0.95 };
        }
    }

    // Pass 2: Fallback (can be extended to Claude API)
    return { category: 'Miscellaneous', confidence: 0.5 };
};

module.exports = { categoriseTransaction };
