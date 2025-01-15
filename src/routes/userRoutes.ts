import { Router } from 'express';
import {
    getCustomers,
    getCustomersByRole,
    getCustomerById,
} from '../controllers/userController';

const router = Router();

// Get all users
router.get('/users', (req, res) => {
    getCustomers(req, res);
});

// Get all users by role
router.get('/users/:role', (req, res) => {
    getCustomersByRole(req, res);
});

// Get user by ID
router.get('/users/:id', (req, res) => {
    getCustomerById(req, res);
});

export default router;