# Estilo dos componentes

Todo componente de `src/components` segue este guia. Leia a implementação de referência antes de escrever ou alterar um componente.

| Tipo de componente | Referência |
| --- | --- |
| Campo de formulário | `src/components/Input/` |
| Ação, com `filled` e `inverse` | `src/components/Button/` |
| Superfície | `src/components/Modal/` |

## Identidade: o traçado

O traçado é a marca visual da biblioteca. Na variante `trace`, a cor de destaque avança de forma progressiva sobre o componente. O traçado tem 2 formas.

| Forma | O que acontece | Gatilho | Tempo |
| --- | --- | --- | --- |
| Traçado do contorno | Um traço de 2px nasce no canto superior esquerdo. As 2 pontas contornam a caixa e fecham no canto inferior direito. | Estado ativo | Ida: `--motion-slow` × 2. Volta: `--motion-slow`. Curva: `--ease-in-out`. |
| Preenchimento do texto | A cor de destaque cresce sobre o texto, da esquerda para a direita. | Hover | `--motion-slow`, com `--ease-in-out`. |

O estado ativo é o estado em que o componente recebe a ação do usuário:

- Campo de formulário: `:focus-within`.
- Botão e link: `:focus-visible`.
- Superfície, como o Modal: `[open]`.
- Outros componentes: `:checked`, `[aria-selected='true']` ou `[aria-current]`.

Um componente sem contorno traça o elemento que indica o estado. Exemplos: a marca do Checkbox e a linha da aba ativa.

## Variantes

Todo componente tem a prop `variant` com os valores `outline` e `trace`. O valor padrão é `outline`.

As 2 variantes têm o mesmo repouso e o mesmo estado ativo. Só o caminho entre os estados muda.

| Variante | Repouso | Hover | Estado ativo |
| --- | --- | --- | --- |
| `outline` | Borda de 1px em `--color-border-strong`. | A borda e o texto trocam para a cor de destaque, com transição de cor em `--motion-base`. | A borda engrossa para 2px na cor de destaque. Sem halo. |
| `trace` | Igual ao `outline`. | A borda troca para a cor de destaque. O texto recebe o preenchimento do texto. | O traçado do contorno desenha a borda de 2px. |

Em botão e link, o hover da variante `trace` também dispara o traçado do contorno. Com mouse, o botão não tem um estado ativo duradouro. Nesse hover, a borda de 1px fica cinza e o traço desenha o contorno sobre ela.

### Variante `filled`

Um componente de ação com fundo sólido, como o Button, tem também o valor `filled`. O `filled` soma às variantes `outline` e `trace`. Nesse componente, o valor padrão é `filled`.

- **Repouso:** fundo em `--color-primary` e texto em `--color-on-primary`.
- **Hover:** o fundo troca para `--color-primary-hover`, com transição de cor.
- **Estado ativo:** um anel de 2px na cor de destaque, 2px fora da caixa. Use `outline` com `outline-offset: 2px`.
- O `filled` não usa o traçado. O traçado do contorno e o preenchimento do texto existem só na variante `trace`.

### Variante `inverse`

Um componente com `filled` tem também o valor `inverse`. O `inverse` é o contrário do `filled`.

- **Repouso:** fundo em `--color-surface`, com borda de 1px e texto na cor de destaque.
- **Hover:** o fundo troca para a cor de destaque e o texto para `--color-on-primary`, com transição de cor.
- **Pressionado e estado ativo:** iguais aos do `filled`.
- O `inverse` não usa o traçado.

### Superfície

Uma superfície, como o Modal, só aparece no estado ativo. Ela mostra o contorno de 2px enquanto está aberta.

- No `outline`, o contorno entra junto com a superfície.
- No `trace`, a abertura traça o contorno.
- A superfície mantém a sombra de elevação (`--shadow-lg`).

## Estados

- **Hover:** escreva o hover dentro de `@media (hover: hover)`. O hover antecipa a cor do estado ativo.
- **Pressionado:** em `:active`, troque o fundo para `--color-surface-active`. No `filled` e no `inverse`, use `--color-primary-active`. O estilo Animado soma `scale: 0.97`.
- **Foco:** o contorno da variante mostra o foco. Declare `outline: 2px solid transparent` no elemento focado. Esse outline aparece no modo de cores forçadas.
- **Erro:** troque `--<nome>-border` e `--<nome>-accent` para `--color-danger`. Todos os efeitos leem essas 2 variáveis. Escreva 1 regra de erro por componente.
- **Desativado:** use `opacity: 0.55` e `cursor: not-allowed`. O componente desativado não reage ao hover.

## Cores e medidas

- **Fundo de controle:** `--color-surface`. O fundo é sempre um tom diferente do fundo da página.
- **Destaque:** `--color-primary`. **Erro:** `--color-danger`. **Borda de controle:** `--color-border-strong`.
- **Raio:** `--radius-md` em controle e `--radius-lg` em superfície.
- **Altura no toque:** 44px (`sm`), 48px (`md`) e 56px (`lg`).
- **Altura com mouse:** 36px (`sm`), 44px (`md`) e 52px (`lg`). Aplique em `@media (pointer: fine)`.
- **Texto de campo:** no mínimo 16px no toque. O Safari do iOS aplica zoom em campo com fonte menor.
- **Rótulo de campo:** `--text-sm`, peso 600, acima do campo.
- **Mensagem de campo:** `--text-sm`, em `--color-text-muted`, abaixo do campo. A mensagem de erro substitui a mensagem de ajuda.

## Props

Use os mesmos nomes em todos os componentes:

- `variant`, `size` (`sm`, `md`, `lg`; padrão `md`), `fullWidth` e `disableAnimation`.
- Campo de formulário: `label` (obrigatória), `hint`, `error`, `startIcon` e `endIcon`.
- A prop `error` marca o campo com `aria-invalid`. Não crie uma prop `invalid` separada.

## Técnica

Cada pasta de componente é copiável. Copie a técnica da referência para o componente novo e troque o prefixo das variáveis.

### Variáveis de cor

1. Declare `--<nome>-border` e `--<nome>-accent` na raiz do componente.
2. Faça o hover e o erro trocarem só essas variáveis.
3. Leia as variáveis na borda, no traço e no texto.

### Traçado do contorno

Modelo: as regras `.trace` em `src/components/Button/Button.module.css`.

1. Ponha este elemento como último filho da caixa: `<span class="trace" aria-hidden="true"><svg><rect width="100%" height="100%" /></svg></span>`.
2. Posicione o `<span>` com `position: absolute` e `inset: var(--trace-inset)`.
3. Declare `container-type: size` no `<span>`. O cálculo do perímetro lê a largura e a altura dele em `cqw` e `cqh`.
4. Use `--trace-inset: 1px`. Esse recuo põe o traço de 2px inteiro dentro da caixa.
5. Anime `stroke-dasharray` e `stroke-dashoffset` juntos. Os 2 valores definem o ponto de partida e o tamanho do traço.

Cuidados:

- Não declare `container-type` na caixa do componente. Uma caixa com largura definida pelo conteúdo, como o Button, perde a largura.
- Não use o atributo `pathLength`. O cálculo mede o caminho em px para achar o ponto de partida.
- Um componente que nasce no estado ativo usa `@keyframes` na ida. Uma regra `@starting-style` perde para a regra do estado ativo no arquivo Normal. Modelo: `trace-in` em `Modal.animated.module.css`.
- Uma folha inferior não tem cantos na base. Desça a base do contorno para fora da tela e corte com `overflow: clip`. Modelo: `--modal-drop` em `Modal.module.css`.

### Preenchimento do texto

Modelo: a regra `.button[data-variant='trace'] .label` em `src/components/Button/Button.module.css`.

1. Pinte o texto com 2 gradientes: a camada de destaque, com `no-repeat left / 0% 100%`, sobre a camada da cor do texto.
2. Use `background-clip: text` e `color: transparent`.
3. No hover, escreva `background-size: 100% 100%, auto`. A 2ª camada mantém `auto` nos 2 estados. Com `auto` em só 1 dos estados, a transição não interpola.
4. Dê ao elemento de texto a largura do texto. O preenchimento percorre a largura do elemento.
5. Defina `color` nos filhos do elemento de texto. O texto transparente esconde um ícone com `currentColor`.

### Estilo Normal e estilo Animado

- O arquivo `X.module.css` define o repouso e o estado final de cada efeito.
- O arquivo `X.animated.module.css` contém só movimento: `transition`, `animation`, `@keyframes` e transformações.
- O arquivo Animado tem classes próprias para as partes animadas, como `label` e `trace`. O `.tsx` soma essas classes sem `disableAnimation`.
- O arquivo Animado não redefine uma propriedade do arquivo Normal com a mesma especificidade. A ordem dos 2 arquivos no build não é garantida.
- Com `disableAnimation`, o estado final aparece de uma vez.
- Desligue as transições e as animações em `@media (prefers-reduced-motion: reduce)`.

## Conferência visual

- Confira cada estado nos temas claro e escuro: repouso, hover, pressionado, estado ativo, erro e desativado.
- O Chrome headless não ativa `(hover: hover)` nem `(pointer: fine)`. Uma captura headless mostra as medidas de toque e nenhum hover.
- No Chrome headless, `:focus-visible` exige foco por teclado. Envie a tecla Tab pelo protocolo de depuração.
- Para capturar um quadro do traçado, pause as animações com `document.getAnimations()` e defina `currentTime`. Ignore as animações infinitas, como o spinner.
