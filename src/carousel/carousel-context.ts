import { createContext, useContext, type RefObject } from 'react'

export interface CarouselContextValue {
  cardsToShow: number
  gap: number
  /** Viewport width (px) at/above which the carousel switches to desktop behavior. */
  breakpoint: number
  isDesktop: boolean
  viewportRef: RefObject<HTMLDivElement | null>
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollPrev: () => void
  scrollNext: () => void
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
