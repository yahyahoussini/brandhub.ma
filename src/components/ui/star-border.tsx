import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

interface StarBorderProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  className?: string
  children: React.ReactNode
}

export function StarBorder<T extends ElementType = "button">({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "button"
  const defaultColor = color || "hsl(var(--foreground))"

  return (
    <Component 
      className={cn(
        "relative inline-block overflow-hidden rounded-lg border border-border/30",
        "bg-gradient-to-b from-background/95 to-muted/95",
        "hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
        "transition-all duration-300",
        "dark:from-background dark:to-muted dark:border-border/50",
        className
      )} 
      {...props}
    >
      <div
        className={cn(
          "absolute w-[200%] h-[30%] bottom-[-5px] right-[-100%] rounded-full animate-star-movement-bottom z-0",
          "opacity-10 dark:opacity-30" 
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 20%)` ,
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[200%] h-[30%] top-[-5px] left-[-100%] rounded-full animate-star-movement-top z-0",
          "opacity-10 dark:opacity-30"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 20%)` ,
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-10 text-center px-4 py-2 rounded-lg",
        "text-foreground"
      )}>
        {children}
      </div>
    </Component>
  )
}
