const express = require('express');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chatRoutes');
const cors = require('cors');

// const roomRoutes = require('./routes/roomRoutes');

const app = express();
const PORT = process.env.PORT || 5550;

app.use(bodyParser.json());
app.use(cors());
app.use('/chat', chatRoutes);

app.use((err, req, res, next) => {
    console.error('Internal server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
