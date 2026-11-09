import type { ExampleDoc } from '../types'
import { CodeBlock } from './CodeBlock'
import styles from './Example.module.css'

export function Example({ example }: { example: ExampleDoc }) {
  return (
    <div className={styles.example}>
      <div className={styles.preview}>
        <example.Component />
      </div>
      <div className={styles.code}>
        <CodeBlock code={example.code} lang="tsx" collapsible />
      </div>
    </div>
  )
}
