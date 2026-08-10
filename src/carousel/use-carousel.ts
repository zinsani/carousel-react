import { useContext } from 'react'
import { CarouselContext } from './carousel-context'

export interface UseCarouselReturn {
  /** Zero-based index of the page currently scrolled into view. */
  activePage: number
  /** `ceil(items / cardsToShow)`, using whichever count applies at this width. */
  pageCount: number
  /** True at/above `breakpoint`. */
  isDesktop: boolean
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
  /** Scroll a page into view by its zero-based index. */
  scrollToPage: (index: number) => void
  /** Scroll the page containing the given item index into view. */
  scrollToItem: (index: number) => void
}

/**
 * Read carousel state and drive it imperatively from anywhere inside
 * `Carousel.Root` — for wiring up your own controls, or reacting to clicks on
 * card content without the library binding handlers on your behalf.
 */
export function useCarousel(): UseCarouselReturn {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error('useCarousel must be called inside Carousel.Root')
  }

  const {
    activePage,
    pageCount,
    isDesktop,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollToPage,
    scrollToItem,
  } = context

  return {
    activePage,
    pageCount,
    isDesktop,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollToPage,
    scrollToItem,
  }
}
