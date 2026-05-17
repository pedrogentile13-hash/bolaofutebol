import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

const pools: any[] = []

function generatePoolCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

router.post('/', verifyToken, (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Pool name required' })
    }

    const pool = {
      id: Date.now().toString(),
      name,
      code: generatePoolCode(),
      owner: req.user?.name,
      members: [req.user?.id],
      createdAt: new Date()
    }

    pools.push(pool)

    res.status(201).json(pool)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', verifyToken, (req: Request, res: Response) => {
  const userPools = pools.filter(p =>
    p.members.includes(req.user?.id) || p.owner === req.user?.id
  )

  res.json(userPools.map(p => ({
    ...p,
    members: p.members.length
  })))
})

router.post('/join', verifyToken, (req: Request, res: Response) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ message: 'Pool code required' })
    }

    const pool = pools.find(p => p.code === code)

    if (!pool) {
      return res.status(404).json({ message: 'Pool not found' })
    }

    if (pool.members.includes(req.user?.id)) {
      return res.status(409).json({ message: 'Already a member' })
    }

    pool.members.push(req.user?.id)

    res.json({
      ...pool,
      members: pool.members.length
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
