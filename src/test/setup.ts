import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// A Testing Library só limpa o DOM sozinha quando o Vitest usa globals.
afterEach(cleanup)
