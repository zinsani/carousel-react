import type { ReactNode } from "react";
import { css, cx } from "styled-system/css";

export interface CarouselItemProps {
  children: ReactNode;
  className?: string;
}

export function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <div
      className={cx(itemStyle, className)}
      role="group"
      aria-roledescription="slide"
    >
      {children}
    </div>
  );
}

const itemStyle = css({
  flex: "0 0 auto",
  // Mobile: (nearly) fill the padded viewport slot so the card centers and
  // neighbors peek through the container's inline padding.
  width: "100%",
  scrollSnapAlign: "center",
  xs: {
    // Desktop: evenly divide the viewport across `cardsToShow` cards, minus
    // the gaps between them, so cards edge-to-edge fill the container.
    width:
      "calc((100% - (var(--carousel-cards-to-show) - 1) * var(--carousel-gap)) / var(--carousel-cards-to-show))",
    scrollSnapAlign: "start",
  },
});
