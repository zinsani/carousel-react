import { CarouselRoot } from './CarouselRoot'
import { CarouselItemGroup } from './CarouselItemGroup'
import { CarouselItem } from './CarouselItem'
import { CarouselControl } from './CarouselControl'
import { CarouselPrevTrigger } from './CarouselPrevTrigger'
import { CarouselNextTrigger } from './CarouselNextTrigger'

export const Carousel = {
  Root: CarouselRoot,
  ItemGroup: CarouselItemGroup,
  Item: CarouselItem,
  Control: CarouselControl,
  PrevTrigger: CarouselPrevTrigger,
  NextTrigger: CarouselNextTrigger,
}

export type { CarouselRootProps } from './CarouselRoot'
export type { CarouselItemGroupProps } from './CarouselItemGroup'
export type { CarouselItemProps } from './CarouselItem'
export type { CarouselControlProps } from './CarouselControl'
export type { CarouselPrevTriggerProps } from './CarouselPrevTrigger'
export type { CarouselNextTriggerProps } from './CarouselNextTrigger'
