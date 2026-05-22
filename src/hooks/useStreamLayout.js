import { useEffect, useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

const DESKTOP_CARD_WIDTH = 320;
const DESKTOP_CARD_GAP = 40;
const MOBILE_CARD_GAP = 24;

export function useStreamLayout(containerRef) {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const update = () => setContainerWidth(node.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [containerRef]);

  const cardGap = isMobile ? MOBILE_CARD_GAP : DESKTOP_CARD_GAP;
  const cardWidth = containerWidth
    ? Math.min(DESKTOP_CARD_WIDTH, Math.max(240, containerWidth - (isMobile ? 32 : 64)))
    : DESKTOP_CARD_WIDTH;
  const cardStep = cardWidth + cardGap;

  return { cardWidth, cardGap, cardStep, isMobile, containerWidth };
}
