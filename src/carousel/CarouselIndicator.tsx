import type { ComponentPropsWithoutRef } from 'react'
import { useCarouselContext } from './carousel-context'

export interface CarouselIndicatorProps extends ComponentPropsWithoutRef<'button'> {
  /** Zero-based page this indicator jumps to. */
  index: number
}

export function CarouselIndicator({
  index,
  'aria-label': ariaLabel,
  onClick,
  ...props
}: CarouselIndicatorProps) {
  const { activePage, scrollToPage } = useCarouselContext('Indicator')
  const active = index === activePage

  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) scrollToPage(index)
      }}
      aria-current={active || undefined}
      data-active={active || undefined}
      aria-label={ariaLabel ?? `Go to slide ${index + 1}`}
      {...props}
    />
  )
}
