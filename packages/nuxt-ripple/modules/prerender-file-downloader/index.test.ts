import { describe, it, expect } from '@jest/globals'
import { extractLinksFromHtml } from './utils'

describe('extractLinksFromHtml', () => {
  it('should extract links matching the pathPrefix and fileRegex', () => {
    const html = `
      <html>
        <body>
          <a href="/_local/files/sample.pdf">PDF</a>
          <a href="/_local/files/image.jpg">Image</a>
          <a href="/_local/files/document.docx">Document</a>
          <a href="/_local/files/video.mp4">Video</a>
          <a href="/_local/files/other.txt">Text</a>
        </body>
      </html>
    `
    const pathPrefix = '/_local/files/'
    const fileRegex = 'pdf|jpg|docx|mp4|txt'
    const expectedLinks = [
      '/_local/files/sample.pdf',
      '/_local/files/image.jpg',
      '/_local/files/document.docx',
      '/_local/files/video.mp4',
      '/_local/files/other.txt'
    ]

    const result = extractLinksFromHtml(html, pathPrefix, fileRegex)
    expect(result).toEqual(expectedLinks)
  })

  it('should return an empty array if no links match the pathPrefix and fileRegex', () => {
    const html = `
      <html>
        <body>
          <a href="/_local/files/sample.pdf">PDF</a>
          <a href="/_local/files/image.jpg">Image</a>
        </body>
      </html>
    `
    const pathPrefix = '/_local/files/'
    const fileRegex = 'docx|mp4|txt'
    const expectedLinks: string[] = []

    const result = extractLinksFromHtml(html, pathPrefix, fileRegex)
    expect(result).toEqual(expectedLinks)
  })

  it('should handle HTML with no links gracefully', () => {
    const html = `
      <html>
        <body>
          <p>No links here!</p>
        </body>
      </html>
    `
    const pathPrefix = '/_local/files/'
    const fileRegex = 'pdf|jpg|docx|mp4|txt'
    const expectedLinks: string[] = []

    const result = extractLinksFromHtml(html, pathPrefix, fileRegex)
    expect(result).toEqual(expectedLinks)
  })

  it('should handle HTML with links that do not match the pathPrefix', () => {
    const html = `
      <html>
        <body>
          <a href="/other/files/sample.pdf">PDF</a>
          <a href="/other/files/image.jpg">Image</a>
        </body>
      </html>
    `
    const pathPrefix = '/_local/files/'
    const fileRegex = 'pdf|jpg|docx|mp4|txt'
    const expectedLinks: string[] = []

    const result = extractLinksFromHtml(html, pathPrefix, fileRegex)
    expect(result).toEqual(expectedLinks)
  })
})
