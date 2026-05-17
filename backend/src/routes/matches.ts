import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'
import { supabase } from '../config/supabase.js'

const router = Router()

const initialMatches = [
  {
    home_team: 'Brasil',
    away_team: 'Uruguai',
    home_team_flag: '🇧🇷',
    away_team_flag: '🇺🇾',
    date: new Date('2026-06-10T19:00:00').toISOString(),
    time: '19:00',
    institution: 'FIFA',
    stage: 'Grupo A',
    finished: false
  },
  {
    home_team: 'Argentina',
    away_team: 'Peru',
    home_team_flag: '🇦🇷',
    away_team_flag: '🇵🇪',
    date: new Date('2026-06-11T20:00:00').toISOString(),
    time: '20:00',
    institution: 'FIFA',
    stage: 'Grupo B',
    finished: false
  },
  {
    home_team: 'França',
    away_team: 'Itália',
    home_team_flag: '🇫🇷',
    away_team_flag: '🇮🇹',
    date: new Date('2026-06-12T18:00:00').toISOString(),
    time: '18:00',
    institution: 'FIFA',
    stage: 'Grupo C',
    finished: false
  },
  {
    home_team: 'Alemanha',
    away_team: 'Espanha',
    home_team_flag: '🇩🇪',
    away_team_flag: '🇪🇸',
    date: new Date('2026-06-13T21:00:00').toISOString(),
    time: '21:00',
    institution: 'FIFA',
    stage: 'Grupo D',
    finished: false
  },
  {
    home_team: 'Portugal',
    away_team: 'Holanda',
    home_team_flag: '🇵🇹',
    away_team_flag: '🇳🇱',
    date: new Date('2026-06-14T17:00:00').toISOString(),
    time: '17:00',
    institution: 'FIFA',
    stage: 'Grupo E',
    finished: false
  }
]

async function seedMatches() {
  const { count } = await supabase
    .from('matches')
    .select('*', { count: 'exact', head: true })

  if (count === 0) {
    await supabase
      .from('matches')
      .insert(initialMatches)
    console.log('Matches seeded')
  }
}

seedMatches()

router.get('/upcoming', verifyToken, async (req: Request, res: Response) => {
  try {
    const { data: matches, error } = await supabase
      .from('matches')
      .select('*')
      .eq('finished', false)
      .order('date', { ascending: true })

    if (error) {
      return res.status(500).json({ message: 'Error fetching matches' })
    }

    res.json(matches || [])
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { data: matches, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true })

    if (error) {
      return res.status(500).json({ message: 'Error fetching matches' })
    }

    res.json(matches || [])
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { data: match, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error || !match) {
      return res.status(404).json({ message: 'Match not found' })
    }

    res.json(match)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
