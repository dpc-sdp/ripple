export function animateOpening(el) {
  // TODO: Type as ref
  const elContentHeight = el.scrollHeight

  // Set the elements height to that of its content so that we aren't
  // transitioning to 'auto'
  el.style.height = `${elContentHeight}px`

  // When the transition ends remove the set height so it can default to auto
  el.addEventListener(
    'transitionend',
    () => {
      el.style.height = null
    },
    { once: true }
  )
}

export function animateClosing(el) {
  // TODO: Type as ref
  const elContentHeight = el.scrollHeight

  // Set the elements height to that of its content so that we aren't
  // transitioning from 'auto'
  el.style.height = `${elContentHeight}px`

  // Set the height to 0 so that it can transition to closed
  requestAnimationFrame(() => {
    el.style.height = '0'
  })
}
