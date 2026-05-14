import { expect, test } from '@playwright/experimental-ct-vue'
import { defineComponent } from 'vue'
import RplCardCarousel from './RplCardCarousel.vue'
import RplNavCard from '../card/RplNavCard.vue'
import type { IRplCardCarouselItem } from './constants'

const items: IRplCardCarouselItem[] = [
  { type: 'promo' as const, title: 'First card', summary: 'Content', url: '#' },
  { type: 'promo' as const, title: 'Second card', summary: 'Content', url: '#' }
]

const props = { items }

test.describe('RplCardCarousel', () => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplCardCarousel, { props })

    await expect(component).toContainText(items[0].title)
  })

  test('navigates through cards with pagination', async ({ mount }) => {
    const component = await mount(RplCardCarousel, { props })

    await component.locator('[aria-label="Go to next item"]').click()
    await expect(component.locator('.swiper-slide-active')).toContainText(
      items[1].title
    )

    await component.locator('[aria-label="Go to previous item"]').click()
    await expect(component.locator('.swiper-slide-active')).toContainText(
      items[0].title
    )
  })

  test('navigates through slot provided cards', async ({ mount }) => {
    const component = await mount(
      defineComponent({
        components: {
          RplCardCarousel,
          RplNavCard
        },
        data() {
          return {
            items
          }
        },
        template: `
          <RplCardCarousel :per-view="1">
            <RplNavCard title="Slot card one" />
            <RplNavCard title="Slot card two" />
            <RplNavCard title="Slot card three" />
          </RplCardCarousel>
        `
      })
    )

    await component.locator('[aria-label="Go to next item"]').click()
    await expect(component.locator('.swiper-slide-active')).toContainText(
      'Slot card two'
    )

    await component.locator('[aria-label="Go to next item"]').click()
    await expect(component.locator('.swiper-slide-active')).toContainText(
      'Slot card three'
    )

    await component.locator('[aria-label="Go to previous item"]').click()
    await expect(component.locator('.swiper-slide-active')).toContainText(
      'Slot card two'
    )

    await component.locator('[aria-label="Go to previous item"]').click()
    await expect(component.locator('.swiper-slide-active')).toContainText(
      'Slot card one'
    )
  })
})
