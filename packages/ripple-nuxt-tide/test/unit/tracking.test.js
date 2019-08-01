import { clientDoNotTrack, serverDoNotTrack } from './../../lib/core/tracking'

describe('Tracking', () => {
  test('clientDoNotTrack should return setting', async () => {
    navigator.doNotTrack = '1'
    expect(clientDoNotTrack()).toEqual(true)
    navigator.doNotTrack = null
    expect(clientDoNotTrack()).toEqual(false)
  })

  test('serverDoNotTrack should return setting', async () => {
    expect(serverDoNotTrack({ dnt: '1' })).toEqual(true)
    expect(serverDoNotTrack({ dnt: '0' })).toEqual(false)
    expect(serverDoNotTrack({})).toEqual(false)
  })
})
