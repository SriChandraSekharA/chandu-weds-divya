import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_URL = "/nadaswaram.mp3";

const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
    });

    return () => {
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
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-gold/40 bg-card/80 backdrop-blur-md flex items-center justify-center text-gold hover:bg-gold/10 transition-colors cursor-pointer"
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
