import { Router } from 'express';
import {
    registerUser,
    loginUser,
    verifyUser,
} from '../controllers/auth.controller';

const router = Router();

// Register a new user
router.post('/register', (req, res) => {
    registerUser(req, res);
});

// Login a user
router.post('/login', (req, res) => {
    loginUser(req, res);
});

// Verify a user
router.get('/verify/:email/:token', (req, res) => {
    verifyUser(req, res);
});

export default router;