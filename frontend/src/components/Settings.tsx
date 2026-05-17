import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useAuthStore } from '../store/authStore'
import '../styles/settings.css'

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'pt-BR')

  const { t, i18n } = useTranslation()
  const { isDark, toggle } = useTheme()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    i18n.changeLanguage(lang)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="settings-section">
            <div className="profile-card">
              <div className="avatar">
                <span>👤</span>
              </div>
              <div className="profile-details">
                <h3>{user?.name || 'Usuário'}</h3>
                <p className="email">{user?.email || 'email@example.com'}</p>
              </div>
              <button className="btn-edit">✏️ Editar</button>
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div className="settings-section">
            <div className="setting-item">
              <div className="setting-label">
                <span className="icon">🌙</span>
                <div>
                  <strong>Tema Escuro</strong>
                  <p>Ativa o modo escuro</p>
                </div>
              </div>
              <button
                onClick={toggle}
                className={`toggle-switch ${isDark ? 'active' : ''}`}
              />
            </div>
            <div className="setting-item">
              <div className="setting-label">
                <span className="icon">🌐</span>
                <div>
                  <strong>Idioma</strong>
                  <p>Português ou English</p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="language-select"
              >
                <option value="pt-BR">🇧🇷 Português</option>
                <option value="en-US">🇺🇸 English</option>
              </select>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="settings-section">
            <div className="setting-item">
              <div className="setting-label">
                <span className="icon">🔔</span>
                <div>
                  <strong>Notificações</strong>
                  <p>Cutucoes recebidas</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="checkbox-toggle" />
            </div>
          </div>
        )

      case 'rules':
        return (
          <div className="settings-section">
            <div className="rules-card">
              <h3>📋 Regras do Bolão</h3>
              <div className="rules-list">
                <div className="rule-item">
                  <span className="rule-icon">✓</span>
                  <div>
                    <strong>Palpite Correto</strong>
                    <p>Vencedor correto: 1 ponto</p>
                  </div>
                </div>
                <div className="rule-item">
                  <span className="rule-icon">✓✓</span>
                  <div>
                    <strong>Placar Correto</strong>
                    <p>Placar exato: 3 pontos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="settings-section">
            <div className="contact-card">
              <h3>📞 Contato e Suporte</h3>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>contato@bolaofutebol.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🌐</span>
                <div>
                  <strong>Website</strong>
                  <p>www.bolaofutebol.com</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <div>
                  <strong>Suporte</strong>
                  <p>suporte@bolaofutebol.com</p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="settings-container">
      <h2>{t('settings.title')}</h2>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          {[
            { id: 'profile', label: t('settings.profile') },
            { id: 'appearance', label: t('settings.theme') },
            { id: 'notifications', label: t('settings.notifications') },
            { id: 'rules', label: t('settings.rules') },
            { id: 'contact', label: t('settings.contact') }
          ].map(item => (
            <button
              key={item.id}
              className={`settings-menu-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="settings-menu-item logout-btn"
          >
            {t('settings.logout')}
          </button>
        </aside>

        <div className="settings-content">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}
