import { css, cx } from "styled-system/css";
import { Carousel } from "../src";
import { Card } from "./card/Card";

const CARDS = [
  {
    id: 1,
    title: "Whiskers",
    description: "A curious tabby who supervises every keystroke from the edge of the desk.",
    color: "hsl(266 90% 62%)",
  },
  {
    id: 2,
    title: "Mittens the Bold",
    description:
      "Fears nothing except the vacuum cleaner, cucumbers, and the sound of the treat bag being closed too quickly.",
    color: "hsl(206 90% 58%)",
  },
  {
    id: 3,
    title: "Sir Pounce-a-Lot",
    description: "Professional napper. Occasionally moonlights as a hunter of red dots.",
    color: "hsl(346 90% 62%)",
  },
  {
    id: 4,
    title: "Biscuit",
    description:
      "Kneads every soft surface in the house before settling in, and has strong opinions about breakfast timing.",
    color: "hsl(26 90% 58%)",
  },
  {
    id: 5,
    title: "Luna",
    description: "Prefers boxes two sizes too small and will not be convinced otherwise.",
    color: "hsl(146 60% 42%)",
  },
  {
    id: 6,
    title: "Captain Fluff",
    description:
      "Patrols the hallway at 3am. Reports of the patrol's findings are meowed loudly outside the bedroom door.",
    color: "hsl(186 80% 42%)",
  },
  {
    id: 7,
    title: "Pepper",
    description: "Small, orange, and convinced that every chair in the house was purchased for her alone.",
    color: "hsl(46 90% 50%)",
  },
];

function App() {
  return (
    <div className={pageStyle}>
      <h1 className={headingStyle}>Carousel</h1>
      <Carousel.Root cardsToShow={2} gap={16}>
        <Carousel.ItemGroup aria-label="Featured cards">
          {CARDS.map((card) => (
            <Carousel.Item key={card.id}>
              <Card
                title={card.title}
                description={card.description}
                imageSrc={`https://loremflickr.com/300/300/cat?lock=${card.id}`}
                imageAlt={card.title}
                accentColor={card.color}
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.Control>
          <Carousel.PrevTrigger className={cx(triggerStyle, prevTriggerStyle)} />
          <Carousel.NextTrigger className={cx(triggerStyle, nextTriggerStyle)} />
        </Carousel.Control>
        <Carousel.IndicatorGroup
          className={indicatorGroupStyle}
          indicatorClassName={indicatorStyle}
        />
      </Carousel.Root>
    </div>
  );
}

const pageStyle = css({
  maxWidth: { xs: "563px" },
  marginInline: "auto",
  paddingBlock: "10",
});

const headingStyle = css({
  fontSize: "2xl",
  fontWeight: "semibold",
  marginInline: { base: "8", xs: "0" },
  marginBottom: "6",
});

// The library ships zero visual/positioning opinion — everything below is
// purely this demo's own styling, applied via `className` on the headless
// parts. `Carousel.Root` is already `position: relative` (a functional detail
// the library sets inline), so these can position absolutely against it.
const triggerStyle = css({
  position: "absolute",
  top: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "10",
  height: "10",
  borderRadius: "full",
  border: "none",
  bg: "white",
  color: "gray.900",
  boxShadow: "md",
  cursor: "pointer",
  transition: "opacity 0.15s ease, transform 0.15s ease",
  _disabled: {
    opacity: 0,
    pointerEvents: "none",
  },
});

const prevTriggerStyle = css({
  left: 0,
  transform: "translate(-50%, -50%)",
  _hover: {
    transform: "translate(-50%, -50%) scale(1.05)",
  },
});

const nextTriggerStyle = css({
  right: 0,
  transform: "translate(50%, -50%)",
  _hover: {
    transform: "translate(50%, -50%) scale(1.05)",
  },
});

const indicatorGroupStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2",
  marginTop: "6",
});

// Inactive: small gray circle. Active: solid capsule, via the `data-active`
// attribute the headless Indicator sets on the current page. Colors follow the
// OS theme, matching the `color-scheme: light dark` declared in index.css.
const indicatorStyle = css({
  width: "2",
  height: "2",
  padding: 0,
  border: "none",
  borderRadius: "full",
  bg: "gray.300",
  cursor: "pointer",
  transition: "width 0.2s ease, background-color 0.2s ease",
  _hover: {
    bg: "gray.400",
  },
  "&[data-active]": {
    width: "6",
    bg: "black",
  },
  _osDark: {
    bg: "gray.600",
    _hover: {
      bg: "gray.500",
    },
    "&[data-active]": {
      bg: "white",
    },
  },
});

export default App;
