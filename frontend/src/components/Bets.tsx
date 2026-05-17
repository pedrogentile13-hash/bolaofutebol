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
  finished?: boolean
  homeTeamScore?: number
  awayTeamScore?: number
}

interface BetData {
  matchId: string
  homeScore: number
  awayScore: number
}

export default function Bets() {
  const [activeTab, setActiveTab] = useState('palpites')
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

  const tabs = [
    { id: 'palpites', icon: '🎯', label: 'Palpites' },
    { id: 'perguntas', icon: '❓', label: 'Perguntas' }
  ]

  const groupedMatches = matches.reduce((acc, match) => {
    const date = match.date
    if (!acc[date]) acc[date] = []
    acc[date].push(match)
    return acc
  }, {} as Record<string, Match[]>)

  return (
    <div className="bets-container">
      <div className="bets-header">
        <h2>Palpites</h2>
        <p>Faça seus palpites e responda perguntas</p>
      </div>

      <div className="bets-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`bets-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {message && <div className="success-message">{message}</div>}

      {activeTab === 'palpites' && (
        <div className="matches-container">
          {Object.entries(groupedMatches).map(([date, dateMatches]) => (
            <div key={date} className="matches-by-date">
              <div className="date-header">
                <span className="date-label">{date}</span>
              </div>
              <div className="matches-list">
                {dateMatches.map(match => (
                  <div key={match.id} className="match-card">
                    <div className="match-top">
                      <span className="match-time">{match.time} EM BREVE</span>
                      {match.institution && <span className="institution">{match.institution}</span>}
                    </div>

                    <div className="match-content">
                      <div className="match-teams">
                        <div className="team home-team">
                          <span className="flag">{match.homeTeamFlag}</span>
                          <span className="country">{match.homeTeam}</span>
                        </div>

                        <div className="match-vs">vs</div>

                        <div className="team away-team">
                          <span className="flag">{match.awayTeamFlag}</span>
                          <span className="country">{match.awayTeam}</span>
                        </div>
                      </div>

                      <div className="match-footer">
                        <div className="score-selector">
                          <div className="score-input">
                            <button
                              className="score-btn minus"
                              onClick={() => handleScoreChange(match.id, 'home', Math.max(0, (bets[match.id]?.homeScore || 0) - 1))}
                            >−</button>
                            <input
                              type="number"
                              min="0"
                              max="99"
                              value={bets[match.id]?.homeScore || '0'}
                              onChange={(e) => handleScoreChange(match.id, 'home', Math.max(0, parseInt(e.target.value) || 0))}
                              readOnly
                            />
                            <button
                              className="score-btn plus"
                              onClick={() => handleScoreChange(match.id, 'home', (bets[match.id]?.homeScore || 0) + 1)}
                            >+</button>
                          </div>
                          <span className="dash">-</span>
                          <div className="score-input">
                            <button
                              className="score-btn minus"
                              onClick={() => handleScoreChange(match.id, 'away', Math.max(0, (bets[match.id]?.awayScore || 0) - 1))}
                            >−</button>
                            <input
                              type="number"
                              min="0"
                              max="99"
                              value={bets[match.id]?.awayScore || '0'}
                              onChange={(e) => handleScoreChange(match.id, 'away', Math.max(0, parseInt(e.target.value) || 0))}
                              readOnly
                            />
                            <button
                              className="score-btn plus"
                              onClick={() => handleScoreChange(match.id, 'away', (bets[match.id]?.awayScore || 0) + 1)}
                            >+</button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSaveBet(match.id)}
                          className="btn-save"
                        >
                          Enviar Palpite →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'perguntas' && (
        <div className="perguntas-container">
          <div className="no-content">Em breve - Perguntas sobre o torneio</div>
        </div>
      )}
    </div>
  )
}
