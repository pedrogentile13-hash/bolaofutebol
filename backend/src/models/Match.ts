import mongoose from 'mongoose'

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  homeTeamFlag: {
    type: String,
    required: true
  },
  awayTeamFlag: {
    type: String,
    required: true
  },
  homeTeamScore: Number,
  awayTeamScore: Number,
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  institution: String,
  stage: String,
  finished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Match = mongoose.model('Match', matchSchema)
