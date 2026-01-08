import { memo } from "react"
import { IconCloud } from "@/components/ui/interactive-icon-cloud"
import { SparklesCore } from "./ui/sparkles"

const slugs = [
  "typescript",
  "javascript",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "postgresql",
  "firebase",
  "vercel",
  "docker",
  "git",
  "github",
  "vuedotjs",
  "figma",
  "tailwindcss",
  "python",
  "angular",
  "php",
  "wordpress",
  "shopify",
  "sass",
  "mongodb",
  "blender",
  "canva",
]

const TechStackCloud = memo(() => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-full h-20 absolute top-0">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={400}
                className="w-full h-full"
                particleColor="#8b5cf6"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2 relative z-10">
              Technologies <span className="gradient-primary bg-clip-text text-transparent">Maîtrisées</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mt-4">
            Un écosystème complet de technologies modernes pour vos projets
          </p>
        </div>

        <div className="flex justify-center items-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center rounded-lg border bg-card/50 backdrop-blur-sm shadow-elegant">
            <IconCloud iconSlugs={slugs} />
          </div>
        </div>
      </div>
    </section>
  )
})

TechStackCloud.displayName = "TechStackCloud"

export default TechStackCloud
