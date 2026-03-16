const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/knowledgeBase.json');

// Helper to read data
const readKnowledgeBase = () => {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(rawData);
};

// Get all knowledge base data
router.get('/', (req, res) => {
    try {
        const knowledgeBase = readKnowledgeBase();
        res.json(knowledgeBase);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving knowledge base data', error: error.message });
    }
});

// Update knowledge base data
router.put('/', (req, res) => {
    try {
        const newData = req.body;
        // Basic validation: ensure it's an object
        if (typeof newData !== 'object' || newData === null || Array.isArray(newData)) {
             return res.status(400).json({ message: 'Invalid data format. Expected a JSON object.' });
        }
        
        // Write the new data to the file
        fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2), 'utf-8');
        res.json({ message: 'Knowledge base updated successfully', data: newData });
    } catch (error) {
        res.status(500).json({ message: 'Error updating knowledge base', error: error.message });
    }
});

module.exports = router;
