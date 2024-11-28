import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token is missing or invalid.' });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, secretKey) as JwtPayload;
    (req as any).user = payload;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token.' });
    return;
  }
};