import { useId, useState, type KeyboardEvent } from 'react'
import type { ComponentSources } from '../types'
import { CodeBlock } from './CodeBlock'
import styles from './CodeTabs.module.css'

const TABS = [
  { id: 'tsx', label: 'TypeScript', lang: 'tsx', extension: '.tsx' },
  { id: 'css', label: 'CSS', lang: 'css', extension: '.module.css' },
  { id: 'animatedCss', label: 'CSS Animado', lang: 'css', extension: '.animated.module.css' },
] as const

type TabId = (typeof TABS)[number]['id']

interface CodeTabsProps {
  name: string
  sources: ComponentSources
}

export function CodeTabs({ name, sources }: CodeTabsProps) {
  const [activeId, setActiveId] = useState<TabId>('tsx')
  const baseId = useId()
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0]
  const panelId = `${baseId}-panel`

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (step === 0) return
    const index = TABS.findIndex((tab) => tab.id === activeId)
    const next = TABS[(index + step + TABS.length) % TABS.length]
    setActiveId(next.id)
    document.getElementById(`${baseId}-${next.id}`)?.focus()
  }

  return (
    <div className={styles.tabs}>
      <div role="tablist" aria-label="Código do componente" className={styles.list} onKeyDown={onKeyDown}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`${baseId}-${tab.id}`}
            type="button"
            role="tab"
            className={styles.tab}
            aria-selected={tab.id === activeId}
            aria-controls={panelId}
            tabIndex={tab.id === activeId ? 0 : -1}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div id={panelId} role="tabpanel" aria-labelledby={`${baseId}-${active.id}`}>
        <CodeBlock
          code={sources[active.id]}
          lang={active.lang}
          fileName={`${name}${active.extension}`}
        />
      </div>
    </div>
  )
}
