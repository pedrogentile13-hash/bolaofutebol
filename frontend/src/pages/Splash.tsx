import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/splash.css'

export default function Splash() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="splash-logo">⚽</div>
        <h1>{t('splash.appName')}</h1>
        <p>{t('splash.subtitle')}</p>
        <div className="splash-loader">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  )
}
