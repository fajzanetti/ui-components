import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal', () => {
  it('abre o dialog com o título como nome acessível', () => {
    render(
      <Modal open onClose={() => {}} title="Excluir projeto">
        Conteúdo
      </Modal>,
    )

    const dialog = screen.getByRole('dialog', { name: 'Excluir projeto' })
    expect(dialog.hasAttribute('open')).toBe(true)
    expect(dialog.dataset.variant).toBe('outline')
    expect(dialog.querySelector('span > svg')).toBeNull()
  })

  it('desenha o traço na variante trace', () => {
    render(
      <Modal open onClose={() => {}} title="Excluir projeto" variant="trace">
        Conteúdo
      </Modal>,
    )

    expect(screen.getByRole('dialog').querySelector('span > svg')).not.toBeNull()
  })

  it('mantém o dialog fechado quando open é false', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Excluir projeto">
        Conteúdo
      </Modal>,
    )

    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('chama onClose no botão Fechar', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Excluir projeto">
        Conteúdo
      </Modal>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Fechar' }))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('chama onClose no clique do backdrop', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Excluir projeto">
        Conteúdo
      </Modal>,
    )

    await userEvent.click(screen.getByRole('dialog'))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('ignora o clique do backdrop com closeOnBackdrop false', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Excluir projeto" closeOnBackdrop={false}>
        Conteúdo
      </Modal>,
    )

    await userEvent.click(screen.getByRole('dialog'))

    expect(onClose).not.toHaveBeenCalled()
  })
})
