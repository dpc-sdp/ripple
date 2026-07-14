import { test, expect } from '@playwright/experimental-ct-vue'
import RplCardCarousel from '../../ripple-ui-core/src/components/card-carousel/RplCardCarousel.vue'

const items = [
  {
    type: 'promo',
    title: 'First card',
    url: '#'
  },
  {
    type: 'promo',
    title: 'Second card',
    url: '#'
  }
] as any

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplCardCarousel, { props: { items } })
    await expect(component).toBeAttached()
  })

  test('navigates through cards with pagination', async ({ mount }) => {
    const component = await mount(RplCardCarousel, { props: { items } })

    await component.getByLabel('Go to next item').click()
    await expect(component.locator('.swiper-slide-active')).toHaveText(
      items[1].title
    )

    await component.getByLabel('Go to previous item').click()
    await expect(component.locator('.swiper-slide-active')).toHaveText(
      items[0].title
    )
  })

  test('navigates through slot provided cards', async ({ mount }) => {
    const component = await mount(RplCardCarousel, {
      props: { perView: 1 },
      slots: {
        default: items
          .map(
            (item: { type?: string; title?: string }) =>
              // RplPromoCard is registered in playwright/index.ts
              `<RplPromoCard type="${item.type}" title="${item.title} slot" />`
          )
          .join('')
      } as any
    })

    await expect(component).toBeAttached()

    await component.getByLabel('Go to next item').click()
    await expect(component.locator('.swiper-slide-active')).toHaveText(
      `${items[1].title} slot`
    )

    await component.getByLabel('Go to previous item').click()
    await expect(component.locator('.swiper-slide-active')).toHaveText(
      `${items[0].title} slot`
    )
  })
})
