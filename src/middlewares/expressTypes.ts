import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  userId: number; 
}

export default AuthenticatedRequest;
