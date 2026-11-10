import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'
import motion from './Input.animated.module.css'

function field() {
  return screen.getByRole('textbox').parentElement as HTMLElement
}

describe('Input', () => {
  it('usa os valores padrão e liga o rótulo ao campo', () => {
    render(<Input label="Nome" />)
    const input = screen.getByRole('textbox', { name: 'Nome' })

    expect(field().dataset.variant).toBe('outline')
    expect(field().dataset.size).toBe('md')
    expect(field().classList.contains(motion.animated)).toBe(true)
    expect(input.hasAttribute('aria-invalid')).toBe(false)
    expect(input.hasAttribute('aria-describedby')).toBe(false)
  })

  it('remove a classe do estilo Animado com disableAnimation', () => {
    render(<Input label="Nome" disableAnimation />)

    expect(field().classList.contains(motion.animated)).toBe(false)
  })

  it('descreve o campo com o hint', () => {
    render(<Input label="Nome" hint="Como no documento." />)
    const input = screen.getByRole('textbox', { description: 'Como no documento.' })

    expect(input.hasAttribute('aria-invalid')).toBe(false)
  })

  it('troca o hint pelo erro e marca o campo com aria-invalid', () => {
    render(<Input label="Nome" hint="Como no documento." error="Nome é obrigatório" />)
    const input = screen.getByRole('textbox', { description: 'Nome é obrigatório' })

    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(screen.queryByText('Como no documento.')).toBeNull()
  })

  it('desenha o traço só na variante trace', () => {
    const { rerender } = render(<Input label="Nome" variant="outline" />)
    expect(field().querySelector('svg')).toBeNull()

    rerender(<Input label="Nome" variant="trace" />)
    expect(field().querySelector('svg')).not.toBeNull()
  })

  it('mostra os ícones dos 2 lados', () => {
    render(<Input label="Nome" startIcon={<i data-testid="start" />} endIcon={<i data-testid="end" />} />)

    expect(screen.getByTestId('start').parentElement?.dataset.side).toBe('start')
    expect(screen.getByTestId('end').parentElement?.dataset.side).toBe('end')
  })

  it('repassa os atributos nativos e aceita digitação', async () => {
    render(<Input label="Nome" placeholder="Seu nome" />)
    const input = screen.getByRole<HTMLInputElement>('textbox')

    await userEvent.type(input, 'Ana')

    expect(input.placeholder).toBe('Seu nome')
    expect(input.value).toBe('Ana')
  })
})
