import type { ComponentPropsWithoutRef } from 'react'
import { css, cx } from 'styled-system/css'
import { ArrowIcon } from './ArrowIcon'
import { useCarouselContext } from './carousel-context'

export type CarouselNextTriggerProps = ComponentPropsWithoutRef<'button'>

export function CarouselNextTrigger({ className, 'aria-label': ariaLabel, ...props }: CarouselNextTriggerProps) {
  const { canScrollNext, scrollNext } = useCarouselContext('NextTrigger')

  return (
    <button
      type="button"
      className={cx(triggerStyle, className)}
      onClick={scrollNext}
      disabled={!canScrollNext}
      aria-label={ariaLabel ?? 'Next slide'}
      {...props}
    >
      <ArrowIcon direction="right" />
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
    // Straddle the container's right edge: centered on the boundary so half
    // the button bleeds outside Carousel.Root regardless of the page's max-width.
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translate(50%, -50%)',
    _hover: {
      transform: 'translate(50%, -50%) scale(1.05)',
    },
  },
})
