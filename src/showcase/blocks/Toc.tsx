import { useEffect, useMemo, useState } from 'react'
import styles from './Toc.module.css'

export interface TocItem {
  id: string
  label: string
  children?: TocItem[]
}

// Distância do topo da tela, em px, em que uma seção passa a ser a seção atual.
const ACTIVE_OFFSET = 120

function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    function update() {
      let current = ids[0]
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id
      }
      setActive(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [ids])

  return active
}

export function Toc({ items }: { items: TocItem[] }) {
  const ids = useMemo(
    () => items.flatMap((item) => [item.id, ...(item.children ?? []).map((child) => child.id)]),
    [items],
  )
  const active = useActiveSection(ids)

  // As rotas já usam o hash da URL. Por isso o índice rola a página com um botão, sem âncora.
  function renderItem(item: TocItem) {
    return (
      <li key={item.id}>
        <button
          type="button"
          className={styles.link}
          aria-current={item.id === active ? 'location' : undefined}
          onClick={() => document.getElementById(item.id)?.scrollIntoView()}
        >
          {item.label}
        </button>
        {item.children && <ul className={styles.list}>{item.children.map(renderItem)}</ul>}
      </li>
    )
  }

  return (
    <nav aria-label="Nesta página">
      <p className={styles.title}>Nesta página</p>
      <ul className={styles.list}>{items.map(renderItem)}</ul>
    </nav>
  )
}
