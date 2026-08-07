import { useEffect, type ReactNode } from 'react'
import { css, cx } from 'styled-system/css'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemGroupProps {
  children: ReactNode
  className?: string
  'aria-label'?: string
}

export function CarouselItemGroup({
  children,
  className,
  'aria-label': ariaLabel = 'Carousel',
}: CarouselItemGroupProps) {
  const { viewportRef, updateScrollState } = useCarouselContext('ItemGroup')

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
    node.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('scroll', handleScroll)
      resizeObserver.disconnect()
    }
  }, [viewportRef, updateScrollState])

  return (
    <div
      ref={viewportRef}
      className={cx(itemGroupStyle, className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </div>
  )
}

const itemGroupStyle = css({
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollSnapType: 'x mandatory',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  gap: 'var(--carousel-gap)',
  // Peek layout: symmetric 32px inset centers the first card and reveals
  // slivers of neighboring cards in the padding area.
  paddingInline: '32px',
  scrollPaddingInline: '32px',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  xs: {
    paddingInline: 0,
    scrollPaddingInline: 0,
  },
})
