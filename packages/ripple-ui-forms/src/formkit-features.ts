import { FormKitNode } from '@formkit/core'

/**
 * Allows us to concat two strings in formkit custom input definitions
 */
export const concatStrings = (node: FormKitNode): void => {
  node.on('created', () => {
    if (node.context?.fns) {
      node.context.fns.concatStrings = (stringA: string, stringB: string) => {
        return `${stringA}${stringB}`
      }
    }
  })
}
