import { CarouselRoot } from './CarouselRoot'
import { CarouselItemGroup } from './CarouselItemGroup'
import { CarouselItem } from './CarouselItem'
import { CarouselControl } from './CarouselControl'
import { CarouselPrevTrigger } from './CarouselPrevTrigger'
import { CarouselNextTrigger } from './CarouselNextTrigger'
import { CarouselIndicatorGroup } from './CarouselIndicatorGroup'
import { CarouselIndicator } from './CarouselIndicator'

export { useCarousel } from './use-carousel'
export type { UseCarouselReturn } from './use-carousel'

export const Carousel = {
  Root: CarouselRoot,
  ItemGroup: CarouselItemGroup,
  Item: CarouselItem,
  Control: CarouselControl,
  PrevTrigger: CarouselPrevTrigger,
  NextTrigger: CarouselNextTrigger,
  IndicatorGroup: CarouselIndicatorGroup,
  Indicator: CarouselIndicator,
}

export type { CarouselRootProps } from './CarouselRoot'
export type { CarouselItemGroupProps } from './CarouselItemGroup'
export type { CarouselItemProps } from './CarouselItem'
export type { CarouselControlProps } from './CarouselControl'
export type { CarouselPrevTriggerProps } from './CarouselPrevTrigger'
export type { CarouselNextTriggerProps } from './CarouselNextTrigger'
export type {
  CarouselIndicatorGroupProps,
  CarouselIndicatorGroupState,
} from './CarouselIndicatorGroup'
export type { CarouselIndicatorProps } from './CarouselIndicator'
