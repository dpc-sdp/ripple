import type { Locator } from '@playwright/experimental-ct-core'

export async function expectAll(
  locator: Locator,
  assertion: (item: Locator) => Promise<void>
) {
  const count = await locator.count()

  for (let i = 0; i < count; i++) {
    await assertion(locator.nth(i))
  }
}
