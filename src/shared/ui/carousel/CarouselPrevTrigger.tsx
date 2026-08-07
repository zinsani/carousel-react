import type { ComponentPropsWithoutRef } from 'react'
import { css, cx } from 'styled-system/css'
import { ArrowIcon } from './ArrowIcon'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevTriggerProps = ComponentPropsWithoutRef<'button'>

export function CarouselPrevTrigger({ className, 'aria-label': ariaLabel, ...props }: CarouselPrevTriggerProps) {
  const { canScrollPrev, scrollPrev } = useCarouselContext('PrevTrigger')

  return (
    <button
      type="button"
      className={cx(triggerStyle, className)}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      aria-label={ariaLabel ?? 'Previous slide'}
      {...props}
    >
      <ArrowIcon direction="left" />
    </button>
  )
}

const triggerStyle = css({
  pointerEvents: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '10',
  height: '10',
  borderRadius: 'full',
  border: 'none',
  bg: 'white',
  color: 'gray.900',
  boxShadow: 'md',
  cursor: 'pointer',
  transition: 'opacity 0.15s ease, transform 0.15s ease',
  _disabled: {
    opacity: 0,
    pointerEvents: 'none',
  },
  xs: {
    // Straddle the container's left edge: centered on the boundary so half
    // the button bleeds outside Carousel.Root regardless of the page's max-width.
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translate(-50%, -50%)',
    _hover: {
      transform: 'translate(-50%, -50%) scale(1.05)',
    },
  },
})
