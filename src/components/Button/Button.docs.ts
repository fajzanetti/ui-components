import type { ComponentType } from 'react'
import { exampleLoader } from '../../showcase/examples'
import type { ComponentDoc, PropDoc } from '../../showcase/types'
import animatedCss from './Button.animated.module.css?raw'
import css from './Button.module.css?raw'
import type { ButtonOwnProps } from './Button'
import tsx from './Button.tsx?raw'

const example = exampleLoader(
  import.meta.glob<ComponentType>('./examples/*.tsx', { eager: true, import: 'default' }),
  import.meta.glob<string>('./examples/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

const props = {
  variant: {
    type: "'filled' | 'inverse' | 'outline' | 'trace'",
    default: "'filled'",
    description: 'Define a variação visual e a animação do hover e do foco.',
  },
  size: {
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Define a altura, o espaço interno e o tamanho do texto.',
  },
  loading: {
    type: 'boolean',
    default: 'false',
    description: 'Mostra o indicador de carga e desativa o botão.',
  },
  fullWidth: {
    type: 'boolean',
    default: 'false',
    description: 'Ocupa toda a largura do elemento pai.',
  },
  disableAnimation: {
    type: 'boolean',
    default: 'false',
    description: 'Desliga o estilo Animado. O componente usa o estilo Normal.',
  },
} satisfies Record<keyof ButtonOwnProps, PropDoc>

const doc: ComponentDoc = {
  slug: 'button',
  name: 'Button',
  category: 'atoms',
  description: 'Dispara uma ação. Aceita todos os atributos nativos de <button>.',
  usage: example('Basic', 'Uso'),
  examples: [
    example(
      'Variants',
      'Variantes',
      'Passe o mouse e navegue com a tecla Tab. No filled, o hover troca o tom do fundo. O inverse é o contrário do filled: o hover preenche o botão. Nos 2, o foco mostra um anel por fora do botão. No outline, a borda e o texto trocam de cor. No trace, o hover preenche o texto e traça o contorno. O foco mostra o mesmo contorno.',
    ),
    example('Sizes', 'Tamanhos'),
    example(
      'Loading',
      'Carga',
      'A prop loading mostra o indicador e bloqueia o clique. Clique em Salvar para ver a troca de estado.',
    ),
    example('Disabled', 'Desativado'),
    example('FullWidth', 'Largura total'),
    example(
      'DisableAnimation',
      'Sem animação',
      'A prop disableAnimation troca o estilo Animado pelo estilo Normal. Compare o hover, o clique e o foco com o exemplo Variantes.',
    ),
  ],
  sources: { tsx, css, animatedCss },
  props,
}

export default doc
