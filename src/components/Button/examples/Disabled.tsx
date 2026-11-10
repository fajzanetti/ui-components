import { Button } from '@/components/Button'

export default function Disabled() {
  return (
    <>
      <Button disabled>Filled</Button>
      <Button variant="inverse" disabled>
        Inverse
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="trace" disabled>
        Trace
      </Button>
    </>
  )
}
