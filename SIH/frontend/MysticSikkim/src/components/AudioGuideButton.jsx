import { useState, useRef } from "react";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";

/**
 * Audio Guide Button — uses Web Speech API (free, no API key needed)
 * Reads monastery history/description aloud in the user's preferred language
 */
export default function AudioGuideButton({ text, name }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(null);

  const speak = () => {
    if (!text) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const content = `${name}. ${text}`;
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith("en") && v.name.includes("Google")
    ) || voices.find((v) => v.lang.startsWith("en"));
    if (preferred) utterance.voice = preferred;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resume = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!text) return null;

  return (
    <div className="flex items-center gap-2">
      {!isPlaying ? (
        <button
          onClick={speak}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-700/60 hover:bg-amber-600/70 text-amber-200 rounded-lg border border-amber-600/30 transition-all"
          title="Listen to audio guide"
        >
          <Volume2 className="w-3.5 h-3.5" />
          Audio Guide
        </button>
      ) : (
        <div className="flex items-center gap-1.5">
          <button
            onClick={isPaused ? resume : pause}
            className="p-1.5 bg-amber-700/60 hover:bg-amber-600/70 text-amber-200 rounded-lg border border-amber-600/30 transition-all"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={stop}
            className="p-1.5 bg-red-900/50 hover:bg-red-800/60 text-red-300 rounded-lg border border-red-700/30 transition-all"
            title="Stop"
          >
            <VolumeX className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-amber-400/50 animate-pulse">Playing...</span>
        </div>
      )}
    </div>
  );
}
