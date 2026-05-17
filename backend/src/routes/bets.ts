import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'
import { supabase } from '../config/supabase.js'

const router = Router()

router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { matchId, homeScore, awayScore } = req.body

    if (matchId === undefined || homeScore === undefined || awayScore === undefined) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const { data: bet, error } = await supabase
      .from('bets')
      .insert([{
        user_id: req.user?.id,
        match_id: matchId,
        home_score: homeScore,
        away_score: awayScore,
        points: 0
      }])
      .select()
      .single()

    if (error) {
      return res.status(500).json({ message: 'Error creating bet' })
    }

    res.status(201).json(bet)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { data: bets, error } = await supabase
      .from('bets')
      .select('*')
      .eq('user_id', req.user?.id)

    if (error) {
      return res.status(500).json({ message: 'Error fetching bets' })
    }

    res.json(bets || [])
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
