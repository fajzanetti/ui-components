import prose from '../Prose.module.css'
import type { PropDoc } from '../types'

export function PropsTable({ props }: { props: Record<string, PropDoc> }) {
  return (
    <div className={prose.tableScroll}>
      <table>
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Tipo</th>
            <th scope="col">Padrão</th>
            <th scope="col">Obrigatória</th>
            <th scope="col">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props).map(([name, prop]) => (
            <tr key={name}>
              <th scope="row">
                <code>{name}</code>
              </th>
              <td>
                <code>{prop.type}</code>
              </td>
              <td>{prop.default ? <code>{prop.default}</code> : '—'}</td>
              <td>{prop.required ? 'Sim' : 'Não'}</td>
              <td>{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
