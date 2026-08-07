import type { ReactNode } from 'react'
import { css, cx } from 'styled-system/css'

export interface CarouselControlProps {
  children: ReactNode
  className?: string
}

export function CarouselControl({ children, className }: CarouselControlProps) {
  return <div className={cx(controlStyle, className)}>{children}</div>
}

const controlStyle = css({
  // Arrow buttons are desktop-only per requirements. `display: contents` on
  // desktop drops this wrapper from layout so PrevTrigger/NextTrigger can
  // position themselves absolutely against Carousel.Root, straddling its edges.
  display: 'none',
  xs: {
    display: 'contents',
  },
})
