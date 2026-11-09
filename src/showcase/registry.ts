import type { ComponentCategory, ComponentDoc } from './types'

const modules = import.meta.glob<{ default: ComponentDoc }>('../components/*/*.docs.ts', {
  eager: true,
})

export const categories: ReadonlyArray<{ id: ComponentCategory; label: string }> = [
  { id: 'atoms', label: 'Átomos' },
  { id: 'molecules', label: 'Moléculas' },
]

function categoryIndex(doc: ComponentDoc): number {
  return categories.findIndex((category) => category.id === doc.category)
}

// A ordem da Sidebar também define os links Anterior e Próximo.
export const docs: ComponentDoc[] = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => categoryIndex(a) - categoryIndex(b) || a.name.localeCompare(b.name))

export function findDoc(slug: string | undefined): ComponentDoc | undefined {
  return docs.find((doc) => doc.slug === slug)
}
