import { Link } from 'react-router'
import type { ComponentDoc } from '../types'
import styles from './Pager.module.css'

interface PagerProps {
  previous?: ComponentDoc
  next?: ComponentDoc
}

export function Pager({ previous, next }: PagerProps) {
  return (
    <nav aria-label="Outros componentes" className={styles.pager}>
      {previous && (
        <Link to={`/components/${previous.slug}`} className={styles.link}>
          <span className={styles.direction}>← Anterior</span>
          <span className={styles.name}>{previous.name}</span>
        </Link>
      )}
      {next && (
        <Link to={`/components/${next.slug}`} className={styles.link} data-next>
          <span className={styles.direction}>Próximo →</span>
          <span className={styles.name}>{next.name}</span>
        </Link>
      )}
    </nav>
  )
}
