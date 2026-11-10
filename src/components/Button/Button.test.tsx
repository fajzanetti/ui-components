import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import motion from './Button.animated.module.css'

describe('Button', () => {
  it('usa os valores padrão', () => {
    render(<Button>Salvar</Button>)
    const button = screen.getByRole('button', { name: 'Salvar' })

    expect(button.getAttribute('type')).toBe('button')
    expect(button.dataset.variant).toBe('filled')
    expect(button.dataset.size).toBe('md')
    expect(button.classList.contains(motion.animated)).toBe(true)
  })

  it('remove a classe do estilo Animado com disableAnimation', () => {
    render(<Button disableAnimation>Salvar</Button>)

    expect(screen.getByRole('button').classList.contains(motion.animated)).toBe(false)
  })

  it('desenha o traço só na variante trace', () => {
    const { rerender } = render(<Button variant="filled">Salvar</Button>)
    expect(screen.getByRole('button').querySelector('svg')).toBeNull()

    rerender(<Button variant="outline">Salvar</Button>)
    expect(screen.getByRole('button').querySelector('svg')).toBeNull()

    rerender(<Button variant="trace">Salvar</Button>)
    expect(screen.getByRole('button').querySelector('svg')).not.toBeNull()
  })

  it('chama onClick ao clicar', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Salvar</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('bloqueia o clique durante a carga', async () => {
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Salvar
      </Button>,
    )
    const button = screen.getByRole('button')

    await userEvent.click(button)

    expect(button.getAttribute('aria-busy')).toBe('true')
    expect(onClick).not.toHaveBeenCalled()
  })
})
