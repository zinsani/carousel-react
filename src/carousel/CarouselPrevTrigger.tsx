import type { ComponentPropsWithoutRef } from 'react'
import { ArrowIcon } from './ArrowIcon'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevTriggerProps = ComponentPropsWithoutRef<'button'>

export function CarouselPrevTrigger({ 'aria-label': ariaLabel, ...props }: CarouselPrevTriggerProps) {
  const { canScrollPrev, scrollPrev } = useCarouselContext('PrevTrigger')
  const disabled = !canScrollPrev

  return (
    <button
      type="button"
      onClick={scrollPrev}
      disabled={disabled}
      data-disabled={disabled || undefined}
      aria-label={ariaLabel ?? 'Previous slide'}
      {...props}
    >
      <ArrowIcon direction="left" />
    </button>
  )
}
