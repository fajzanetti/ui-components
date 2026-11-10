import { useState } from 'react'
import { Button } from '@/components/Button'
import { Modal, type ModalProps } from '@/components/Modal'

const SIZES = ['sm', 'md', 'lg'] as const

export default function Sizes() {
  const [size, setSize] = useState<ModalProps['size']>('md')
  const [open, setOpen] = useState(false)

  return (
    <>
      {SIZES.map((item) => (
        <Button
          key={item}
          variant="outline"
          onClick={() => {
            setSize(item)
            setOpen(true)
          }}
        >
          Abrir {item}
        </Button>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} title={`Tamanho ${size}`} size={size}>
        <p>A prop size define a largura máxima do Modal em telas largas.</p>
      </Modal>
    </>
  )
}
