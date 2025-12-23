import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import { app, httpServer } from './config/socket.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';

(async() => {
    dotenv.config();

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))

    // connect to database
    await connectDB();

    // routes
    app.get('/health', (req, res) => {
        res.send('server is running');
    });

    app.use('/api/auth', authRouter);
    app.use('/api/messages', messageRouter);

    // use static assets if in production
    const __dirname = path.resolve();

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, "../client/dist")));
        // Handle SPA routing, return all requests to React app
        app.get(/.*/, (_, res) => {
            res.sendFile(path.join(__dirname, "../client/dist/index.html"));
        });
    }

    // error handling middleware
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    // start server
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();