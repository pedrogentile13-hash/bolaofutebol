import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/api'
import '../styles/ranking.css'

interface RankingEntry {
  position: number
  name: string
  points: number
  hits: number
}

export default function Ranking() {
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

  return (
    <div className="ranking-container">
      <h2>{t('ranking.title')}</h2>
      <div className="ranking-table">
        <div className="ranking-header">
          <div className="col-position">{t('ranking.position')}</div>
          <div className="col-name">{t('ranking.name')}</div>
          <div className="col-points">{t('ranking.points')}</div>
          <div className="col-hits">{t('ranking.hits')}</div>
        </div>
        {ranking.map((entry, index) => (
          <div key={index} className="ranking-row">
            <div className="col-position">
              <span className="position-badge">{entry.position}</span>
            </div>
            <div className="col-name">{entry.name}</div>
            <div className="col-points">{entry.points}</div>
            <div className="col-hits">{entry.hits}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
