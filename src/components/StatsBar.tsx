import { IconFlame, IconHeart, IconStar } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsBarProps {
  xp: number;
  streak: number;
  hearts: number;
  maxHearts?: number;
  className?: string;
}

export function StatsBar({ xp, streak, hearts, maxHearts = 5, className }: StatsBarProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {/* XP */}
      <motion.div 
        className="flex items-center gap-1.5"
        whileHover={{ scale: 1.02 }}
      >
        <div className="w-7 h-7 rounded-full xp-gradient flex items-center justify-center">
          <IconStar size={14} className="text-gray-25" fill="currentColor" />
        </div>
        <span className="text-sm font-semibold text-foreground">{xp.toLocaleString()}</span>
      </motion.div>
      
      {/* Streak */}
      <motion.div 
        className={cn(
          "flex items-center gap-1.5",
          streak > 0 && "streak-glow rounded-full px-2 py-0.5"
        )}
        whileHover={{ scale: 1.02 }}
        animate={streak > 0 ? { 
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <IconFlame 
          size={20} 
          className={streak > 0 ? "text-streak" : "text-gray-300"}
          fill={streak > 0 ? "currentColor" : "none"}
        />
        <span className={cn(
          "text-sm font-semibold",
          streak > 0 ? "text-foreground" : "text-muted-foreground"
        )}>
          {streak}
        </span>
      </motion.div>
      
      {/* Hearts */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxHearts }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <IconHeart
              size={18}
              className={i < hearts ? "text-destructive" : "text-gray-200"}
              fill={i < hearts ? "currentColor" : "none"}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
