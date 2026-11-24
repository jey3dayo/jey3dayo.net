import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,border-color] duration-150 ease-out-strong motion-safe:transition-[background-color,color,border-color,scale] motion-safe:active:scale-[0.97] outline-none focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border bg-card hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        hero: "bg-hero-foreground text-hero hover:bg-hero-foreground/90 focus-visible:ring-hero-foreground/70",
        heroOutline:
          "border border-hero-foreground/50 text-hero-foreground hover:bg-hero-foreground/15 focus-visible:ring-hero-foreground/70",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        touch: "h-11 px-5",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
