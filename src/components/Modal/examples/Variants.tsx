import { useState } from 'react'
import { Button } from '@/components/Button'
import { Modal, type ModalProps } from '@/components/Modal'

const VARIANTS = ['outline', 'trace'] as const

export default function Variants() {
  const [variant, setVariant] = useState<ModalProps['variant']>('outline')
  const [open, setOpen] = useState(false)

  return (
    <>
      {VARIANTS.map((item) => (
        <Button
          key={item}
          variant={item}
          onClick={() => {
            setVariant(item)
            setOpen(true)
          }}
        >
          Abrir {item}
        </Button>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} title={`Variante ${variant}`} variant={variant}>
        <p>A prop variant define a entrada do contorno do Modal.</p>
      </Modal>
    </>
  )
}
