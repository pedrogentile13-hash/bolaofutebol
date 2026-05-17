import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthPayload } from '../types/index.js'

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload
    }
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as AuthPayload
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  })
}
