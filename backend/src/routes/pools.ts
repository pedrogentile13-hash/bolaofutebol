import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'
import { Pool } from '../models/Pool.js'

const router = Router()

function generatePoolCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

router.post('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    if (!name) {
      return res.status(400).json({ message: 'Pool name required' })
    }

    const pool = new Pool({
      name,
      code: generatePoolCode(),
      owner: req.user?.id,
      members: [req.user?.id]
    })

    await pool.save()

    res.status(201).json({
      id: pool._id,
      name: pool.name,
      code: pool.code,
      owner: pool.owner,
      members: pool.members.length
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const userPools = await Pool.find({
      $or: [
        { owner: req.user?.id },
        { members: req.user?.id }
      ]
    })

    res.json(userPools.map(p => ({
      id: p._id,
      name: p.name,
      code: p.code,
      owner: p.owner,
      members: p.members.length,
      createdAt: p.createdAt
    })))
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/join', verifyToken, async (req: Request, res: Response) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ message: 'Pool code required' })
    }

    const pool = await Pool.findOne({ code })

    if (!pool) {
      return res.status(404).json({ message: 'Pool not found' })
    }

    if (pool.members.includes(req.user?.id as any)) {
      return res.status(409).json({ message: 'Already a member' })
    }

    pool.members.push(req.user?.id as any)
    await pool.save()

    res.json({
      id: pool._id,
      name: pool.name,
      code: pool.code,
      owner: pool.owner,
      members: pool.members.length
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
