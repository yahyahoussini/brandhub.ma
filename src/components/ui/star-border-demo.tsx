import { cn } from "@/lib/utils"
import { StarBorder } from "@/components/ui/star-border"

export function StarBorderDemo() {
  return (
    <div className="space-y-8 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">StarBorder Component Demo</h2>
        <p className="text-muted-foreground mb-8">
          Interactive buttons with animated star border effects
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StarBorder speed="2s" color="hsl(var(--primary))">
          Primary Button
        </StarBorder>
        
        <StarBorder speed="3s" color="hsl(var(--accent))">
          Accent Button
        </StarBorder>
        
        <StarBorder speed="4s" color="hsl(var(--destructive))">
          Destructive Button
        </StarBorder>
        
        <StarBorder 
          as="a" 
          href="#" 
          speed="2.5s" 
          color="rgba(255, 255, 255, 0.8)"
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          Gradient Link
        </StarBorder>
        
        <StarBorder 
          speed="3.5s" 
          color="hsl(var(--secondary))"
          className="bg-secondary text-secondary-foreground"
        >
          Secondary Style
        </StarBorder>
        
        <StarBorder 
          speed="1.5s" 
          color="hsl(var(--muted-foreground))"
          className="bg-muted text-muted-foreground"
        >
          Fast Animation
        </StarBorder>
      </div>
    </div>
  )
}
