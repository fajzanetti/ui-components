import { useMemo } from 'react'
import { useParams } from 'react-router'
import { CodeBlock } from '../blocks/CodeBlock'
import { CodeTabs } from '../blocks/CodeTabs'
import { Example } from '../blocks/Example'
import { Pager } from '../blocks/Pager'
import { PropsTable } from '../blocks/PropsTable'
import { Toc, type TocItem } from '../blocks/Toc'
import prose from '../Prose.module.css'
import { categories, docs, findDoc } from '../registry'
import type { ComponentDoc } from '../types'
import styles from './ComponentPage.module.css'
import { NotFoundPage } from './NotFoundPage'

const SECTIONS = {
  usage: { id: 'uso', label: 'Uso' },
  examples: { id: 'exemplos', label: 'Exemplos' },
  source: { id: 'codigo-fonte', label: 'Código-fonte' },
  api: { id: 'api', label: 'API' },
} as const

export function ComponentPage() {
  const { slug } = useParams()
  const doc = findDoc(slug)

  if (!doc) return <NotFoundPage />
  // A key reinicia o estado dos exemplos e do índice ao trocar de componente.
  return <ComponentDocView key={doc.slug} doc={doc} />
}

function ComponentDocView({ doc }: { doc: ComponentDoc }) {
  const category = categories.find((item) => item.id === doc.category)
  const index = docs.indexOf(doc)

  const tocItems = useMemo<TocItem[]>(
    () => [
      SECTIONS.usage,
      {
        ...SECTIONS.examples,
        children: doc.examples.map((example) => ({ id: example.id, label: example.title })),
      },
      SECTIONS.source,
      SECTIONS.api,
    ],
    [doc],
  )

  return (
    <div className={styles.layout}>
      <article>
        <header className={prose.prose}>
          <p className={prose.eyebrow}>{category?.label}</p>
          <h1>{doc.name}</h1>
          <p className={prose.lead}>{doc.description}</p>
        </header>

        <h2 id={SECTIONS.usage.id} className={styles.h2}>
          {SECTIONS.usage.label}
        </h2>
        <div className={styles.snippet}>
          <CodeBlock code={`import { ${doc.name} } from '@/components/${doc.name}'`} lang="tsx" />
        </div>
        <Example example={doc.usage} />

        <h2 id={SECTIONS.examples.id} className={styles.h2}>
          {SECTIONS.examples.label}
        </h2>
        {doc.examples.map((example) => (
          <section key={example.id}>
            <h3 id={example.id} className={styles.h3}>
              {example.title}
            </h3>
            {example.description && <p className={styles.text}>{example.description}</p>}
            <Example example={example} />
          </section>
        ))}

        <h2 id={SECTIONS.source.id} className={styles.h2}>
          {SECTIONS.source.label}
        </h2>
        <p className={styles.text}>
          Copie os 3 arquivos para usar o componente. Os arquivos CSS funcionam em qualquer
          framework.
        </p>
        <CodeTabs name={doc.name} sources={doc.sources} />

        <h2 id={SECTIONS.api.id} className={styles.h2}>
          {SECTIONS.api.label}
        </h2>
        <PropsTable props={doc.props} />

        <Pager previous={docs[index - 1]} next={docs[index + 1]} />
      </article>

      <aside className={styles.toc}>
        <Toc items={tocItems} />
      </aside>
    </div>
  )
}
