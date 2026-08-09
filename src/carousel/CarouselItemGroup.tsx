import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemGroupProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  'aria-label'?: string
}

export function CarouselItemGroup({
  children,
  className,
  style,
  'aria-label': ariaLabel = 'Carousel',
}: CarouselItemGroupProps) {
  const { viewportRef, updateScrollState, isDesktop } = useCarouselContext('ItemGroup')

  useEffect(() => {
    const node = viewportRef.current
    if (!node) return

    updateScrollState()

    let frame = 0
    const handleScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateScrollState)
    }

    const resizeObserver = new ResizeObserver(() => updateScrollState())
    resizeObserver.observe(node)
    // Adding/removing slides changes the page count without resizing the
    // viewport itself, so ResizeObserver alone would miss it.
    const mutationObserver = new MutationObserver(() => updateScrollState())
    mutationObserver.observe(node, { childList: true })
    node.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [viewportRef, updateScrollState])

  const itemGroupStyle: CSSProperties = {
    display: 'flex',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    gap: 'var(--carousel-gap)',
    // Peek layout on mobile: symmetric inset centers the first card and
    // reveals slivers of neighboring cards in the padding area.
    paddingInline: isDesktop ? 0 : 'var(--carousel-mobile-peek)',
    scrollPaddingInline: isDesktop ? 0 : 'var(--carousel-mobile-peek)',
    ...style,
  }

  return (
    <div
      ref={viewportRef}
      className={className}
      style={itemGroupStyle}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </div>
  )
}
