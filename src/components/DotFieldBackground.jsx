import DotField from "./react-bits/DotField.jsx";
import { useColorModeValue } from "../hooks/useColorModeValue.js";
import { useFinePointer } from "../hooks/useFinePointer.js";
import { useReducedMotion } from "../hooks/useReducedMotion.js";

export default function DotFieldBackground() {
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useFinePointer();

  const gradientFrom = useColorModeValue(
    "rgba(0, 102, 255, 0.52)",
    "rgba(103, 232, 249, 0.55)",
  );
  const gradientTo = useColorModeValue(
    "rgba(0, 102, 255, 0.28)",
    "rgba(103, 232, 249, 0.3)",
  );
  const staticDotColor = useColorModeValue(
    "rgba(0, 0, 0, 0.14)",
    "rgba(255, 255, 255, 0.08)",
  );

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[length:12px_12px] md:bg-[length:14px_14px]"
        style={{
          backgroundImage: `radial-gradient(${staticDotColor} 1.25px, transparent 1.25px)`,
        }}
      />
    );
  }

  const interactive = finePointer;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <DotField
        dotRadius={2.25}
        dotSpacing={9}
        cursorRadius={420}
        bulgeStrength={interactive ? 38 : 0}
        glowRadius={0}
        sparkle={false}
        waveAmplitude={0}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        interactive={interactive}
        className="h-full w-full"
      />
    </div>
  );
}
