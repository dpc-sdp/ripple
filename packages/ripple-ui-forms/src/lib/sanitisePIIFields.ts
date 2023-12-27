import { FormKitNode } from '@formkit/core'

// Sanitize personally identifiable information and return just the 'public' i.e. non-pii data
const sanitisePIIFields = (node: FormKitNode) => {
  const displayFields = ['RplFormDivider', 'RplFormContent']

  const getChildValues = (children: FormKitNode[]) => {
    return children.reduce((acc, curr) => {
      if (displayFields.includes(curr?.props?.type)) return acc

      if (curr?.children?.length) {
        acc[curr.name] = getChildValues(curr.children)
      } else {
        acc[curr.name] =
          curr?.context?.pii !== false ? '[redacted]' : curr?.value
      }

      return acc
    }, {})
  }

  return getChildValues(node?.children || [])
}

export default sanitisePIIFields
