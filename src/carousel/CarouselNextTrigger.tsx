import type { ComponentPropsWithoutRef } from 'react'
import { ArrowIcon } from './ArrowIcon'
import { useCarouselContext } from './carousel-context'

export type CarouselNextTriggerProps = ComponentPropsWithoutRef<'button'>

export function CarouselNextTrigger({ 'aria-label': ariaLabel, ...props }: CarouselNextTriggerProps) {
  const { canScrollNext, scrollNext } = useCarouselContext('NextTrigger')
  const disabled = !canScrollNext

  return (
    <button
      type="button"
      onClick={scrollNext}
      disabled={disabled}
      data-disabled={disabled || undefined}
      aria-label={ariaLabel ?? 'Next slide'}
      {...props}
    >
      <ArrowIcon direction="right" />
    </button>
  )
}
