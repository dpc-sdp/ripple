/**
 * Vite Plugin for Twig Templates
 *
 * This plugin allows importing .twig files as strings in Vite/Storybook.
 */

import { Plugin } from 'vite'
import { readFileSync } from 'fs'

export default function twigPlugin(): Plugin {
  return {
    name: 'vite-plugin-twig',
    transform(code, id) {
      if (id.endsWith('.twig')) {
        // Read the Twig file content
        const content = readFileSync(id, 'utf-8')

        // Export it as a string
        return {
          code: `export default ${JSON.stringify(content)}`,
          map: null
        }
      }
    }
  }
}
