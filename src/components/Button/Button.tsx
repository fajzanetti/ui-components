import type { ComponentProps } from 'react'
import { cx } from '../../lib/cx'
import motion from './Button.animated.module.css'
import styles from './Button.module.css'

export interface ButtonOwnProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
  disableAnimation?: boolean
}

export type ButtonProps = ButtonOwnProps & ComponentProps<'button'>

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disableAnimation = false,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cx(styles.button, !disableAnimation && motion.animated, className)}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth || undefined}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  )
}
