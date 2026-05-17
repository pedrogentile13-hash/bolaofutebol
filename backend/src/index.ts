import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import rankingRoutes from './routes/ranking.js'
import betsRoutes from './routes/bets.js'
import poolsRoutes from './routes/pools.js'
import matchesRoutes from './routes/matches.js'
import testRoutes from './routes/test.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}))

app.use(express.json())

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/ranking', rankingRoutes)
app.use('/api/bets', betsRoutes)
app.use('/api/pools', poolsRoutes)
app.use('/api/matches', matchesRoutes)
app.use('/api/test', testRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Serve frontend files
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Connected to Supabase`)
  console.log(`Serving frontend from ${publicPath}`)
})
