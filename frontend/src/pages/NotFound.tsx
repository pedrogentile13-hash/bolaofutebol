import { Link } from 'react-router-dom'
import '../styles/notfound.css'

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link to="/" className="btn-primary">Voltar ao Início</Link>
    </div>
  )
}
