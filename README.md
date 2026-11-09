# ui-components

Componentes UI feitos do zero com TypeScript e CSS puro. O projeto não usa biblioteca de UI de terceiros.

O repositório tem 2 partes:

- **Biblioteca** (`src/components`): os componentes React com CSS Modules.
- **Showcase** (`src/showcase`): o site de documentação. Cada página mostra exemplos ao vivo com o código deles, o código-fonte do componente e a tabela de props.

## Como rodar

Requisito: Node.js 22 ou mais novo.

```bash
npm install
npm run dev
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o Showcase em modo de desenvolvimento. |
| `npm run build` | Checa os tipos e gera o site em `dist/`. |
| `npm run preview` | Serve o conteúdo de `dist/`. |
| `npm run lint` | Roda o oxlint. |
| `npx vitest run <arquivo>` | Roda um arquivo de teste. |

## Os 2 estilos

Cada componente tem 2 estilos. O estilo Animado é o padrão. A prop `disableAnimation` troca para o estilo Normal.

- **Normal** (`X.module.css`): layout, cor, estados e responsividade. Os estados mudam sem transição.
- **Animado** (`X.animated.module.css`): só movimento. O arquivo contém `transition`, `animation`, `@keyframes` e `transform`. O componente soma este arquivo ao arquivo Normal.

O arquivo Animado usa os tokens `--motion-*` e `--ease-*`. Ele desliga o movimento em `prefers-reduced-motion: reduce`.

## Estrutura

```
src/
├─ components/        # biblioteca; cada pasta é copiável
│  └─ Button/
│     ├─ Button.tsx
│     ├─ Button.module.css
│     ├─ Button.animated.module.css
│     ├─ Button.docs.ts
│     ├─ Button.test.tsx
│     ├─ index.ts
│     └─ examples/    # um arquivo por exemplo da página
├─ styles/            # reset, tokens e temas
├─ lib/               # cx
└─ showcase/          # site de documentação
```

## Página de componente

Cada página tem estas seções:

- **Uso:** a linha de import e o exemplo básico.
- **Exemplos:** um preview ao vivo por exemplo, com o código recolhido abaixo. O exemplo "Sem animação" mostra o estilo Normal.
- **Código-fonte:** os arquivos `.tsx`, `.module.css` e `.animated.module.css` do componente.
- **API:** a tabela de props.

O código exibido vem dos arquivos reais, por `?raw`. Ele nunca diverge do código executado.

## Como adicionar um componente

1. Crie a pasta `src/components/<Nome>/`.
2. Escreva `<Nome>.tsx`, `<Nome>.module.css` e `<Nome>.animated.module.css`.
3. Escreva um arquivo por exemplo em `examples/`. Cada arquivo exporta um componente como `default` e importa por `@/components/<Nome>`.
4. Escreva `<Nome>.docs.ts`. Exporte um `ComponentDoc` como `default`. Use `Button.docs.ts` como modelo.
5. Escreva `<Nome>.test.tsx`.

O Showcase descobre o arquivo `*.docs.ts` sozinho. A Sidebar e a rota aparecem sem outra mudança.

### Regras de portabilidade

O objetivo é copiar um componente para outro framework e reescrever só o `.tsx`.

- O CSS não depende do React. O estado usa atributos nativos, ARIA e `data-*`.
- O `.tsx` só converte props em atributos e classes.
- O comportamento vem do HTML nativo sempre que existir (`<dialog>`, `<details>`, Popover API).
- Cada pasta de componente depende só de `src/styles/tokens.css`, `src/styles/themes.css` e `src/lib/cx.ts`.

## Build para deploy

O repositório `fajzanetti.github.io` publica o Showcase como subpágina. O build e a publicação rodam no workflow `deploy.yml` daquele repositório.

O workflow `.github/workflows/deploy-site.yml` deste repositório dispara o `deploy.yml` a cada push na branch `main`.

O disparo usa o secret `SITE_DEPLOY_TOKEN`. O secret guarda um token fine-grained com a permissão `Actions: Read and write` no repositório `fajzanetti.github.io`. O token tem data de validade. Depois dessa data, o disparo falha. Gere um token novo e atualize o secret.

A variável `BASE_PATH` define o subcaminho do site. O valor padrão é `/`.

```bash
npm ci
BASE_PATH=/ui-components/ npm run build
```

O site fica em `dist/`. As rotas usam hash (`/#/components/button`). Por isso o site funciona em qualquer subcaminho, sem `404.html`.
