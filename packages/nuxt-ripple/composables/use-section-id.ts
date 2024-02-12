import { useRequestHeaders } from '#imports'

export const useSectionId = (): string => {
  const sectionIdHeaderName = 'x-request-id'
  const requestHeaders = useRequestHeaders([sectionIdHeaderName])
  return requestHeaders[sectionIdHeaderName] || 'no section id'
}

export default useSectionId
