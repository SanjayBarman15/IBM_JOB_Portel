import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-zinc-950 text-white shadow hover:bg-zinc-800 border border-zinc-800/80",
        destructive:
          "bg-zinc-950 text-white hover:bg-red-950 hover:text-red-200 border border-red-900/30",
        outline:
          "border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:bg-zinc-100 hover:border-zinc-300",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200/50",
        ghost: "hover:bg-zinc-100 hover:text-zinc-900",
        link: "text-zinc-900 underline-offset-4 hover:underline",
        noir: "bg-gradient-to-b from-zinc-900 to-black text-white shadow-md hover:from-zinc-800 hover:to-zinc-950 border border-zinc-700/60",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-7 text-base font-semibold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

