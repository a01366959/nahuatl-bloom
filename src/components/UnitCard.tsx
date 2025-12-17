import { motion } from "framer-motion";
import { IconLock, IconCheck, IconChevronRight } from "@tabler/icons-react";
import { ProgressBar } from "./ProgressBar";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  locked: boolean;
}

interface UnitCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
  isLocked: boolean;
  onClick?: () => void;
}

export function UnitCard({
  title,
  description,
  progress,
  lessons,
  isLocked,
  onClick,
}: UnitCardProps) {
  const completedLessons = lessons.filter(l => l.completed).length;
  const totalLessons = lessons.length;

  return (
    <motion.div
      className={cn(
        "notion-block overflow-hidden",
        isLocked && "opacity-60"
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      whileTap={!isLocked ? { scale: 0.99 } : {}}
    >
      <button
        onClick={onClick}
        disabled={isLocked}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start gap-4">
          {/* Unit Icon */}
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
            isLocked ? "bg-gray-100" : "bg-gray-900"
          )}>
            {isLocked ? (
              <IconLock size={20} className="text-gray-400" />
            ) : progress === 100 ? (
              <IconCheck size={20} className="text-gray-25" strokeWidth={3} />
            ) : (
              <span className="text-lg font-bold text-gray-25">
                {completedLessons}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground truncate">{title}</h3>
              {progress === 100 && (
                <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded-full">
                  Complete
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
              {description}
            </p>
            
            {/* Progress */}
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar value={progress} size="sm" className="flex-1" />
              <span className="text-xs font-medium text-muted-foreground">
                {completedLessons}/{totalLessons}
              </span>
            </div>
          </div>

          {/* Arrow */}
          {!isLocked && (
            <IconChevronRight size={20} className="flex-shrink-0 text-gray-400 mt-1" />
          )}
        </div>
      </button>

      {/* Lesson Preview */}
      {!isLocked && progress < 100 && (
        <div className="px-4 pb-4 pt-0">
          <div className="h-px bg-border mb-3" />
          <div className="space-y-2">
            {lessons.slice(0, 3).map((lesson) => (
              <div
                key={lesson.id}
                className={cn(
                  "flex items-center gap-2 text-sm",
                  lesson.completed && "text-muted-foreground"
                )}
              >
                {lesson.completed ? (
                  <IconCheck size={14} className="text-success" />
                ) : lesson.locked ? (
                  <IconLock size={14} className="text-gray-300" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                )}
                <span className={cn(
                  lesson.completed && "line-through"
                )}>
                  {lesson.title}
                </span>
              </div>
            ))}
            {lessons.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{lessons.length - 3} more lessons
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
