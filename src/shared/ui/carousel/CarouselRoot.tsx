import { useCallback, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { css, cx } from 'styled-system/css'
import { CarouselContext } from './carousel-context'

export interface CarouselRootProps {
  /** Number of cards visible (and slid per arrow click) on desktop. Mobile always shows 1. */
  cardsToShow: number
  /** Gap between cards in px. */
  gap?: number
  children: ReactNode
  className?: string
}

type CarouselCSSProperties = CSSProperties & {
  '--carousel-cards-to-show'?: number
  '--carousel-gap'?: string
}

export function CarouselRoot({ cardsToShow, gap = 16, children, className }: CarouselRootProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

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
      viewportRef,
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
      updateScrollState,
    }),
    [cardsToShow, gap, canScrollPrev, canScrollNext, scrollPrev, scrollNext, updateScrollState],
  )

  const style: CarouselCSSProperties = {
    '--carousel-cards-to-show': cardsToShow,
    '--carousel-gap': `${gap}px`,
  }

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={cx(rootStyle, className)} style={style}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

const rootStyle = css({
  position: 'relative',
  width: '100%',
})
