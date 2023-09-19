import { parse } from 'node:path'
import { readdir } from 'node:fs/promises'

export async function getIcons(
  path: string,
  layers: any
): Promise<{ name: string; file: string }[]> {
  let icons: any = []

  for (const layer of layers) {
    try {
      const files = await readdir(`${layer.cwd}/${path}`)

      icons = [
        ...icons,
        ...files.map((file) => ({
          name: parse(file).name,
          file: `${layer.cwd}/${path}/${file}`
        }))
      ]
    } catch (e) {
      /* no-log-needed */
    }
  }

  return icons
}
