import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';

dotenv.config();

const app = express();


// routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);


// use static assets if in production

const __dirname = path.resolve(path.resolve());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'dist')));

    // Handle SPA routing, return all requests to React app
    app.get(/.*/, (_, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    });
}


// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});