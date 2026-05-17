import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

const mockRanking = [
  { position: 1, name: 'João Silva', points: 150, hits: 45 },
  { position: 2, name: 'Maria Santos', points: 145, hits: 43 },
  { position: 3, name: 'Pedro Costa', points: 140, hits: 42 },
  { position: 4, name: 'Ana Oliveira', points: 135, hits: 40 },
  { position: 5, name: 'Carlos Ferreira', points: 130, hits: 39 }
]

router.get('/', verifyToken, (req: Request, res: Response) => {
  res.json(mockRanking)
})

export default router
