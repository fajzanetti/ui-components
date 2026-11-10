import { Input } from '@/components/Input'

export default function Messages() {
  return (
    <>
      <Input
        variant="trace"
        label="E-mail"
        type="email"
        placeholder="voce@empresa.com"
        hint="Use o e-mail da empresa."
      />
      <Input
        variant="trace"
        label="E-mail"
        type="email"
        placeholder="voce@empresa.com"
        error="E-mail é obrigatório"
      />
    </>
  )
}
