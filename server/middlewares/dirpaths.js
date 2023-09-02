import { fileURLToPath } from 'node:url'
import path from 'node:path'

export const __storagepath = path.join(fileURLToPath(import.meta.url), '../../storage')
export const __dirname = path.join(fileURLToPath(import.meta.url), '../../')