import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import motion from './Modal.animated.module.css'
import styles from './Modal.module.css'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  variant?: 'outline' | 'trace'
  size?: 'sm' | 'md' | 'lg'
  closeOnBackdrop?: boolean
  disableAnimation?: boolean
  children: ReactNode
}

export function Modal({
  open,
  onClose,
  title,
  variant = 'outline',
  size = 'md',
  closeOnBackdrop = true,
  disableAnimation = false,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const pressedBackdrop = useRef(false)
  const titleId = useId()
  const animated = !disableAnimation

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // O painel cobre o <dialog> inteiro. Um clique com alvo no <dialog> veio do backdrop.
  function isBackdrop(event: MouseEvent<HTMLDialogElement>) {
    return event.target === event.currentTarget
  }

  function onClick(event: MouseEvent<HTMLDialogElement>) {
    // Exige o início do clique no backdrop. Arrastar de dentro do painel não fecha.
    if (closeOnBackdrop && pressedBackdrop.current && isBackdrop(event)) onClose()
    pressedBackdrop.current = false
  }

  return (
    <dialog
      ref={dialogRef}
      className={cx(styles.modal, animated && motion.animated)}
      data-variant={variant}
      data-size={size}
      aria-labelledby={titleId}
      // A tecla Esc fecha o <dialog> sem passar pelo React. O estado `open` precisa acompanhar.
      onClose={() => {
        if (open) onClose()
      }}
      onMouseDown={(event) => {
        pressedBackdrop.current = isBackdrop(event)
      }}
      onClick={onClick}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={cx(styles.close, animated && motion.close)}
            aria-label="Fechar"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
      {variant === 'trace' && (
        <span className={cx(styles.trace, animated && motion.trace)} aria-hidden="true">
          <svg>
            <rect width="100%" height="100%" />
          </svg>
        </span>
      )}
    </dialog>
  )
}
