import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

const bets: any[] = []

router.post('/', verifyToken, (req: Request, res: Response) => {
  try {
    const { matchId, homeScore, awayScore } = req.body

    if (matchId === undefined || homeScore === undefined || awayScore === undefined) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const bet = {
      id: Date.now().toString(),
      userId: req.user?.id,
      matchId,
      homeScore,
      awayScore,
      points: 0,
      createdAt: new Date()
    }

    bets.push(bet)

    res.status(201).json(bet)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', verifyToken, (req: Request, res: Response) => {
  const userBets = bets.filter(b => b.userId === req.user?.id)
  res.json(userBets)
})

export default router
