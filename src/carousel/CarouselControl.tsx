import type { CSSProperties, ReactNode } from 'react'
import { useCarouselContext } from './carousel-context'

export interface CarouselControlProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function CarouselControl({ children, className, style }: CarouselControlProps) {
  const { isDesktop } = useCarouselContext('Control')

  // Arrow buttons are desktop-only per spec — rendering nothing (rather than
  // hiding via CSS) guarantees they can't be interacted with on mobile
  // regardless of what styling a consumer applies.
  if (!isDesktop) return null

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
