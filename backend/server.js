const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let messages = [];
let visitorCount = 0;

app.get('/', (req, res) => {
    res.json({ message: 'Hiwot Portfolio API is running!', status: 'active' });
});

app.get('/api/visitors', (req, res) => {
    visitorCount++;
    res.json({ count: visitorCount });
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    
    const newMessage = {
        id: messages.length + 1,
        name,
        email,
        message,
        date: new Date(),
        ip: req.ip
    };
    
    messages.push(newMessage);
    console.log('New message from Hiwot portfolio:', newMessage);
    
    res.json({ 
        success: true, 
        message: 'Message received successfully!',
        messageId: newMessage.id
    });
});

app.get('/api/messages', (req, res) => {
    res.json({ 
        total: messages.length,
        messages: messages 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Hiwot Portfolio Backend running on http://localhost:${PORT}`);
    console.log(`📝 Test API: http://localhost:${PORT}/api/visitors`);
    console.log(`💬 Messages: http://localhost:${PORT}/api/messages`);
});