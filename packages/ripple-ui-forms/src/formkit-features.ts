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

export const isFieldRequired = (node: FormKitNode): void => {
  node.on('created', () => {
    if (node.context?.fns) {
      node.context.fns.isFieldRequired = () => {
        const isRequired = node.props.parsedRules.some(
          (rule) => rule.name === 'required' || rule.name === 'accepted'
        )
        return isRequired
      }
    }
  })
}

export const isFieldInvalid = (node: FormKitNode): void => {
  node.on('created', () => {
    if (node.context?.fns) {
      node.context.fns.isFieldInvalid = () => {
        return node.context.state.validationVisible && !node.context.state.valid
      }
    }
  })
}
