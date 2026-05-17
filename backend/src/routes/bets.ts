import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'
import { Bet } from '../models/Bet.js'

const router = Router()

router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { matchId, homeScore, awayScore } = req.body

    if (matchId === undefined || homeScore === undefined || awayScore === undefined) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const bet = new Bet({
      userId: req.user?.id,
      matchId,
      homeScore,
      awayScore,
      points: 0
    })

    await bet.save()

    res.status(201).json(bet)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const userBets = await Bet.find({ userId: req.user?.id })
    res.json(userBets)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
