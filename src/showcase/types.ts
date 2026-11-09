import type { ComponentType } from 'react'

export interface PropDoc {
  type: string
  default?: string
  required?: boolean
  description: string
}

export interface ExampleDoc {
  /** Âncora da seção na página. */
  id: string
  title: string
  description?: string
  Component: ComponentType
  code: string
}

export interface ComponentSources {
  tsx: string
  css: string
  animatedCss: string
}

export type ComponentCategory = 'atoms' | 'molecules'

export interface ComponentDoc {
  slug: string
  name: string
  category: ComponentCategory
  description: string
  usage: ExampleDoc
  examples: ExampleDoc[]
  sources: ComponentSources
  props: Record<string, PropDoc>
}
