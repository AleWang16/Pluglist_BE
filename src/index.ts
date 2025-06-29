import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import plugs from './routes/plugs';
import trust from './routes/trust';
import { verifyApiKey } from './middleware/auth';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const router = express.Router();
plugs(router, verifyApiKey);
trust(router, verifyApiKey);

app.use('/api', router);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});