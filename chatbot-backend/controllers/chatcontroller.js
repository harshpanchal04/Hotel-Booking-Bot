const { getChatResponse } = require('../services/openaiService');
const axios = require('axios');

let conversationHistory = [];

const handleChat = async (req, res,messages) => {
    const { userId, message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'userId and message are required' });
    }

    const formattedHistory = conversationHistory.filter(conv => conv.userId === userId).map(conv => ({
        role: conv.role,
        content: conv.message
    }));

    try {
        const chatResponse = await getChatResponse(message, messages);
        res.json({ message: chatResponse });
    } catch (error) {
        console.error('Error handling chat:', error);
        res.status(500).json({ error: 'Failed to handle chat' });
    }
};

module.exports = { handleChat };
