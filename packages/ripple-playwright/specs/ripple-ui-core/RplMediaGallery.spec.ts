import { test, expect } from '@playwright/experimental-ct-vue'
import RplMediaGallery from '../../../ripple-ui-core/src/components/media-gallery/RplMediaGallery.vue'

const props = {
  items: [
    {
      title: 'One',
      alt: 'Alt text',
      thumbnail:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA1',
      image:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA1'
    },
    {
      title: 'Two',
      alt: 'Alt text',
      thumbnail:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      image:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    }
  ]
} as any

test.describe(() => {
  test('mounts', async ({ mount }) => {
    const component = await mount(RplMediaGallery, { props })
    await expect(component).toBeAttached()
  })

  test('display a gallery fullscreen', async ({ mount, page }) => {
    const component = await mount(RplMediaGallery, { props })

    await component
      .locator('.rpl-media-gallery__primary-content .rpl-slider__slide')
      .first()
      .locator('.rpl-media-gallery__button')
      .click()
    await expect(page.locator('.rpl-media-gallery__modal')).toBeVisible()
  })

  test('navigates to through items with pagination', async ({ mount }) => {
    const component = await mount(RplMediaGallery, { props })

    await component.getByLabel('Go to next item').click()
    const active = component.locator(
      '.rpl-media-gallery__primary-content .swiper-slide-active'
    )
    await expect(active).toContainText(props.items[1].title)

    const img = component.locator(
      '.rpl-media-gallery__primary-images .swiper-slide-active .rpl-image'
    )
    await expect(img).toHaveAttribute('src', props.items[1].thumbnail)

    await component.getByLabel('Go to previous item').click()
    await expect(active).toContainText(props.items[0].title)
    await expect(img).toHaveAttribute('src', props.items[0].thumbnail)
  })

  test('displays the item navigated too fullscreen', async ({
    mount,
    page
  }) => {
    const component = await mount(RplMediaGallery, { props })

    await component.getByLabel('Go to next item').click()

    await component
      .locator(
        '.rpl-media-gallery__primary-content .swiper-slide-active .rpl-media-gallery__button'
      )
      .click()

    await expect(page.locator('.rpl-media-gallery__modal')).toBeVisible()

    await expect(
      page.locator('.rpl-media-gallery__modal-content .swiper-slide-active')
    ).toContainText(props.items[1].title)

    await expect(
      page.locator(
        '.rpl-media-gallery__modal-images .swiper-slide-active .rpl-image'
      )
    ).toHaveAttribute('src', props.items[1].thumbnail)
  })

  test('allows navigating through items in fullscreen gallery', async ({
    mount,
    page
  }) => {
    const component = await mount(RplMediaGallery, { props })

    await component
      .locator('.rpl-media-gallery__primary-content .rpl-media-gallery__button')
      .first()
      .click()

    const modal = page.locator('.rpl-media-gallery__modal')
    const active = modal.locator(
      '.rpl-media-gallery__modal-content .swiper-slide-active'
    )
    const img = active.locator('.rpl-image')

    await modal.getByLabel('Go to next item').click()
    await expect(active).toContainText(props.items[1].title)
    await expect(img).toHaveAttribute('src', props.items[1].image)

    await modal.getByLabel('Go to previous item').click()
    await expect(active).toContainText(props.items[0].title)
    await expect(img).toHaveAttribute('src', props.items[0].image)
  })
})
