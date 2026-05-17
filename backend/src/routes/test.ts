import { Router, Request, Response } from 'express'
import { supabase } from '../config/supabase.js'

const router = Router()

router.get('/users', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      return res.json({ error: error.message, details: error })
    }

    res.json({ users: data })
  } catch (error) {
    res.json({ error: String(error) })
  }
})

export default router
