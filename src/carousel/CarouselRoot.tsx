import { useCallback, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { CarouselContext } from './carousel-context'
import { useMediaQuery } from './use-media-query'

export interface CarouselRootProps {
  /** Number of cards visible (and slid per arrow click) on desktop. Mobile always shows 1. */
  cardsToShow: number
  /** Gap between cards in px. */
  gap?: number
  /** Viewport width (px) at/above which the carousel switches to desktop behavior. */
  breakpoint?: number
  /** Below `breakpoint`, inline padding on the item group that centers the
   * first card and reveals slivers of neighboring cards. */
  mobilePeek?: number
  children: ReactNode
  className?: string
  style?: CSSProperties
}

type CarouselCSSProperties = CSSProperties & {
  '--carousel-cards-to-show'?: number
  '--carousel-gap'?: string
  '--carousel-mobile-peek'?: string
}

export function CarouselRoot({
  cardsToShow,
  gap = 16,
  breakpoint = 576,
  mobilePeek = 32,
  children,
  className,
  style,
}: CarouselRootProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const isDesktop = useMediaQuery(`(min-width: ${breakpoint}px)`)

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth
    setCanScrollPrev(viewport.scrollLeft > 1)
    setCanScrollNext(viewport.scrollLeft < maxScrollLeft - 1)
  }, [])

  const scrollPrev = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.scrollBy({ left: -viewport.clientWidth, behavior: 'smooth' })
  }, [])

  const scrollNext = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.scrollBy({ left: viewport.clientWidth, behavior: 'smooth' })
  }, [])

  const contextValue = useMemo(
    () => ({
      cardsToShow,
      gap,
      breakpoint,
      isDesktop,
      viewportRef,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      updateScrollState,
    }),
    [cardsToShow, gap, breakpoint, isDesktop, canScrollPrev, canScrollNext, scrollPrev, scrollNext, updateScrollState],
  )

  const rootStyle: CarouselCSSProperties = {
    position: 'relative',
    width: '100%',
    '--carousel-cards-to-show': cardsToShow,
    '--carousel-gap': `${gap}px`,
    '--carousel-mobile-peek': `${mobilePeek}px`,
    ...style,
  }

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={className} style={rootStyle}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}
