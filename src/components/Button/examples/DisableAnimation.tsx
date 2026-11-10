import { Button } from '@/components/Button'

export default function DisableAnimation() {
  return (
    <>
      <Button disableAnimation>Filled</Button>
      <Button variant="inverse" disableAnimation>
        Inverse
      </Button>
      <Button variant="outline" disableAnimation>
        Outline
      </Button>
      <Button variant="trace" disableAnimation>
        Trace
      </Button>
    </>
  )
}
