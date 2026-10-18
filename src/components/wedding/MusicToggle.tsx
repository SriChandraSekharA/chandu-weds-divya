import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Vite's BASE_URL is "/chandu-weds-divya/" in production and "/" in dev.
// Prefixing keeps the public/ asset resolvable when the site is served from a sub-path.
const MUSIC_URL = `${import.meta.env.BASE_URL}nadaswaram.mp3`;

const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const attemptingRef = useRef(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    audio.setAttribute("playsinline", "true");
    audio.src = MUSIC_URL;
    audioRef.current = audio;

    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
    });

    const tryPlay = () => {
      if (attemptingRef.current || audio.paused === false) return;
      attemptingRef.current = true;

      // Use both play() and a silent unlock trick for Android
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      audio.play()
        .then(() => {
          setPlaying(true);
          setInitialized(true);
          removeListeners();
        })
        .catch(() => {
          attemptingRef.current = false;
        });
    };

    const events = ["click", "touchstart", "touchend", "scroll", "keydown", "pointerdown", "pointerup"];
    const handler = () => tryPlay();

    const removeListeners = () => {
      events.forEach(e => document.removeEventListener(e, handler));
    };

    events.forEach(e => document.addEventListener(e, handler, { passive: true, capture: true }));

    // Try autoplay immediately
    tryPlay();

    // Retry a few times with delay for slow Android browsers
    const retries = [500, 1500, 3000];
    const timers = retries.map(ms => setTimeout(tryPlay, ms));

    return () => {
      removeListeners();
      timers.forEach(clearTimeout);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
        setInitialized(true);
      }).catch((err) => {
        console.error("Playback failed:", err);
      });
    }
  }, [playing]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      onClick={togglePlay}
      className="fixed top-5 left-5 z-50 w-10 h-10 rounded-full border border-gold/40 bg-card/80 backdrop-blur-md flex items-center justify-center text-gold hover:bg-gold/10 transition-colors cursor-pointer"
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? (
        <Volume2 className="w-5 h-5" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-gold/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};

export default MusicToggle;
