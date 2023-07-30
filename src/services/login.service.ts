import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

const SECRET_KEY = 'your_secret_key'; 

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
  const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '10h' });
  return token;
};

export default loginService;
