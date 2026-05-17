import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import rankingRoutes from './routes/ranking.js'
import betsRoutes from './routes/bets.js'
import poolsRoutes from './routes/pools.js'
import matchesRoutes from './routes/matches.js'
import testRoutes from './routes/test.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/ranking', rankingRoutes)
app.use('/api/bets', betsRoutes)
app.use('/api/pools', poolsRoutes)
app.use('/api/matches', matchesRoutes)
app.use('/api/test', testRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Connected to Supabase`)
})
