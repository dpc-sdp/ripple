import { useRequestHeaders } from '#imports'

export const useSectionId = (): string => {
  const sectionIdHeaderName = 'section-io-id'
  const requestHeaders = useRequestHeaders([sectionIdHeaderName])
  return requestHeaders[sectionIdHeaderName] || 'no section id'
}

export default useSectionId
