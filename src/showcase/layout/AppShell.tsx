import { useId, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import styles from './AppShell.module.css'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()

  return (
    <div className={styles.shell}>
      <Header
        menuOpen={menuOpen}
        menuId={menuId}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />
      <div className={styles.body}>
        <Sidebar id={menuId} open={menuOpen} onNavigate={() => setMenuOpen(false)} />
        {menuOpen && (
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
          />
        )}
        <main className={styles.main}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
        <ScrollRestoration />
      </div>
    </div>
  )
}
