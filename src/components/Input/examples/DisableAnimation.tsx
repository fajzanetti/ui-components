import { Input } from '@/components/Input'

export default function DisableAnimation() {
  return (
    <>
      <Input variant="outline" disableAnimation label="Outline" placeholder="Sem animação" />
      <Input variant="trace" disableAnimation label="Trace" placeholder="Sem animação" />
    </>
  )
}
