import { NavLink } from 'react-router'
import { categories, docs } from '../registry'
import styles from './Sidebar.module.css'

interface SidebarProps {
  id: string
  open: boolean
  onNavigate: () => void
}

export function Sidebar({ id, open, onNavigate }: SidebarProps) {
  return (
    <aside id={id} className={styles.sidebar} data-open={open || undefined}>
      <nav aria-label="Navegação principal" className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink to="/" end className={styles.link} onClick={onNavigate}>
              Introdução
            </NavLink>
          </li>
          <li>
            <NavLink to="/styling" className={styles.link} onClick={onNavigate}>
              Estilização
            </NavLink>
          </li>
        </ul>

        {categories.map((category) => {
          const items = docs.filter((doc) => doc.category === category.id)
          if (items.length === 0) return null
          return (
            <section key={category.id}>
              <h2 className={styles.groupTitle}>{category.label}</h2>
              <ul className={styles.list}>
                {items.map((doc) => (
                  <li key={doc.slug}>
                    <NavLink
                      to={`/components/${doc.slug}`}
                      className={styles.link}
                      onClick={onNavigate}
                    >
                      {doc.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </nav>
    </aside>
  )
}
