import type { ComponentProps } from 'react'
import { cx } from '../../lib/cx'
import motion from './Button.animated.module.css'
import styles from './Button.module.css'

export interface ButtonOwnProps {
  variant?: 'filled' | 'inverse' | 'outline' | 'trace'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
  disableAnimation?: boolean
}

export type ButtonProps = ButtonOwnProps & ComponentProps<'button'>

export function Button({
  variant = 'filled',
  size = 'md',
  loading = false,
  fullWidth = false,
  disableAnimation = false,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const animated = !disableAnimation

  return (
    <button
      type="button"
      {...rest}
      className={cx(styles.button, animated && motion.animated, className)}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={cx(styles.label, animated && motion.label)}>{children}</span>
      {variant === 'trace' && (
        <span className={cx(styles.trace, animated && motion.trace)} aria-hidden="true">
          <svg>
            <rect width="100%" height="100%" />
          </svg>
        </span>
      )}
    </button>
  )
}
