import markerPinSrc from './../../../assets/icons/icon-pin.svg?url'
import carPinSrc from './../../../assets/icons/icon-car.svg?url'

export const getIconForPopulation = (population) => {
  switch (true) {
    case population < 10491:
      return {
        color: [255, 80, 156],
        src: markerPinSrc
      }
    case population < 30491:
      return {
        color: [181, 0, 44],
        src: markerPinSrc
      }
    case population < 40491:
      return {
        color: [242, 59, 72],
        src: carPinSrc
      }
    case population < 80491:
      return {
        color: [253, 218, 36],
        src: carPinSrc
      }
  }
  return {
    color: [253, 218, 36],
    src: markerPinSrc
  }
}

export const truncateText = (text, stop = 150, clamp) => {
  if (text && typeof text === 'string') {
    if (text.length > stop) {
      return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
    }
    return text
  }
  return ''
}
