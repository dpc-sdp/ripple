import type { RplSlidesPerView } from '../card-carousel'

export interface RplSliderProps {
  perView?: RplSlidesPerView
  showPagination?: boolean
  showTally?: boolean
  effect?: 'fade'
  currentSlide?: number
  label?: string
  contentType?: string
  itemElement?: string
  wrapperElement?: string
  changeNotice?: boolean | string
}
