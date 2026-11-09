import { setTheme, useTheme } from '../useTheme'
import { MoonIcon, SunIcon } from './icons'

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className={className}
      aria-label={next === 'dark' ? 'Usar tema escuro' : 'Usar tema claro'}
      onClick={() => setTheme(next)}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
