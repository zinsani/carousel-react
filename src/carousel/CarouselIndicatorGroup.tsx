import type { CSSProperties, ReactNode } from 'react'
import { useCarouselContext } from './carousel-context'
import { CarouselIndicator } from './CarouselIndicator'

export interface CarouselIndicatorGroupState {
  /** `[0, 1, ... pageCount - 1]` — map over this to render one indicator per page. */
  pages: number[]
  pageCount: number
  activePage: number
}

export interface CarouselIndicatorGroupProps {
  /**
   * Render function receiving the current page state. Omit it to have one
   * `Carousel.Indicator` rendered per page automatically.
   */
  children?: (state: CarouselIndicatorGroupState) => ReactNode
  className?: string
  style?: CSSProperties
  /** Applied to each auto-rendered indicator. Ignored when `children` is given. */
  indicatorClassName?: string
  'aria-label'?: string
}

export function CarouselIndicatorGroup({
  children,
  className,
  style,
  indicatorClassName,
  'aria-label': ariaLabel = 'Slide indicators',
}: CarouselIndicatorGroupProps) {
  const { pageCount, activePage } = useCarouselContext('IndicatorGroup')
  const pages = Array.from({ length: pageCount }, (_, index) => index)

  return (
    <div className={className} style={style} role="group" aria-label={ariaLabel}>
      {children
        ? children({ pages, pageCount, activePage })
        : pages.map((page) => (
            <CarouselIndicator key={page} index={page} className={indicatorClassName} />
          ))}
    </div>
  )
}
