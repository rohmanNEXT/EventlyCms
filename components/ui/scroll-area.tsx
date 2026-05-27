"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const [isScrolling, setIsScrolling] = React.useState(false)
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const handleScroll = React.useCallback(() => {
    setIsScrolling(true)
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }
    
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false)
    }, 1500)
  }, [])

  return (
    <div
      data-slot="scroll-area"
      onScroll={handleScroll}
      className={cn(
        "relative overflow-y-auto h-full w-full",
        // Standard CSS for Firefox
        "[scrollbar-width:thin]",
        isScrolling 
          ? "[scrollbar-color:rgba(163,163,163,0.2)_transparent]" 
          : "[scrollbar-color:transparent_transparent]",
        // Webkit (Chrome, Safari, Edge)
        "[&::-webkit-scrollbar]:w-1",
        "[&::-webkit-scrollbar-track]:bg-transparent",
        // Only show thumb when scrolling or when hovering the area
        "[&::-webkit-scrollbar-thumb]:transition-colors",
        "[&::-webkit-scrollbar-thumb]:duration-300",
        isScrolling 
          ? "[&::-webkit-scrollbar-thumb]:bg-neutral-400/20" 
          : "[&::-webkit-scrollbar-thumb]:bg-transparent",
        "hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400/30",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function ScrollBar() {
  return null
}

export { ScrollArea, ScrollBar }
