import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import dotenv from 'dotenv';

// Load the environment variables from .env file
dotenv.config();

const loginService = async (email: string, password: string): Promise<string | null> => {
  // Find the user by their email
  const user = await UserModel.findByEmail(email);
  if (!user) {
    return null; // User not found
  }

  // Validate user's password
  const isPasswordValid = await user.validatePassword(password);
  if (!isPasswordValid) {
    return null; // Invalid password
  }

  // Generate and return the JWT token
  console.log(process.env.SECRET_KEY)
console.log(process.env.EXPIRES_IN)
  const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
  console.log(process.env.SECRET_KEY)
//   console.log(expiresIn  =process.env.EXPIRES_IN);

  return token;
};

export default loginService;