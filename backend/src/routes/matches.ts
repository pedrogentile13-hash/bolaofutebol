import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'
import { Match } from '../models/Match.js'

const router = Router()

const initialMatches = [
  {
    homeTeam: 'Brasil',
    awayTeam: 'Uruguai',
    homeTeamFlag: '🇧🇷',
    awayTeamFlag: '🇺🇾',
    date: new Date('2026-06-10T19:00:00'),
    time: '19:00',
    institution: 'FIFA',
    stage: 'Grupo A',
    finished: false
  },
  {
    homeTeam: 'Argentina',
    awayTeam: 'Peru',
    homeTeamFlag: '🇦🇷',
    awayTeamFlag: '🇵🇪',
    date: new Date('2026-06-11T20:00:00'),
    time: '20:00',
    institution: 'FIFA',
    stage: 'Grupo B',
    finished: false
  },
  {
    homeTeam: 'França',
    awayTeam: 'Itália',
    homeTeamFlag: '🇫🇷',
    awayTeamFlag: '🇮🇹',
    date: new Date('2026-06-12T18:00:00'),
    time: '18:00',
    institution: 'FIFA',
    stage: 'Grupo C',
    finished: false
  },
  {
    homeTeam: 'Alemanha',
    awayTeam: 'Espanha',
    homeTeamFlag: '🇩🇪',
    awayTeamFlag: '🇪🇸',
    date: new Date('2026-06-13T21:00:00'),
    time: '21:00',
    institution: 'FIFA',
    stage: 'Grupo D',
    finished: false
  },
  {
    homeTeam: 'Portugal',
    awayTeam: 'Holanda',
    homeTeamFlag: '🇵🇹',
    awayTeamFlag: '🇳🇱',
    date: new Date('2026-06-14T17:00:00'),
    time: '17:00',
    institution: 'FIFA',
    stage: 'Grupo E',
    finished: false
  }
]

async function seedMatches() {
  const count = await Match.countDocuments()
  if (count === 0) {
    await Match.insertMany(initialMatches)
    console.log('Matches seeded')
  }
}

seedMatches()

router.get('/upcoming', verifyToken, async (req: Request, res: Response) => {
  try {
    const upcoming = await Match.find({ finished: false }).sort({ date: 1 })
    res.json(upcoming)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const matches = await Match.find().sort({ date: 1 })
    res.json(matches)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const match = await Match.findById(req.params.id)

    if (!match) {
      return res.status(404).json({ message: 'Match not found' })
    }

    res.json(match)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
