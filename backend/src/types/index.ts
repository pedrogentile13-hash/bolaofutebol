export interface User {
  id: string
  name: string
  email: string
  password: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamFlag: string
  awayTeamFlag: string
  homeTeamScore?: number
  awayTeamScore?: number
  date: Date
  time: string
  institution?: string
  stage: string
  finished: boolean
}

export interface Bet {
  id: string
  userId: string
  matchId: string
  homeScore: number
  awayScore: number
  points: number
  createdAt: Date
  updatedAt: Date
}

export interface Pool {
  id: string
  name: string
  code: string
  owner: string
  members: string[]
  rules?: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthPayload {
  id: string
  email: string
  name: string
}
