import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/api'
import '../styles/bets.css'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamFlag: string
  awayTeamFlag: string
  date: string
  time: string
  institution?: string
}

interface BetData {
  matchId: string
  homeScore: number
  awayScore: number
}

export default function Bets() {
  const [matches, setMatches] = useState<Match[]>([])
  const [bets, setBets] = useState<Record<string, BetData>>({})
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      const response = await api.get('/matches/upcoming')
      setMatches(response.data)
    } catch (error) {
      console.error('Erro ao buscar jogos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScoreChange = (matchId: string, team: 'home' | 'away', score: number) => {
    setBets(prev => ({
      ...prev,
      [matchId]: {
        ...prev[matchId],
        matchId,
        [team === 'home' ? 'homeScore' : 'awayScore']: score
      }
    }))
  }

  const handleSaveBet = async (matchId: string) => {
    const bet = bets[matchId]
    if (!bet) return

    try {
      await api.post('/bets', bet)
      setMessage(t('bets.betSaved'))
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Erro ao salvar palpite:', error)
    }
  }

  if (loading) return <div className="loading">{t('common.loading')}</div>

  if (matches.length === 0) {
    return <div className="no-content">{t('bets.noUpcomingMatches')}</div>
  }

  return (
    <div className="bets-container">
      <h2>{t('bets.title')}</h2>
      {message && <div className="success-message">{message}</div>}

      <div className="matches-list">
        {matches.map(match => (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <span className="date">{match.date} às {match.time}</span>
              {match.institution && <span className="institution">{match.institution}</span>}
            </div>

            <div className="match-teams">
              <div className="team home-team">
                <span className="flag">{match.homeTeamFlag}</span>
                <span className="name">{match.homeTeam}</span>
              </div>

              <div className="vs">vs</div>

              <div className="team away-team">
                <span className="name">{match.awayTeam}</span>
                <span className="flag">{match.awayTeamFlag}</span>
              </div>
            </div>

            <div className="match-bet">
              <div className="score-input">
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={bets[match.id]?.homeScore || ''}
                  onChange={(e) => handleScoreChange(match.id, 'home', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <span className="dash">-</span>
              <div className="score-input">
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={bets[match.id]?.awayScore || ''}
                  onChange={(e) => handleScoreChange(match.id, 'away', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
              <button
                onClick={() => handleSaveBet(match.id)}
                className="btn-save"
              >
                {t('bets.save')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
