import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { LessonCard } from "@/components/LessonCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ExerciseCard } from "@/components/ExerciseCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Demo lessons data
const lessonsData: Record<string, {
  unitTitle: string;
  lessons: Array<{
    id: string;
    title: string;
    subtitle: string;
    isCompleted: boolean;
    isLocked: boolean;
    exerciseCount: number;
  }>;
}> = {
  "unit-1": {
    unitTitle: "Unit 1: Greetings",
    lessons: [
      { id: "l1", title: "Hello & Goodbye", subtitle: "Niltze, Ximopanolti", isCompleted: true, isLocked: false, exerciseCount: 8 },
      { id: "l2", title: "Basic Introductions", subtitle: "Introducing yourself", isCompleted: true, isLocked: false, exerciseCount: 10 },
      { id: "l3", title: "Pleasantries", subtitle: "Polite expressions", isCompleted: true, isLocked: false, exerciseCount: 7 },
      { id: "l4", title: "Time of Day Greetings", subtitle: "Morning, afternoon, evening", isCompleted: false, isLocked: false, exerciseCount: 8 },
      { id: "l5", title: "Review & Practice", subtitle: "Test your knowledge", isCompleted: false, isLocked: true, exerciseCount: 15 },
    ],
  },
  "unit-2": {
    unitTitle: "Unit 2: Numbers",
    lessons: [
      { id: "l6", title: "Numbers 1-5", subtitle: "Ce, Ome, Yei, Nahui, Macuilli", isCompleted: true, isLocked: false, exerciseCount: 10 },
      { id: "l7", title: "Numbers 6-10", subtitle: "Chicuace to Mahtlactli", isCompleted: false, isLocked: false, exerciseCount: 10 },
      { id: "l8", title: "Numbers 11-20", subtitle: "Mahtlactli huan ce...", isCompleted: false, isLocked: true, exerciseCount: 12 },
      { id: "l9", title: "Counting Objects", subtitle: "Using numbers in context", isCompleted: false, isLocked: true, exerciseCount: 8 },
      { id: "l10", title: "Review & Practice", subtitle: "Test your knowledge", isCompleted: false, isLocked: true, exerciseCount: 15 },
    ],
  },
  "unit-3": {
    unitTitle: "Unit 3: Family",
    lessons: [
      { id: "l11", title: "Parents & Children", subtitle: "Tahtli, Nantli, Piltzintli", isCompleted: false, isLocked: false, exerciseCount: 10 },
      { id: "l12", title: "Siblings", subtitle: "Brothers and sisters", isCompleted: false, isLocked: true, exerciseCount: 8 },
      { id: "l13", title: "Extended Family", subtitle: "Grandparents, aunts, uncles", isCompleted: false, isLocked: true, exerciseCount: 10 },
      { id: "l14", title: "Family Activities", subtitle: "What we do together", isCompleted: false, isLocked: true, exerciseCount: 8 },
      { id: "l15", title: "Review & Practice", subtitle: "Test your knowledge", isCompleted: false, isLocked: true, exerciseCount: 15 },
    ],
  },
};

// Demo exercises
const demoExercises = [
  {
    type: "listen-select" as const,
    prompt: "What does this word mean?",
    audioUrl: "",
    options: [
      { id: "1", text: "Hello", isCorrect: true },
      { id: "2", text: "Goodbye", isCorrect: false },
      { id: "3", text: "Thank you", isCorrect: false },
      { id: "4", text: "Please", isCorrect: false },
    ],
  },
  {
    type: "read-select" as const,
    prompt: "Select the correct translation for 'Niltze'",
    options: [
      { id: "1", text: "Good morning", isCorrect: false },
      { id: "2", text: "Hello", isCorrect: true },
      { id: "3", text: "Good night", isCorrect: false },
      { id: "4", text: "See you later", isCorrect: false },
    ],
  },
  {
    type: "read-select" as const,
    prompt: "How do you say 'Thank you' in Nahuatl?",
    options: [
      { id: "1", text: "Niltze", isCorrect: false },
      { id: "2", text: "Ximopanolti", isCorrect: false },
      { id: "3", text: "Tlazohcamati", isCorrect: true },
      { id: "4", text: "Cualli tonalli", isCorrect: false },
    ],
  },
];

export default function LessonsPage() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [score, setScore] = useState(0);

  const unitData = lessonsData[unitId || "unit-1"] || lessonsData["unit-1"];

  const handleStartLesson = (lessonId: string, isLocked: boolean) => {
    if (!isLocked) {
      setActiveLesson(lessonId);
      setExerciseIndex(0);
      setScore(0);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
    }
  };

  const handleNextExercise = () => {
    if (exerciseIndex < demoExercises.length - 1) {
      setExerciseIndex(prev => prev + 1);
    } else {
      // Lesson complete
      toast({
        title: "Lesson Complete! 🎉",
        description: `You earned ${score + 10} XP!`,
      });
      setActiveLesson(null);
    }
  };

  const handleCloseLesson = () => {
    setActiveLesson(null);
  };

  // Exercise View
  if (activeLesson) {
    const currentExercise = demoExercises[exerciseIndex];
    const progress = ((exerciseIndex + 1) / demoExercises.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        {/* Exercise Header */}
        <header className="sticky top-0 z-40 bg-background safe-area-top">
          <div className="px-4 py-4">
            <div className="flex items-center gap-4 mb-3">
              <button
                onClick={handleCloseLesson}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <IconX size={20} />
              </button>
              <div className="flex-1">
                <ProgressBar value={progress} size="md" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                +{score} XP
              </span>
            </div>
          </div>
        </header>

        {/* Exercise Content */}
        <main className="px-4 py-6">
          <AnimatePresence mode="wait">
            <ExerciseCard
              key={exerciseIndex}
              {...currentExercise}
              onAnswer={handleAnswer}
              onNext={handleNextExercise}
            />
          </AnimatePresence>
        </main>
      </div>
    );
  }

  // Lessons List View
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 safe-area-top">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/units")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <IconArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                {unitData.unitTitle}
              </h1>
              <p className="text-sm text-muted-foreground">
                {unitData.lessons.filter(l => l.isCompleted).length}/{unitData.lessons.length} lessons completed
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Lessons List */}
      <main className="px-4 py-6 space-y-3">
        {unitData.lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <LessonCard
              {...lesson}
              isCurrent={!lesson.isCompleted && !lesson.isLocked && index === unitData.lessons.findIndex(l => !l.isCompleted && !l.isLocked)}
              onClick={() => handleStartLesson(lesson.id, lesson.isLocked)}
            />
          </motion.div>
        ))}
      </main>
    </div>
  );
}
