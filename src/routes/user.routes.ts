// routes/userRoutes.ts
import express from 'express';
import validateUserMiddleware from '../middlewares/validation.middleware';
import {registerUser,loginUser,logoutUser} from '../controllers/user.controller';
import {deleteUser, updateUser, getUserByName} from '../controllers/modifyUser.controller';
const router = express.Router();

router.post('/register', validateUserMiddleware, registerUser);
router.get('/findUser/:username', getUserByName);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.delete('/users', deleteUser); 
router.put('/users/:id', updateUser); 

export default router;