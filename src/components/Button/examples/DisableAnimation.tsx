import { Button } from '@/components/Button'

export default function DisableAnimation() {
  return (
    <>
      <Button>Animado</Button>
      <Button disableAnimation>Sem animação</Button>
    </>
  )
}
