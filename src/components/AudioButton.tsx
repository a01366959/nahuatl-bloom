import { useState } from "react";
import { motion } from "framer-motion";
import { IconVolume, IconPlayerPlay, IconLoader2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AudioButtonProps {
  audioUrl?: string;
  onPlay?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
  className?: string;
}

export function AudioButton({
  audioUrl,
  onPlay,
  size = "md",
  variant = "default",
  className,
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sizeConfig = {
    sm: { button: "icon-sm" as const, icon: 16 },
    md: { button: "icon" as const, icon: 20 },
    lg: { button: "icon-lg" as const, icon: 24 },
  };

  const handlePlay = async () => {
    if (isPlaying || isLoading) return;
    
    if (onPlay) {
      onPlay();
      return;
    }

    if (!audioUrl) return;

    try {
      setIsLoading(true);
      const audio = new Audio(audioUrl);
      
      audio.oncanplaythrough = () => {
        setIsLoading(false);
        setIsPlaying(true);
        audio.play();
      };

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.onerror = () => {
        setIsLoading(false);
        setIsPlaying(false);
      };

      audio.load();
    } catch (error) {
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const Icon = isLoading ? IconLoader2 : isPlaying ? IconVolume : IconPlayerPlay;

  return (
    <Button
      variant={variant === "outline" ? "outline" : "audio"}
      size={sizeConfig[size].button}
      onClick={handlePlay}
      disabled={isLoading}
      className={cn(
        variant === "outline" && "rounded-full",
        className
      )}
    >
      <motion.div
        animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
      >
        <Icon
          size={sizeConfig[size].icon}
          className={cn(isLoading && "animate-spin")}
        />
      </motion.div>
    </Button>
  );
}
