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
  /** Below `breakpoint`, how much room is left free on each side of a card so
   * neighbouring cards peek through. */
  mobilePeek?: number
  /** Below `breakpoint`, the gutter kept at the container's edges, so the first
   * and last cards rest inset rather than against the edge. Cards still scroll
   * through this area — it insets where they come to rest, it doesn't clip. */
  mobileInset?: number
  /** Below `breakpoint`, clicking a non-active card scrolls it into the centre.
   * Off by default. */
  centerItemOnClick?: boolean
  children: ReactNode
  className?: string
  style?: CSSProperties
}

type CarouselCSSProperties = CSSProperties & {
  '--carousel-cards-to-show'?: number
  '--carousel-gap'?: string
  '--carousel-mobile-peek'?: string
  '--carousel-mobile-inset'?: string
}

export function CarouselRoot({
  cardsToShow,
  gap = 16,
  breakpoint = 576,
  mobilePeek = 32,
  mobileInset = 16,
  centerItemOnClick = false,
  children,
  className,
  style,
}: CarouselRootProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [pageCount, setPageCount] = useState(1)
  const [activePage, setActivePage] = useState(0)
  const isDesktop = useMediaQuery(`(min-width: ${breakpoint}px)`)

  /**
   * The `scrollLeft` each page snaps to. Pages group `cardsToShow` items on
   * desktop and one item per page on mobile, mirroring how far an arrow click
   * or a swipe travels. Offsets are clamped to the max scroll, so an uneven
   * final page resolves to the same position the browser actually stops at.
   */
  const getPageOffsets = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return []
    const items = Array.from(
      viewport.querySelectorAll<HTMLElement>(':scope > [data-carousel-item]'),
    )
    if (items.length === 0) return []

    const itemsPerPage = Math.max(1, isDesktop ? cardsToShow : 1)
    const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth)
    const paddingLeft = parseFloat(getComputedStyle(viewport).paddingLeft) || 0
    const base = items[0].offsetLeft

    const offsets: number[] = []
    for (let i = 0; i < items.length; i += itemsPerPage) {
      const distance = items[i].offsetLeft - base
      // Desktop snaps items to the start edge; mobile centers them.
      const ideal = isDesktop
        ? distance
        : paddingLeft + distance + items[i].offsetWidth / 2 - viewport.clientWidth / 2
      offsets.push(Math.max(0, Math.min(ideal, maxScrollLeft)))
    }
    return offsets
  }, [cardsToShow, isDesktop])

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth
    setCanScrollPrev(viewport.scrollLeft > 1)
    setCanScrollNext(viewport.scrollLeft < maxScrollLeft - 1)

    const offsets = getPageOffsets()
    setPageCount(Math.max(1, offsets.length))

    // Nearest snap offset wins. `<=` lets a later page win ties, so a clamped
    // final page beats the previous one when they resolve to the same offset.
    let nearest = 0
    let nearestDistance = Infinity
    offsets.forEach((offset, index) => {
      const distance = Math.abs(offset - viewport.scrollLeft)
      if (distance <= nearestDistance) {
        nearestDistance = distance
        nearest = index
      }
    })
    setActivePage(nearest)
  }, [getPageOffsets])

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

  const scrollToPage = useCallback(
    (index: number) => {
      const viewport = viewportRef.current
      if (!viewport) return
      const offsets = getPageOffsets()
      if (offsets.length === 0) return
      const clamped = Math.max(0, Math.min(index, offsets.length - 1))
      viewport.scrollTo({ left: offsets[clamped], behavior: 'smooth' })
    },
    [getPageOffsets],
  )

  const contextValue = useMemo(
    () => ({
      cardsToShow,
      gap,
      breakpoint,
      isDesktop,
      centerItemOnClick,
      viewportRef,
      canScrollPrev,
      canScrollNext,
      pageCount,
      activePage,
      scrollPrev,
      scrollNext,
      scrollToPage,
      updateScrollState,
    }),
    [
      cardsToShow,
      gap,
      breakpoint,
      isDesktop,
      centerItemOnClick,
      canScrollPrev,
      canScrollNext,
      pageCount,
      activePage,
      scrollPrev,
      scrollNext,
      scrollToPage,
      updateScrollState,
    ],
  )

  const rootStyle: CarouselCSSProperties = {
    position: 'relative',
    width: '100%',
    '--carousel-cards-to-show': cardsToShow,
    '--carousel-gap': `${gap}px`,
    '--carousel-mobile-peek': `${mobilePeek}px`,
    '--carousel-mobile-inset': `${mobileInset}px`,
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
