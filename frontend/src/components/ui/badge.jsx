import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-800",
        secondary:
          "border-zinc-200 bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
        outline: "border-zinc-300 text-zinc-800 bg-white",
        ghost: "border-transparent bg-transparent text-zinc-700",
        noir: "border-zinc-800 bg-black text-white",
        destructive:
          "border-zinc-300 bg-zinc-100 text-zinc-900 line-through opacity-70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
