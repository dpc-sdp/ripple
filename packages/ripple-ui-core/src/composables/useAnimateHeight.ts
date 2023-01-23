export function animateOpening(el: HTMLElement) {
  const elContentHeight = el.scrollHeight

  // Set the elements height to that of its content so that we aren't
  // transitioning to 'auto'
  el.style.height = `${elContentHeight}px`
  el.style.overflow = 'hidden'

  // When the transition ends remove the set height so it can default to auto
  el.addEventListener(
    'transitionend',
    () => {
      el.style.height = ''
      el.style.overflow = 'initial'
    },
    { once: true }
  )
}

export function animateClosing(el: HTMLElement) {
  const elContentHeight = el.scrollHeight

  // Set the elements height to that of its content so that we aren't
  // transitioning from 'auto'
  el.style.height = `${elContentHeight}px`
  el.style.overflow = 'hidden'

  // Set the height to 0 so that it can transition to closed
  requestAnimationFrame(() => {
    el.style.height = '0'
  })
}
