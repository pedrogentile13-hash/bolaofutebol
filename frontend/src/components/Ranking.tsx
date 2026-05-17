import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/api'
import '../styles/ranking.css'

interface RankingEntry {
  position: number
  name: string
  points: number
  hits: number
  isPro?: boolean
}

export default function Ranking() {
  const [activeTab, setActiveTab] = useState('geral')
  const [ranking, setRanking] = useState<RankingEntry[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    fetchRanking()
  }, [])

  const fetchRanking = async () => {
    try {
      const response = await api.get('/ranking')
      setRanking(response.data)
    } catch (error) {
      console.error('Erro ao buscar ranking:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">{t('common.loading')}</div>

  const tabs = [
    { id: 'geral', icon: '🏆', label: 'Geral' },
    { id: 'equipes', icon: '👥', label: 'Equipes' },
    { id: 'perguntas', icon: '❓', label: 'Perguntas' }
  ]

  return (
    <div className="ranking-container">
      <div className="ranking-header-section">
        <h2>🏆 Ranking</h2>
        <div className="ranking-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`ranking-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ranking-promo">
        <div className="promo-card free">
          <span className="promo-badge">GRATIS</span>
          <p>Atualiza 1x ao dia.</p>
        </div>
        <div className="promo-card pro">
          <span className="promo-badge pro">⭐ PRO</span>
          <p>Atualiza em tempo real.</p>
        </div>
      </div>

      <div className="ranking-table">
        <div className="ranking-table-header">
          <div className="col-position">#</div>
          <div className="col-name">Participante</div>
          <div className="col-points">Pontos</div>
          <div className="col-hits">Acertos</div>
        </div>
        {ranking.map((entry, index) => (
          <div key={index} className={`ranking-row ${entry.isPro ? 'pro-user' : ''}`}>
            <div className="col-position">
              <span className={`position-badge position-${entry.position}`}>
                {entry.position}
              </span>
            </div>
            <div className="col-name">
              <span>{entry.name}</span>
              {entry.isPro && <span className="pro-badge">PRO</span>}
            </div>
            <div className="col-points">
              <span className="points-value">{entry.points}</span>
            </div>
            <div className="col-hits">
              <span className="hits-value">{entry.hits}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
