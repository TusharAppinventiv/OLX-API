// controllers/userController.ts
import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import UserService from '../services/user.service';
import loginService from '../services/login.service';
import redisClient from '../utils/redis/redis';

  const registerUser = async (req: Request, res: Response) => {
  const {
    id,
    username,
    email,
    password,
    address,
    profile_photo,
    mobNumber,
    gender,
    dob,
    firstName,
    lastName,
  } = req.body;

  if (UserService.isUserAlreadyRegistered(email, username, mobNumber)) {
    return res.status(409).json({ error: 'Email, username or mobNumber already registered' });
  }

  const hashedPassword =  await bcrypt.hash(password, 10); // Use 10 rounds of salting

const newUser = await UserModel.create({
    id,
    username,
    email,
    password : hashedPassword,
    address,
    profile_photo,
    mobNumber,
    gender,
    dob,
    firstName,
    lastName,
    status : true,
    session : false,
  });

  const registeredUser = UserService.registerUser(newUser);

  return res.status(200).json({ message: 'Registration successful', user: registeredUser });
};


 const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await loginService(email, password);

  await redisClient.set(`session:${email}`, 'true');

  if (!token) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  return res.status(200).json({ message: 'Login successful', token });
};

const logoutUser = async (req: Request, res: Response) => {
  const { e_mail} = req.body;
  await redisClient.set(`session:${e_mail}`, 'false');

  return res.status(200).json({ message: 'Logout successful' });
};

export {registerUser,loginUser,logoutUser}