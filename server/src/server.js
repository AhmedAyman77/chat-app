import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route';
import messageRouter from './routes/message.route';

dotenv.config();

const app = express();

// routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});