import { useState } from 'react'
import { Input } from '@/components/Input'

const icon = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function MailIcon() {
  return (
    <svg {...icon}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg {...icon}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default function Icons() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Input
        variant="trace"
        label="E-mail"
        type="email"
        placeholder="voce@empresa.com"
        startIcon={<MailIcon />}
      />
      <Input
        variant="trace"
        label="Senha"
        type={visible ? 'text' : 'password'}
        defaultValue="segredo123"
        endIcon={
          <button
            type="button"
            aria-label="Mostrar a senha"
            aria-pressed={visible}
            onClick={() => setVisible(!visible)}
          >
            <EyeIcon />
          </button>
        }
      />
    </>
  )
}
