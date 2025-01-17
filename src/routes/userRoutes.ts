import { Router } from "express";
import { deleteUser, updateUser } from "../controllers/userControllers";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
});

router.patch('/update/:id', verifyToken, (req, res) => {
    updateUser(req, res);
});

router.delete('/delete/:id', verifyToken, (req, res) => {
    deleteUser(req, res);
});

export default router;
