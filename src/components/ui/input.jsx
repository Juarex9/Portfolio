import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-[var(--accent-brand)]",
        className,
      )}
      {...props}
    />
  );
});
