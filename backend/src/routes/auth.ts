import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { generateToken, verifyToken } from '../middleware/auth.js'
import { supabase } from '../config/supabase.js'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' })
    }

    const { data: user, error } = await supabase
      .from('users')
      .insert([{ name, email }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ message: 'Error creating user', error: error.message })
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    })

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email required' })
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return res.status(401).json({ message: 'User not found' })
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name
    })

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/me', verifyToken, async (req: Request, res: Response) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', req.user?.id)
      .single()

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
