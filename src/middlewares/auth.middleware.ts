import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthenticatedRequest from './expressTypes';

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {

    // Get the JWT token from the request headers or cookies, depending on your implementation
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.jwt;

    if (!token) {
      throw new Error('Unauthorized: Missing JWT token');
    }

    // Verify the token using your JWT secret key
    const decodedToken = jwt.verify(token, 'your-secret-key') as { userId: number };
    req.userId = decodedToken.userId; // Add the user ID to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export default authMiddleware;
