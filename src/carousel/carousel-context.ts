import { createContext, useContext, type RefObject } from 'react'

export interface CarouselContextValue {
  cardsToShow: number
  gap: number
  /** Viewport width (px) at/above which the carousel switches to desktop behavior. */
  breakpoint: number
  isDesktop: boolean
  /** Cards per page below `breakpoint`. */
  mobileCardsToShow: number
  /** True only for the single-card mobile layout, the one that centres its page. */
  centred: boolean
  viewportRef: RefObject<HTMLDivElement | null>
  canScrollPrev: boolean
  canScrollNext: boolean
  /** Number of snap pages: `ceil(items / cardsToShow)` on desktop, one per item on mobile. */
  pageCount: number
  /** Zero-based index of the page currently scrolled into view. */
  activePage: number
  scrollPrev: () => void
  scrollNext: () => void
  scrollToPage: (index: number) => void
  /** Scroll the page containing the given item index into view. */
  scrollToItem: (index: number) => void
  updateScrollState: () => void
}

export const CarouselContext = createContext<CarouselContextValue | null>(null)

export function useCarouselContext(component: string) {
  const context = useContext(CarouselContext)
  if (!context) {
    throw new Error(`Carousel.${component} must be rendered inside Carousel.Root`)
  }
  return context
}
