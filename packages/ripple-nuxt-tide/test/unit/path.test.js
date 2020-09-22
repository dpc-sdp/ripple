import { isPreviewPath, isShareLinkPath } from '../../lib/core/path'

describe('Path', () => {
  test('"/preview-page" route is not preview path', async () => {
    const result = isPreviewPath('/preview-page')
    expect(result).toEqual(false)
  })

  test('"/preview/..." route is preview path', async () => {
    const result = isPreviewPath('/preview/landing_page/d5457459-1735-4b80-8fc6-46e6bdfd74b3/latest?section=224')
    expect(result).toEqual(true)
  })

  test('"/share_link" route is not share link path', async () => {
    const result = isShareLinkPath('/share_link')
    expect(result).toEqual(false)
  })

  test('"/share_link/..." route is share link path', async () => {
    const result = isShareLinkPath('/share_link/abcd2e43-6605-4103-2158-051ca394a0e5/9082?section=298')
    expect(result).toEqual(true)
  })
})
