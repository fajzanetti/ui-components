import { useId, type ComponentProps, type ReactNode } from 'react'
import { cx } from '../../lib/cx'
import motion from './Input.animated.module.css'
import styles from './Input.module.css'

export interface InputOwnProps {
  label: string
  hint?: string
  error?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  variant?: 'outline' | 'trace'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disableAnimation?: boolean
}

// O `size` nativo de <input> é um número. A prop `size` do componente ocupa esse nome.
export type InputProps = InputOwnProps & Omit<ComponentProps<'input'>, 'size'>

export function Input({
  label,
  hint,
  error,
  startIcon,
  endIcon,
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  disableAnimation = false,
  className,
  id,
  ...rest
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error || hint

  return (
    <div className={cx(styles.root, className)} data-full-width={fullWidth || undefined}>
      <label className={cx(styles.label, !disableAnimation && motion.label)} htmlFor={inputId}>
        {label}
      </label>
      <div
        className={cx(styles.field, !disableAnimation && motion.animated)}
        data-variant={variant}
        data-size={size}
      >
        {startIcon && (
          <span className={styles.icon} data-side="start">
            {startIcon}
          </span>
        )}
        <input
          aria-describedby={message ? messageId : undefined}
          aria-invalid={error ? true : undefined}
          {...rest}
          id={inputId}
          className={styles.input}
        />
        {endIcon && (
          <span className={styles.icon} data-side="end">
            {endIcon}
          </span>
        )}
        {variant === 'trace' && (
          <svg className={styles.trace} aria-hidden="true">
            <rect width="100%" height="100%" />
          </svg>
        )}
      </div>
      {message && (
        <p id={messageId} className={styles.message}>
          {message}
        </p>
      )}
    </div>
  )
}
