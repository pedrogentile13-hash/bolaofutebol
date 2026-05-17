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
            <h3>{t('settings.profile')}</h3>
            <div className="profile-info">
              <div className="avatar-section">
                <div className="avatar-placeholder">👤</div>
                <button className="btn-secondary">{t('settings.avatar')}</button>
              </div>
              <div className="form-group">
                <label>{t('auth.name')}</label>
                <input type="text" value={user?.name || ''} disabled />
              </div>
              <div className="form-group">
                <label>{t('auth.email')}</label>
                <input type="email" value={user?.email || ''} disabled />
              </div>
            </div>
          </div>
        )

      case 'appearance':
        return (
          <div className="settings-section">
            <h3>{t('settings.theme')}</h3>
            <div className="appearance-settings">
              <div className="setting-item">
                <label>{t('settings.darkMode')}</label>
                <button
                  onClick={toggle}
                  className={`toggle-btn ${isDark ? 'active' : ''}`}
                >
                  {isDark ? '🌙' : '☀️'}
                </button>
              </div>
              <div className="setting-item">
                <label>{t('settings.language')}</label>
                <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
                  <option value="pt-BR">{t('settings.portuguese')}</option>
                  <option value="en-US">{t('settings.english')}</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="settings-section">
            <h3>{t('settings.notifications')}</h3>
            <div className="notification-settings">
              <div className="setting-item">
                <label>{t('settings.emailNotifications')}</label>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="setting-item">
                <label>{t('settings.pushNotifications')}</label>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        )

      case 'rules':
        return (
          <div className="settings-section">
            <h3>{t('settings.rules')}</h3>
            <div className="rules-content">
              <p>• {t('splash.subtitle')}</p>
              <p>• Palpite correto: 3 pontos</p>
              <p>• Acerto do vencedor: 1 ponto</p>
              <p>• Placar correto: 3 pontos</p>
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="settings-section">
            <h3>{t('settings.contact')}</h3>
            <div className="contact-info">
              <p>📧 Email: contato@bolaofutebol.com</p>
              <p>🌐 Website: www.bolaofutebol.com</p>
              <p>💬 Suporte: suporte@bolaofutebol.com</p>
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
