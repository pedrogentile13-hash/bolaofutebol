import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { generateToken, verifyToken } from '../middleware/auth.js'

const router = Router()

const users: any[] = []

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    if (users.some(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    }

    users.push(user)

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
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' })
    }

    const user = users.find(u => u.email === email)

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' })
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

router.get('/me', verifyToken, (req: Request, res: Response) => {
  const user = users.find(u => u.id === req.user?.id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email
  })
})

export default router
