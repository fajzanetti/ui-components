import { useEffect, useState } from 'react'
import { cx } from '../../lib/cx'
import styles from './CodeBlock.module.css'
import { highlight, type CodeLang } from './highlight'

// Um código menor que este limite aparece inteiro.
const COLLAPSE_MIN_LINES = 9

interface CodeBlockProps {
  code: string
  lang: CodeLang
  fileName?: string
  collapsible?: boolean
}

export function CodeBlock({ code, lang, fileName, collapsible = false }: CodeBlockProps) {
  const source = code.trimEnd()
  const [highlighted, setHighlighted] = useState<{ source: string; html: string }>()
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const canCollapse = collapsible && source.split('\n').length >= COLLAPSE_MIN_LINES
  const collapsed = canCollapse && !expanded

  useEffect(() => {
    let active = true
    highlight(source, lang).then((html) => {
      if (active) setHighlighted({ source, html })
    })
    return () => {
      active = false
    }
  }, [source, lang])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copy() {
    await navigator.clipboard.writeText(source)
    setCopied(true)
  }

  // O HTML do highlight só vale para o código que o gerou.
  const html = highlighted?.source === source ? highlighted.html : undefined
  const codeClass = cx(styles.code, !collapsible && styles.limited)

  return (
    <div className={styles.block} data-collapsed={collapsed || undefined}>
      {fileName && <div className={styles.fileName}>{fileName}</div>}
      <button type="button" className={styles.copy} onClick={copy}>
        {copied ? 'Copiado' : 'Copiar'}
      </button>
      {html ? (
        <div className={codeClass} dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div className={codeClass}>
          <pre>
            <code>{source}</code>
          </pre>
        </div>
      )}
      {canCollapse && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Recolher código' : 'Expandir código'}
        </button>
      )}
    </div>
  )
}
