import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/api'
import '../styles/pool.css'

interface PoolInfo {
  id: string
  name: string
  code: string
  members: number
  owner: string
  createdAt: string
}

export default function Pool() {
  const [pools, setPools] = useState<PoolInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [poolName, setPoolName] = useState('')
  const [poolCode, setPoolCode] = useState('')
  const [message, setMessage] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    fetchPools()
  }, [])

  const fetchPools = async () => {
    try {
      const response = await api.get('/pools')
      setPools(response.data)
    } catch (error) {
      console.error('Erro ao buscar bolões:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePool = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/pools', { name: poolName })
      setPoolName('')
      setShowCreateModal(false)
      setMessage(t('pool.title') + ' criado com sucesso!')
      fetchPools()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Erro ao criar bolão:', error)
    }
  }

  const handleJoinPool = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/pools/join', { code: poolCode })
      setPoolCode('')
      setShowJoinModal(false)
      setMessage(t('pool.title') + ' entrado com sucesso!')
      fetchPools()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Erro ao entrar no bolão:', error)
    }
  }

  if (loading) return <div className="loading">{t('common.loading')}</div>

  return (
    <div className="pool-container">
      <h2>{t('pool.title')}</h2>
      {message && <div className="success-message">{message}</div>}

      <div className="pool-actions">
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          {t('pool.createPool')}
        </button>
        <button
          onClick={() => setShowJoinModal(true)}
          className="btn-secondary"
        >
          {t('pool.joinPool')}
        </button>
      </div>

      {pools.length === 0 ? (
        <div className="no-content">{t('pool.noPoolsYet')}</div>
      ) : (
        <div className="pools-list">
          {pools.map(pool => (
            <div key={pool.id} className="pool-card">
              <div className="pool-header">
                <h3>{pool.name}</h3>
                <span className="pool-code">{pool.code}</span>
              </div>
              <div className="pool-info">
                <p><strong>{t('pool.owner')}:</strong> {pool.owner}</p>
                <p><strong>{t('pool.poolMembers')}:</strong> {pool.members}</p>
                <p><strong>{t('pool.createdAt')}:</strong> {new Date(pool.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{t('pool.createPool')}</h3>
            <form onSubmit={handleCreatePool}>
              <div className="form-group">
                <label>{t('pool.poolName')}</label>
                <input
                  type="text"
                  value={poolName}
                  onChange={(e) => setPoolName(e.target.value)}
                  required
                  placeholder="Nome do bolão"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-primary">
                  {t('common.save')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{t('pool.joinPool')}</h3>
            <form onSubmit={handleJoinPool}>
              <div className="form-group">
                <label>{t('pool.poolCode')}</label>
                <input
                  type="text"
                  value={poolCode}
                  onChange={(e) => setPoolCode(e.target.value)}
                  required
                  placeholder={t('pool.enterCode')}
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-primary">
                  {t('pool.join')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="btn-secondary"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
