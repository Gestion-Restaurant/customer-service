import { Router } from 'express';
import {
    getCustomers,
    getCustomersByRole,
    getCustomerById,
    updateCustomer,
} from '../controllers/user.controller';

const router = Router();

// Get all users
router.get('/', (req, res) => {
    getCustomers(req, res);
});

// Get all users by role
router.get('/:role', (req, res) => {
    getCustomersByRole(req, res);
});

// Get user by ID
router.get('/:id', (req, res) => {
    getCustomerById(req, res);
});

router.put('/:id', (req, res) => {
    updateCustomer(req, res);
});

export default router;