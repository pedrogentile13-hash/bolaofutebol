import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { generateToken, verifyToken } from '../middleware/auth.js'
import { User } from '../models/User.js'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save()

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    })

    res.status(201).json({
      token,
      user: {
        id: user._id,
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

    const user = await User.findOne({ email })

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name
    })

    res.json({
      token,
      user: {
        id: user._id,
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
    const user = await User.findById(req.user?.id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
