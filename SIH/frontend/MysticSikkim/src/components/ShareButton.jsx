import { useState } from "react";
import { Share2, Check } from "lucide-react";

/**
 * Share Button — uses Web Share API on mobile, clipboard fallback on desktop
 */
export default function ShareButton({ title, text, url }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: title || "MysticSikkim",
      text: text || "Check out this monastery on MysticSikkim!",
      url: url || window.location.href,
    };

    // Try native share (works on mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User cancelled or not supported
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Final fallback
      const textArea = document.createElement("textarea");
      textArea.value = `${shareData.text}\n${shareData.url}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-700/60 hover:bg-stone-600/70 text-amber-200 rounded-lg border border-amber-700/20 transition-all"
      title="Share this monastery"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}
