import type { ComponentType } from 'react'
import type { ExampleDoc } from './types'

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Liga cada arquivo de `./examples` ao componente e ao código-fonte dele.
 * Os 2 mapas vêm de `import.meta.glob` no arquivo de docs.
 */
export function exampleLoader(
  components: Record<string, ComponentType>,
  codes: Record<string, string>,
) {
  return (file: string, title: string, description?: string): ExampleDoc => {
    const path = `./examples/${file}.tsx`
    const Component = components[path]
    const code = codes[path]
    if (!Component || code === undefined) throw new Error(`Exemplo não encontrado: ${path}`)
    return { id: slugify(title), title, description, Component, code }
  }
}
