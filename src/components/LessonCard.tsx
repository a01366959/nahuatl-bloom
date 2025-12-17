import { motion } from "framer-motion";
import { IconLock, IconCheck, IconPlayerPlay } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  title: string;
  subtitle?: string;
  isCompleted: boolean;
  isLocked: boolean;
  isCurrent?: boolean;
  exerciseCount?: number;
  onClick?: () => void;
}

export function LessonCard({
  title,
  subtitle,
  isCompleted,
  isLocked,
  isCurrent = false,
  exerciseCount = 0,
  onClick,
}: LessonCardProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "w-full notion-block p-4 text-left transition-all",
        isLocked && "opacity-50",
        isCurrent && "ring-2 ring-foreground ring-offset-2"
      )}
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center gap-3">
        {/* Status Icon */}
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
          isCompleted ? "bg-success" : isLocked ? "bg-gray-100" : "bg-gray-900"
        )}>
          {isCompleted ? (
            <IconCheck size={18} className="text-success-foreground" strokeWidth={3} />
          ) : isLocked ? (
            <IconLock size={16} className="text-gray-400" />
          ) : (
            <IconPlayerPlay size={16} className="text-gray-25" fill="currentColor" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={cn(
            "font-medium truncate",
            isCompleted ? "text-muted-foreground" : "text-foreground"
          )}>
            {title}
          </h4>
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Exercise Count */}
        {!isLocked && exerciseCount > 0 && (
          <div className="flex-shrink-0 px-2 py-1 bg-gray-100 rounded-md">
            <span className="text-xs font-medium text-gray-600">
              {exerciseCount} exercises
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}
