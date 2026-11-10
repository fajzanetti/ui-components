import { Input } from '@/components/Input'

export default function Sizes() {
  return (
    <>
      <Input variant="trace" size="sm" label="Pequeno" placeholder="sm" />
      <Input variant="trace" size="md" label="Médio" placeholder="md" />
      <Input variant="trace" size="lg" label="Grande" placeholder="lg" />
    </>
  )
}
