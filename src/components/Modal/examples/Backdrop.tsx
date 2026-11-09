import { useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

export default function Backdrop() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Termos de uso" closeOnBackdrop={false}>
        <p>O clique fora do Modal não fecha. Use o botão Fechar ou a tecla Esc.</p>
      </Modal>
    </>
  )
}
