import { css } from "styled-system/css";
import { Carousel } from "./shared/ui/carousel";
import { Card } from "./shared/ui/card/Card";

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
          <Carousel.PrevTrigger />
          <Carousel.NextTrigger />
        </Carousel.Control>
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

export default App;
