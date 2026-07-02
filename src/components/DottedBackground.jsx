import { useColorModeValue } from "../hooks/useColorModeValue.js";

export function DottedBackground({ children, className = "", ...props }) {
  const bgColor = useColorModeValue("#f4f5f7", "#111111");
  const dotColor = useColorModeValue("rgba(0, 0, 0, 0.03)", "rgba(255, 255, 255, 0.03)");

  return (
    <div className={`relative ${className}`} {...props}>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[length:16px_16px] md:bg-[length:20px_20px]"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
        }}
      />
      <div className="relative z-[1]" style={{ backgroundColor: bgColor }}>
        {children}
      </div>
    </div>
  );
}
