import { useState } from 'react'
import { Button } from '@/components/Button'

export default function Loading() {
  const [saving, setSaving] = useState(false)

  function save() {
    setSaving(true)
    setTimeout(() => setSaving(false), 2000)
  }

  return (
    <>
      <Button loading>Carregando</Button>
      <Button variant="outline" loading={saving} onClick={save}>
        {saving ? 'Salvando' : 'Salvar'}
      </Button>
    </>
  )
}
