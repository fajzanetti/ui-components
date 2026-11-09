import { Link } from 'react-router'
import prose from '../Prose.module.css'

export function NotFoundPage() {
  return (
    <article className={prose.prose}>
      <h1>Página não encontrada</h1>
      <p>
        <Link to="/">Volte para a Introdução.</Link>
      </p>
    </article>
  )
}
