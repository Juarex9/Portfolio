import { useEffect, useRef } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { useFinePointer } from "../hooks/useFinePointer.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "label",
  "summary",
  '[role="button"]',
  '[role="link"]',
  '[data-cursor-hover]',
].join(", ");

export default function CustomCursor() {
  const finePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const enabled = finePointer && !prefersReducedMotion;

  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const visibleRef = useRef(false);

  const accentColor = useColorModeValue("#0066FF", "#67E8F9");
  const ringIdle = useColorModeValue("rgba(0, 102, 255, 0.35)", "rgba(103, 232, 249, 0.45)");
  const ringHover = useColorModeValue("rgba(0, 102, 255, 0.85)", "rgba(103, 232, 249, 0.95)");
  const dotGlow = useColorModeValue("rgba(0, 102, 255, 0.35)", "rgba(103, 232, 249, 0.5)");

  useEffect(() => {
    if (!enabled) return undefined;

    document.body.classList.add("custom-cursor-active");

    const setVisible = (visible) => {
      visibleRef.current = visible;
      if (rootRef.current) {
        rootRef.current.style.opacity = visible ? "1" : "0";
      }
    };

    const setHovering = (hovering) => {
      if (ringRef.current) {
        ringRef.current.classList.toggle("custom-cursor__ring--hover", hovering);
      }
      if (dotRef.current) {
        dotRef.current.classList.toggle("custom-cursor__dot--hover", hovering);
      }
    };

    const onMove = (event) => {
      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
      if (!visibleRef.current) setVisible(true);
    };

    const onOver = (event) => {
      setHovering(!!event.target.closest(INTERACTIVE_SELECTOR));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => {
      if (visibleRef.current) setVisible(true);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  useEffect(() => {
    if (!ringRef.current) return;
    ringRef.current.style.setProperty("--cursor-ring-idle", ringIdle);
    ringRef.current.style.setProperty("--cursor-ring-hover", ringHover);
    if (dotRef.current) {
      dotRef.current.style.setProperty("--cursor-accent", accentColor);
      dotRef.current.style.setProperty("--cursor-dot-glow", dotGlow);
    }
  }, [accentColor, ringIdle, ringHover, dotGlow]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="custom-cursor" aria-hidden="true">
      <span ref={ringRef} className="custom-cursor__ring" />
      <span ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}
