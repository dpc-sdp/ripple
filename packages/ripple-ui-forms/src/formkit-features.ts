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
          (rule: { name?: string }) =>
            rule.name === 'required' || rule.name === 'accepted'
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
        return !!node.parent!.props.inputErrors?.[node.name]
      }
    }
  })
}

export const hasNoLabel = (node: FormKitNode): void => {
  node.on('created', () => {
    if (node.context?.fns) {
      node.context.fns.hasNoLabel = () => {
        return !node.props.label
      }
    }
  })
}

export const getAriaDescribedBy = (node: FormKitNode): void => {
  node.on('created', () => {
    if (node.context?.fns) {
      node.context.fns.getAriaDescribedBy = () => {
        const helpId = `${node.context!.id}__help`
        const errorId = `${node.context!.id}__error`

        const describedBy = []

        if (
          node.parent!.props?.inputErrors &&
          node.parent!.props.inputErrors[node.name]
        ) {
          describedBy.push(errorId)
        }

        if (node.context!.help) {
          describedBy.push(helpId)
        }

        return describedBy.length > 0 ? describedBy.join(' ') : undefined
      }
    }
  })
}
