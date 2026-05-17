import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

const matches = [
  {
    id: '1',
    homeTeam: 'Brasil',
    awayTeam: 'Uruguai',
    homeTeamFlag: '🇧🇷',
    awayTeamFlag: '🇺🇾',
    date: '2026-06-10',
    time: '19:00',
    institution: 'FIFA',
    stage: 'Grupo A',
    finished: false
  },
  {
    id: '2',
    homeTeam: 'Argentina',
    awayTeam: 'Peru',
    homeTeamFlag: '🇦🇷',
    awayTeamFlag: '🇵🇪',
    date: '2026-06-11',
    time: '20:00',
    institution: 'FIFA',
    stage: 'Grupo B',
    finished: false
  },
  {
    id: '3',
    homeTeam: 'França',
    awayTeam: 'Itália',
    homeTeamFlag: '🇫🇷',
    awayTeamFlag: '🇮🇹',
    date: '2026-06-12',
    time: '18:00',
    institution: 'FIFA',
    stage: 'Grupo C',
    finished: false
  },
  {
    id: '4',
    homeTeam: 'Alemanha',
    awayTeam: 'Espanha',
    homeTeamFlag: '🇩🇪',
    awayTeamFlag: '🇪🇸',
    date: '2026-06-13',
    time: '21:00',
    institution: 'FIFA',
    stage: 'Grupo D',
    finished: false
  },
  {
    id: '5',
    homeTeam: 'Portugal',
    awayTeam: 'Holanda',
    homeTeamFlag: '🇵🇹',
    awayTeamFlag: '🇳🇱',
    date: '2026-06-14',
    time: '17:00',
    institution: 'FIFA',
    stage: 'Grupo E',
    finished: false
  }
]

router.get('/upcoming', verifyToken, (req: Request, res: Response) => {
  const upcoming = matches.filter(m => !m.finished)
  res.json(upcoming)
})

router.get('/', verifyToken, (req: Request, res: Response) => {
  res.json(matches)
})

router.get('/:id', verifyToken, (req: Request, res: Response) => {
  const match = matches.find(m => m.id === req.params.id)

  if (!match) {
    return res.status(404).json({ message: 'Match not found' })
  }

  res.json(match)
})

export default router
