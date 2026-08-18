import { test, expect } from '@playwright/experimental-ct-vue'
import MapWrapper from '../../playwright/MapWrapper.vue'
import featureData from '../../../ripple-ui-maps/src/components/map/__fixture__/features.json' with { type: 'json' }

const baseProps = {
  features: featureData,
  provider: 'vicmap',
  projection: 'EPSG:3857'
} as any

const coords = {
  vic: [16193060, -4383468],
  horsham: [15829632, -4399692]
}

const pins = {
  horsham: {
    x: 200,
    y: 300
  }
}

test.use({ viewport: { width: 1024, height: 768 } })

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(MapWrapper, {
      props: { mapProps: baseProps }
    })

    expect(component.locator('.rpl-map canvas')).toBeAttached()
  })

  test('centers on active pin', async ({ mount, page }) => {
    const component = await mount(MapWrapper, {
      props: {
        mapProps: {
          ...baseProps,
          clusteringDistance: 0
        }
      }
    })

    const map = component.locator('.rpl-map')
    const canvas = map.locator('canvas')
    await expect(canvas).toBeAttached()
    await page.waitForTimeout(500)

    await canvas.click({ position: pins.horsham })
    await page.waitForTimeout(1500)

    const centerCoords = (await map.getAttribute('data-center'))
      .split(',')
      .map(parseFloat)
      .map(Math.round)

    for (let i = 0; i <= 1; i++) {
      expect(centerCoords[i]).toBe(coords['horsham'][i])
    }
  })

  test('can disable centering on active pin', async ({ mount, page }) => {
    const component = await mount(MapWrapper, {
      props: {
        mapProps: {
          ...baseProps,
          clusteringDistance: 0,
          centerActivePin: false
        },
        provider: 'vicmap'
      }
    })

    const map = component.locator('.rpl-map')
    const canvas = map.locator('canvas')
    await expect(canvas).toBeAttached()
    await page.waitForTimeout(500)

    await canvas.click({ position: pins['horsham'] })
    await page.waitForTimeout(1500)

    const centerCoords = (await map.getAttribute('data-center'))
      .split(',')
      .map(parseFloat)
      .map(Math.round)

    for (let i = 0; i <= 1; i++) {
      expect(centerCoords[i]).toBe(coords['vic'][i])
    }
  })
})
