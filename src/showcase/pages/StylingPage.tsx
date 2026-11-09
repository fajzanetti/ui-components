import prose from '../Prose.module.css'

const COMPARISON: ReadonlyArray<readonly [string, string, string, string]> = [
  ['Modelo', 'Classes utilitárias no markup', 'Arquivo .module.css com escopo local', 'CSS escrito dentro do TypeScript'],
  ['Onde fica o estilo', 'No JSX (className)', 'Em arquivo CSS separado', 'No arquivo do componente'],
  ['Custo em runtime', 'Zero', 'Zero', 'Gera e injeta CSS no navegador'],
  ['Dependência', 'Tailwind + plugin de build', 'Nenhuma (nativo no Vite)', 'Biblioteca + runtime'],
  ['Estilo dinâmico', 'Classes condicionais', 'Atributos data-* e custom properties', 'Props dentro do template'],
  ['Portabilidade do estilo', 'Baixa: o estilo está preso ao markup', 'Alta: o .css funciona em qualquer framework', 'Baixa: só React'],
  ['Curva de aprendizado', 'Decorar utilitários', 'Saber CSS', 'Saber CSS + API da lib'],
]

export function StylingPage() {
  return (
    <article className={prose.prose}>
      <h1>Estilização</h1>
      <p className={prose.lead}>
        Este projeto usa CSS Modules com CSS nativo. Esta página compara as 3 abordagens mais
        comuns e justifica a escolha.
      </p>

      <h2>Comparativo</h2>
      <div className={prose.tableScroll}>
        <table>
          <thead>
            <tr>
              <th scope="col">Critério</th>
              <th scope="col">Tailwind CSS</th>
              <th scope="col">CSS Modules</th>
              <th scope="col">Styled Components</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map(([criterion, ...cells]) => (
              <tr key={criterion}>
                <th scope="row">{criterion}</th>
                {cells.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Tailwind CSS (utility-first)</h2>
      <ul>
        <li>
          <strong>Prós:</strong> produz telas rápido. Impõe uma escala de design consistente. Gera
          um CSS final pequeno. Não exige nomear classes.
        </li>
        <li>
          <strong>Contras:</strong> o markup fica longo. O time aprende utilitários, não CSS.
          Animações com keyframes pedem configuração ou CSS extra. Não existe um arquivo CSS por
          componente para exibir.
        </li>
        <li>
          <strong>Mercado:</strong> é o framework CSS mais usado hoje. A versão 4 trouxe
          configuração em CSS e um motor mais rápido. É a base do ecossistema shadcn/ui.
        </li>
      </ul>

      <h2>CSS Modules (escopo local com CSS puro)</h2>
      <ul>
        <li>
          <strong>Prós:</strong> é CSS padrão, sem sintaxe nova. O build gera nomes de classe
          únicos e evita colisão. Não tem runtime. O Vite suporta sem instalar nada.
        </li>
        <li>
          <strong>Contras:</strong> estilo dinâmico exige <code>data-*</code> ou custom properties.
          Não traz escala de design pronta; você cria os tokens. Tipar os nomes de classe exige
          plugin extra.
        </li>
        <li>
          <strong>Mercado:</strong> uso estável e amplo. Design systems grandes voltaram para ele;
          o Primer (GitHub) migrou de styled-components para CSS Modules. O CSS nativo ganhou
          nesting, <code>@layer</code>, container queries, <code>:has()</code> e{' '}
          <code>@starting-style</code>.
        </li>
      </ul>

      <h2>Styled Components (CSS-in-JS)</h2>
      <ul>
        <li>
          <strong>Prós:</strong> estilo e lógica ficam no mesmo arquivo. Props controlam o estilo
          direto. O tema chega por contexto.
        </li>
        <li>
          <strong>Contras:</strong> tem custo em runtime. Aumenta o bundle. Não funciona bem com
          React Server Components. Prende o estilo ao React.
        </li>
        <li>
          <strong>Mercado:</strong> em queda. A lib entrou em modo de manutenção em 2025. O mercado
          migrou para opções sem runtime: vanilla-extract, Panda CSS e StyleX.
        </li>
      </ul>

      <h2>A escolha deste projeto</h2>
      <ol>
        <li>O objetivo é treinar CSS. O Tailwind esconde o CSS atrás de utilitários.</li>
        <li>
          O <code>.css</code> de cada componente é portátil. Você copia o arquivo para Vue, Svelte
          ou HTML puro.
        </li>
        <li>
          O Showcase precisa exibir o CSS do componente. Com CSS Modules, esse arquivo já existe.
        </li>
        <li>O projeto fica sem dependência de estilo e sem runtime.</li>
        <li>
          Keyframes, transições e <code>@starting-style</code> são CSS nativo. O estilo Animado não
          precisa de lib.
        </li>
      </ol>
    </article>
  )
}
