import type { ComponentType } from 'react'
import { exampleLoader } from '../../showcase/examples'
import type { ComponentDoc, PropDoc } from '../../showcase/types'
import animatedCss from './Modal.animated.module.css?raw'
import css from './Modal.module.css?raw'
import type { ModalProps } from './Modal'
import tsx from './Modal.tsx?raw'

const example = exampleLoader(
  import.meta.glob<ComponentType>('./examples/*.tsx', { eager: true, import: 'default' }),
  import.meta.glob<string>('./examples/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

const props = {
  open: {
    type: 'boolean',
    required: true,
    description: 'Controla a exibição do Modal.',
  },
  onClose: {
    type: '() => void',
    required: true,
    description: 'Recebe o pedido de fechar: tecla Esc, botão Fechar ou clique no backdrop.',
  },
  title: {
    type: 'string',
    required: true,
    description: 'Texto do cabeçalho. Também é o nome acessível do Modal.',
  },
  variant: {
    type: "'outline' | 'trace'",
    default: "'outline'",
    description: 'Define a entrada do contorno: de uma vez ou traçado.',
  },
  size: {
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Define a largura máxima em telas largas.',
  },
  closeOnBackdrop: {
    type: 'boolean',
    default: 'true',
    description: 'Permite fechar com um clique no backdrop.',
  },
  disableAnimation: {
    type: 'boolean',
    default: 'false',
    description: 'Desliga o estilo Animado. O componente usa o estilo Normal.',
  },
  children: {
    type: 'ReactNode',
    required: true,
    description: 'Conteúdo do corpo do Modal.',
  },
} satisfies Record<keyof ModalProps, PropDoc>

const doc: ComponentDoc = {
  slug: 'modal',
  name: 'Modal',
  category: 'molecules',
  description: 'Mostra conteúdo sobre a página e prende o foco. Usa o <dialog> nativo.',
  usage: example('Basic', 'Uso'),
  examples: [
    example(
      'Variants',
      'Variantes',
      'O Modal aberto tem um contorno de 2px na cor primária. No trace, a abertura traça o contorno do canto superior esquerdo ao canto inferior direito.',
    ),
    example(
      'Sizes',
      'Tamanhos',
      'Em telas estreitas, o Modal vira uma folha inferior e ignora a prop size.',
    ),
    example('Backdrop', 'Clique no backdrop', 'A prop closeOnBackdrop desliga o fechamento pelo clique fora.'),
    example(
      'DisableAnimation',
      'Sem animação',
      'A prop disableAnimation troca o estilo Animado pelo estilo Normal.',
    ),
  ],
  sources: { tsx, css, animatedCss },
  props,
}

export default doc
