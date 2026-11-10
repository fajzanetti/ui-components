import { Input } from '@/components/Input'

export default function Disabled() {
  return (
    <>
      <Input variant="outline" label="Outline" placeholder="Desativado" disabled />
      <Input variant="trace" label="Trace" placeholder="Desativado" disabled />
    </>
  )
}
