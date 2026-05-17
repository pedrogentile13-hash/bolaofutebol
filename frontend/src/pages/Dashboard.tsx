import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Ranking from '../components/Ranking'
import Bets from '../components/Bets'
import Pool from '../components/Pool'
import Settings from '../components/Settings'
import '../styles/dashboard.css'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('bets')
  const { t } = useTranslation()

  const tabs = [
    { id: 'ranking', label: t('navigation.ranking') },
    { id: 'bets', label: t('navigation.bets') },
    { id: 'pool', label: t('navigation.pool') },
    { id: 'settings', label: t('navigation.settings') }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'ranking':
        return <Ranking />
      case 'bets':
        return <Bets />
      case 'pool':
        return <Pool />
      case 'settings':
        return <Settings />
      default:
        return <Bets />
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>⚽ {t('splash.appName')}</h1>
      </header>

      <nav className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  )
}
