import type { HighlighterCore } from 'shiki/core'

export type CodeLang = 'tsx' | 'css'

let highlighter: Promise<HighlighterCore> | undefined

// O Shiki carrega só quando o primeiro bloco de código aparece.
function loadHighlighter(): Promise<HighlighterCore> {
  highlighter ??= Promise.all([import('shiki/core'), import('shiki/engine/javascript')]).then(
    ([{ createHighlighterCore }, { createJavaScriptRegexEngine }]) =>
      createHighlighterCore({
        themes: [import('shiki/themes/github-light.mjs'), import('shiki/themes/github-dark.mjs')],
        langs: [import('shiki/langs/tsx.mjs'), import('shiki/langs/css.mjs')],
        engine: createJavaScriptRegexEngine(),
      }),
  )
  return highlighter
}

export async function highlight(code: string, lang: CodeLang): Promise<string> {
  const shiki = await loadHighlighter()
  return shiki.codeToHtml(code, {
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
    // Sem cor fixa: o CSS escolhe a cor de cada tema com light-dark().
    defaultColor: false,
  })
}
