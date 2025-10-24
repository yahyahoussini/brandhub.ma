import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  const shareDescription = description ? encodeURIComponent(description) : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Lien copié!",
        description: "Le lien a été copié dans le presse-papiers."
      });

      // Track the copy event
      if ((window as any).gtag) {
        (window as any).gtag('event', 'share', {
          method: 'copy_link',
          content_type: 'article',
          item_id: url
        });
      }
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive"
      });
    }
  };

  const handleShare = (platform: string, shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
    
    // Track the share event
    if ((window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform,
        content_type: 'article',
        item_id: url
      });
    }
  };

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Partager cet article">
      <span className="text-sm text-muted-foreground mr-2">Partager:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook', shareLinks.facebook)}
        aria-label="Partager sur Facebook"
        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <Facebook className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter', shareLinks.twitter)}
        aria-label="Partager sur Twitter"
        className="hover:bg-sky-50 hover:text-sky-600 transition-colors"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin', shareLinks.linkedin)}
        aria-label="Partager sur LinkedIn"
        className="hover:bg-blue-50 hover:text-blue-700 transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyLink}
        aria-label="Copier le lien"
        className="hover:bg-gray-50 transition-colors"
      >
        <Link2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
