export default () => {
  function createHTMLElementFromString(text: string): HTMLOrSVGElement {
    const div = document.createElement('div')
    div.innerHTML = text.trim()
    const svg = div.firstElementChild
    svg.setAttribute('fill', 'currentColor')
    return svg
  }
  return {
    createHTMLElementFromString
  }
}
