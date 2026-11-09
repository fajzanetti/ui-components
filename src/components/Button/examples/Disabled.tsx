import { Button } from '@/components/Button'

export default function Disabled() {
  return (
    <>
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
    </>
  )
}
