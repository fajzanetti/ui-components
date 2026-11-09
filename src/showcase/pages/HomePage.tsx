import { Link } from 'react-router'
import prose from '../Prose.module.css'
import { categories, docs } from '../registry'

export function HomePage() {
  return (
    <article className={prose.prose}>
      <h1>UI Components</h1>
      <p className={prose.lead}>
        Componentes UI feitos do zero com TypeScript e CSS puro. O projeto não usa biblioteca de UI
        de terceiros.
      </p>

      <h2>Dois estilos por componente</h2>
      <ul>
        <li>
          <strong>Animado:</strong> o estilo padrão. Um segundo arquivo CSS adiciona transições e
          keyframes.
        </li>
        <li>
          <strong>Normal:</strong> o mesmo componente com a prop <code>disableAnimation</code>. Os
          estados mudam sem transição.
        </li>
      </ul>
      <p>Os dois estilos são responsivos. Mude a largura da janela para testar.</p>

      <h2>Como copiar um componente</h2>
      <ol>
        <li>
          Copie a pasta do componente em <code>src/components</code>.
        </li>
        <li>
          Copie <code>src/styles/tokens.css</code>, <code>src/styles/themes.css</code> e{' '}
          <code>src/lib/cx.ts</code>.
        </li>
        <li>
          Em outro framework, reescreva só o arquivo <code>.tsx</code>. Os arquivos CSS funcionam
          sem mudança.
        </li>
      </ol>

      <h2>Componentes</h2>
      {categories.map((category) => {
        const items = docs.filter((doc) => doc.category === category.id)
        if (items.length === 0) return null
        return (
          <section key={category.id}>
            <h3>{category.label}</h3>
            <ul>
              {items.map((doc) => (
                <li key={doc.slug}>
                  <Link to={`/components/${doc.slug}`}>{doc.name}</Link>: {doc.description}
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </article>
  )
}
