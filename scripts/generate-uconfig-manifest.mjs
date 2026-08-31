import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const templateDirectory = join(projectDirectory, 'public', 'assets', 'files', 'uconfig')
const manifestPath = join(templateDirectory, 'index.json')

await mkdir(templateDirectory, { recursive: true })

const entries = await readdir(templateDirectory, { withFileTypes: true })
const templates = []

for (const entry of entries) {
  if (!entry.isFile() || extname(entry.name).toLowerCase() !== '.bin') continue

  templates.push({
    file: entry.name,
    name: basename(entry.name, extname(entry.name))
  })
}

templates.sort((first, second) => first.name.localeCompare(second.name, 'en', {
  numeric: true,
  sensitivity: 'base'
}))

await writeFile(manifestPath, `${JSON.stringify(templates, null, 2)}\n`)
console.log(`U-Config templates indexed: ${templates.length}`)
