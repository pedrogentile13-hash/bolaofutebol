import { Router, Request, Response } from 'express'
import { verifyToken } from '../middleware/auth.js'
import { supabase } from '../config/supabase.js'

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

    const code = generatePoolCode()

    const { data: pool, error } = await supabase
      .from('pools')
      .insert([{
        name,
        code,
        owner_id: req.user?.id
      }])
      .select()
      .single()

    if (error) {
      return res.status(500).json({ message: 'Error creating pool' })
    }

    await supabase
      .from('pool_members')
      .insert([{
        pool_id: pool.id,
        user_id: req.user?.id
      }])

    res.status(201).json({
      id: pool.id,
      name: pool.name,
      code: pool.code,
      owner: pool.owner_id,
      members: 1
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const { data: pools, error } = await supabase
      .from('pools')
      .select(`
        id,
        name,
        code,
        owner_id,
        created_at,
        pool_members(count)
      `)
      .or(`owner_id.eq.${req.user?.id},pool_members.user_id.eq.${req.user?.id}`)

    if (error) {
      return res.status(500).json({ message: 'Error fetching pools' })
    }

    res.json(pools?.map(p => ({
      id: p.id,
      name: p.name,
      code: p.code,
      owner: p.owner_id,
      members: p.pool_members[0].count,
      createdAt: p.created_at
    })) || [])
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

    const { data: pool, error: poolError } = await supabase
      .from('pools')
      .select('id, name, code, owner_id')
      .eq('code', code)
      .single()

    if (poolError || !pool) {
      return res.status(404).json({ message: 'Pool not found' })
    }

    const { data: existing } = await supabase
      .from('pool_members')
      .select('id')
      .eq('pool_id', pool.id)
      .eq('user_id', req.user?.id)
      .single()

    if (existing) {
      return res.status(409).json({ message: 'Already a member' })
    }

    await supabase
      .from('pool_members')
      .insert([{
        pool_id: pool.id,
        user_id: req.user?.id
      }])

    const { data: members } = await supabase
      .from('pool_members')
      .select('count', { count: 'exact' })
      .eq('pool_id', pool.id)

    res.json({
      id: pool.id,
      name: pool.name,
      code: pool.code,
      owner: pool.owner_id,
      members: members?.length || 0
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
