export function extractLinksFromHtml(
  html: string,
  pathPrefix: string,
  fileRegex: string
): string[] {
  const regex = new RegExp(
    `<a\\s+[^>]*href=["']?(${pathPrefix}[^"'>]+\\.(?:${fileRegex}))["']?[^>]*>`,
    'gi'
  )
  const matches = [...html.matchAll(regex)].map((match) => match[1])
  return matches
}
