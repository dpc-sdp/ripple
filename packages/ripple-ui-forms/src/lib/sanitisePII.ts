import { FormKitNode } from '@formkit/core'

// Get field labels instead of values
const getFieldLabel = (
  value: string | string[] | unknown,
  options: { label: string; value: string }[]
) => {
  if (Array.isArray(value)) {
    value = value.map((v: string) => {
      const option = options.find((o) => o.value !== undefined && o.value === v)
      return option?.label ?? v
    })
  } else {
    const option = options.find(
      (o) => o.value !== undefined && o.value === value
    )
    value = option?.label ?? value
  }

  return value
}

// Sanitize personally identifiable information for a single field
export const sanitisePIIField = (
  pii: boolean | unknown,
  value: any,
  options?: { label: string; value: string }[]
) => {
  if (value && Array.isArray(options) && options.length) {
    value = getFieldLabel(value, options)
  }

  const val = Array.isArray(value) ? value.join(',') : value

  return pii !== false ? '[redacted]' : val
}

// Sanitize personally identifiable for a complete form
export const sanitisePIIFields = (node: FormKitNode) => {
  const displayFields = ['RplFormDivider', 'RplFormContent']

  const getChildValues = (children: FormKitNode[]) => {
    return children.reduce((acc, curr: FormKitNode) => {
      if (displayFields.includes(curr?.props?.type)) return acc

      if (curr?.children?.length) {
        acc[curr.name] = getChildValues(curr.children)
      } else {
        acc[curr.name] = sanitisePIIField(
          curr?.context?.pii,
          curr?.value,
          curr?.context?.options
        )
      }

      return acc
    }, {})
  }

  return getChildValues(node?.children || [])
}
