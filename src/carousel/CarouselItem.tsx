import type { CSSProperties, ReactNode } from 'react'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function CarouselItem({ children, className, style }: CarouselItemProps) {
  const { isDesktop } = useCarouselContext('Item')

  const itemStyle: CSSProperties = {
    flex: '0 0 auto',
    // Desktop: evenly divide the viewport across `cardsToShow` cards, minus the
    // gaps between them, so cards fill the container edge-to-edge. Mobile: fill
    // the padded viewport slot so the card centers and neighbors peek in from
    // the container's inline padding (see CarouselItemGroup).
    width: isDesktop
      ? 'calc((100% - (var(--carousel-cards-to-show) - 1) * var(--carousel-gap)) / var(--carousel-cards-to-show))'
      : '100%',
    scrollSnapAlign: isDesktop ? 'start' : 'center',
    ...style,
  }

  return (
    <div className={className} style={itemStyle} role="group" aria-roledescription="slide">
      {children}
    </div>
  )
}
