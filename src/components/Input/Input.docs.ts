import type { ComponentType } from 'react'
import { exampleLoader } from '../../showcase/examples'
import type { ComponentDoc, PropDoc } from '../../showcase/types'
import animatedCss from './Input.animated.module.css?raw'
import css from './Input.module.css?raw'
import type { InputOwnProps } from './Input'
import tsx from './Input.tsx?raw'

const example = exampleLoader(
  import.meta.glob<ComponentType>('./examples/*.tsx', { eager: true, import: 'default' }),
  import.meta.glob<string>('./examples/*.tsx', { eager: true, query: '?raw', import: 'default' }),
)

const props = {
  label: {
    type: 'string',
    required: true,
    description: 'Texto do rótulo acima do campo.',
  },
  hint: {
    type: 'string',
    description: 'Texto de ajuda abaixo do campo.',
  },
  error: {
    type: 'string',
    description: 'Mensagem de erro abaixo do campo. Substitui o hint e marca o campo com aria-invalid.',
  },
  startIcon: {
    type: 'ReactNode',
    description: 'Ícone no início do campo.',
  },
  endIcon: {
    type: 'ReactNode',
    description: 'Ícone no fim do campo. Passe um <button> para um ícone clicável.',
  },
  variant: {
    type: "'outline' | 'trace'",
    default: "'outline'",
    description: 'Define a animação do foco.',
  },
  size: {
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Define a altura e o tamanho do texto.',
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
} satisfies Record<keyof InputOwnProps, PropDoc>

const doc: ComponentDoc = {
  slug: 'input',
  name: 'Input',
  category: 'atoms',
  description:
    'Recebe uma linha de texto, com rótulo, mensagem e ícones. Aceita os atributos nativos de <input>, menos size.',
  usage: example('Basic', 'Uso'),
  examples: [
    example(
      'Variants',
      'Variantes',
      'O hover pinta a borda e o rótulo com a cor primária. No outline, o foco engrossa a borda. No trace, o rótulo é preenchido da esquerda para a direita e o traço do foco nasce no canto superior esquerdo e fecha no canto inferior direito.',
    ),
    example(
      'Messages',
      'Ajuda e erro',
      'A prop hint mostra um texto de ajuda. A prop error substitui o hint e troca o contorno para a cor de erro.',
    ),
    example(
      'Icons',
      'Ícones',
      'As props startIcon e endIcon recebem qualquer elemento. O ícone da senha é um <button>.',
    ),
    example('Sizes', 'Tamanhos'),
    example('Disabled', 'Desativado'),
    example('FullWidth', 'Largura total'),
    example(
      'DisableAnimation',
      'Sem animação',
      'A prop disableAnimation troca o estilo Animado pelo estilo Normal. Compare o foco com o exemplo Variantes.',
    ),
  ],
  sources: { tsx, css, animatedCss },
  props,
}

export default doc
