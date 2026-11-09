import { useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

export default function Basic() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>

      <Modal open={open} onClose={close} title="Excluir projeto">
        <p>O projeto e os arquivos dele saem da sua conta. Você não pode desfazer esta ação.</p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
          <Button onClick={close}>Excluir</Button>
          <Button variant="ghost" onClick={close}>
            Cancelar
          </Button>
        </div>
      </Modal>
    </>
  )
}
