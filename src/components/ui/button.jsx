import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-primary text-primary-foreground hover:opacity-90",
  ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
  outline: "border bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
};

const sizes = {
  default: "h-10 px-5 text-sm",
  sm: "h-9 px-4 text-sm",
  xs: "h-8 px-3 text-xs",
  icon: "h-8 w-8",
  lg: "h-11 px-6 text-base",
};

export const Button = forwardRef(function Button(
  { className, variant = "default", size = "default", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
});
