import { Link } from 'react-router'
import { cx } from '../../lib/cx'
import styles from './Header.module.css'
import { MenuIcon } from './icons'
import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  menuOpen: boolean
  menuId: string
  onToggleMenu: () => void
}

export function Header({ menuOpen, menuId, onToggleMenu }: HeaderProps) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={cx(styles.iconButton, styles.menuButton)}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={onToggleMenu}
      >
        <MenuIcon />
      </button>
      <Link to="/" className={styles.brand}>
        UI Components
      </Link>
      <ThemeToggle className={styles.iconButton} />
    </header>
  )
}
