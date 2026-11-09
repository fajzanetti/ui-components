import { useState } from 'react'
import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'

export default function DisableAnimation() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button disableAnimation onClick={() => setOpen(true)}>
        Abrir sem animação
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Sem animação" disableAnimation>
        <p>O Modal abre e fecha sem transição.</p>
      </Modal>
    </>
  )
}
