import { FormKitNode } from '@formkit/core'

// Sanitize personally identifiable information for a single field
export const sanitisePIIField = (pii: boolean | unknown, value: any) => {
  const val = Array.isArray(value) ? value.join(',') : value

  return pii !== false ? '[redacted]' : val
}

// Sanitize personally identifiable for a complete form
export const sanitisePIIFields = (node: FormKitNode) => {
  const displayFields = ['RplFormDivider', 'RplFormContent']

  const getChildValues = (children: FormKitNode[]) => {
    return children.reduce((acc, curr) => {
      if (displayFields.includes(curr?.props?.type)) return acc

      if (curr?.children?.length) {
        acc[curr.name] = getChildValues(curr.children)
      } else {
        acc[curr.name] = sanitisePIIField(curr?.context?.pii, curr?.value)
      }

      return acc
    }, {})
  }

  return getChildValues(node?.children || [])
}
