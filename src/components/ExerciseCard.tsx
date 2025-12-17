import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconX, IconVolume } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { AudioButton } from "./AudioButton";
import { cn } from "@/lib/utils";

type ExerciseType = "listen-select" | "listen-type" | "read-select" | "matching" | "phonetics";

interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface ExerciseCardProps {
  type: ExerciseType;
  prompt: string;
  audioUrl?: string;
  options?: ExerciseOption[];
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
}

export function ExerciseCard({
  type,
  prompt,
  audioUrl,
  options = [],
  onAnswer,
  onNext,
}: ExerciseCardProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (option: ExerciseOption) => {
    if (showResult) return;
    
    setSelectedId(option.id);
    setIsCorrect(option.isCorrect);
    setShowResult(true);
    onAnswer(option.isCorrect);
  };

  const handleNext = () => {
    setSelectedId(null);
    setShowResult(false);
    onNext();
  };

  const getTypeLabel = () => {
    switch (type) {
      case "listen-select": return "Listen & Select";
      case "listen-type": return "Listen & Type";
      case "read-select": return "Read & Select";
      case "matching": return "Match the Pairs";
      case "phonetics": return "Phonetics";
      default: return "Exercise";
    }
  };

  return (
    <motion.div
      className="notion-block p-6"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
    >
      {/* Type Label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
          {getTypeLabel()}
        </span>
      </div>

      {/* Audio Section */}
      {(type === "listen-select" || type === "listen-type") && audioUrl && (
        <div className="flex justify-center mb-6">
          <AudioButton audioUrl={audioUrl} size="lg" />
        </div>
      )}

      {/* Prompt */}
      <h2 className="text-xl font-semibold text-foreground text-center mb-6">
        {prompt}
      </h2>

      {/* Options */}
      {(type === "listen-select" || type === "read-select") && (
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const showCorrect = showResult && option.isCorrect;
            const showWrong = showResult && isSelected && !option.isCorrect;

            return (
              <motion.button
                key={option.id}
                onClick={() => handleSelect(option)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  "hover:border-gray-300 active:scale-[0.99]",
                  !showResult && !isSelected && "border-border bg-card",
                  !showResult && isSelected && "border-foreground bg-gray-50",
                  showCorrect && "border-success bg-success/5",
                  showWrong && "border-destructive bg-destructive/5"
                )}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    !showResult && !isSelected && "border-gray-300",
                    !showResult && isSelected && "border-foreground bg-foreground",
                    showCorrect && "border-success bg-success",
                    showWrong && "border-destructive bg-destructive"
                  )}>
                    {showCorrect && <IconCheck size={14} className="text-success-foreground" />}
                    {showWrong && <IconX size={14} className="text-destructive-foreground" />}
                    {!showResult && isSelected && (
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className={cn(
                    "font-medium",
                    showCorrect && "text-success",
                    showWrong && "text-destructive"
                  )}>
                    {option.text}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Result Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "mt-6 p-4 rounded-xl",
              isCorrect ? "bg-success/10" : "bg-destructive/10"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <IconCheck size={20} className="text-success" />
              ) : (
                <IconX size={20} className="text-destructive" />
              )}
              <span className={cn(
                "font-semibold",
                isCorrect ? "text-success" : "text-destructive"
              )}>
                {isCorrect ? "Correct!" : "Not quite"}
              </span>
            </div>
            {!isCorrect && (
              <p className="text-sm text-muted-foreground">
                The correct answer was: {options.find(o => o.isCorrect)?.text}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6"
        >
          <Button
            onClick={handleNext}
            className="w-full"
            size="lg"
          >
            Continue
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
