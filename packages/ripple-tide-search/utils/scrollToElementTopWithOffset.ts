export function scrollToElementTopWithOffset(
  element: Element,
  offset: number = 0,
  smooth = true
) {
  const elementTop = element.getBoundingClientRect().top + window.scrollY
  const scrollToPosition = elementTop - offset

  window.scrollTo({
    top: scrollToPosition,
    behavior: smooth ? 'smooth' : undefined
  })
}
