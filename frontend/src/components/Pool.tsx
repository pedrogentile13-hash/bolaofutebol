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
  isOwner?: boolean
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
      setMessage('Bolão criado com sucesso!')
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
      setMessage('Bolão entrado com sucesso!')
      fetchPools()
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Erro ao entrar no bolão:', error)
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setMessage('Código copiado!')
    setTimeout(() => setMessage(''), 2000)
  }

  if (loading) return <div className="loading">{t('common.loading')}</div>

  return (
    <div className="pool-container">
      <div className="pools-header">
        <h2>👥 Meus Grupos</h2>
        <p>Selecione um grupo para ver o ranking</p>
      </div>

      {message && <div className="success-message">{message}</div>}

      <div className="pool-actions-grid">
        <button
          onClick={() => setShowCreateModal(true)}
          className="action-btn create-btn"
        >
          <span className="icon">+</span>
          <div>
            <strong>Criar novo grupo</strong>
            <p>Convide seus amigos</p>
          </div>
        </button>
        <button
          onClick={() => setShowJoinModal(true)}
          className="action-btn join-btn"
        >
          <span className="icon">🔑</span>
          <div>
            <strong>Fui convidado</strong>
            <p>Entrar com código</p>
          </div>
        </button>
      </div>

      {pools.length === 0 ? (
        <div className="no-pools-container">
          <div className="no-content">
            <p>Nenhum grupo ainda 😢</p>
            <small>Crie um novo grupo ou entre em um existente</small>
          </div>
        </div>
      ) : (
        <div className="pools-list">
          {pools.map(pool => (
            <div key={pool.id} className="pool-card">
              <div className="pool-card-header">
                <div>
                  <h3>{pool.name}</h3>
                  {pool.isOwner && <span className="owner-badge">👑 Admin</span>}
                </div>
                <button
                  onClick={() => copyToClipboard(pool.code)}
                  className="copy-btn"
                  title="Copiar código"
                >
                  📋 {pool.code}
                </button>
              </div>
              <div className="pool-card-stats">
                <div className="stat">
                  <span className="stat-icon">👥</span>
                  <div>
                    <span className="stat-label">Membros</span>
                    <span className="stat-value">{pool.members}</span>
                  </div>
                </div>
                <div className="stat">
                  <span className="stat-icon">👤</span>
                  <div>
                    <span className="stat-label">Admin</span>
                    <span className="stat-value">{pool.owner}</span>
                  </div>
                </div>
              </div>
              <button className="btn-view-ranking">Ver Ranking →</button>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Criar novo grupo</h3>
              <button
                className="close-btn"
                onClick={() => setShowCreateModal(false)}
              >✕</button>
            </div>
            <form onSubmit={handleCreatePool}>
              <div className="form-group">
                <label>Nome do grupo</label>
                <input
                  type="text"
                  value={poolName}
                  onChange={(e) => setPoolName(e.target.value)}
                  required
                  placeholder="Ex: Amigos da Faculdade"
                  autoFocus
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-primary">
                  Criar Grupo
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Entrar em um grupo</h3>
              <button
                className="close-btn"
                onClick={() => setShowJoinModal(false)}
              >✕</button>
            </div>
            <form onSubmit={handleJoinPool}>
              <div className="form-group">
                <label>Código do grupo</label>
                <input
                  type="text"
                  value={poolCode}
                  onChange={(e) => setPoolCode(e.target.value.toUpperCase())}
                  required
                  placeholder="Cole o código compartilhado"
                  autoFocus
                  maxLength={6}
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-primary">
                  Entrar no Grupo
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
