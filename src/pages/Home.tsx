import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  IconBookmark, 
  IconTrendingUp, 
  IconTarget,
  IconChevronRight,
  IconPlayerPlay
} from "@tabler/icons-react";
import { BottomNav } from "@/components/BottomNav";
import { StatsBar } from "@/components/StatsBar";
import { NotionBlock } from "@/components/NotionBlock";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";

// Demo data
const demoUser = {
  name: "Learner",
  xp: 1250,
  streak: 7,
  hearts: 4,
  level: 3,
  totalXpForLevel: 2000,
};

const recommendedLesson = {
  unitTitle: "Unit 1: Greetings",
  lessonTitle: "Basic Introductions",
  progress: 60,
};

const weakWords = [
  { word: "Nimitztlazohtla", translation: "I love you", mastery: 30 },
  { word: "Tlazohcamati", translation: "Thank you", mastery: 45 },
  { word: "Cualli tonalli", translation: "Good day", mastery: 55 },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(demoUser);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("nahuatl_user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({ ...demoUser, name: parsed.name || "Learner" });
    }
  }, []);

  const levelProgress = (user.xp / user.totalXpForLevel) * 100;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 safe-area-top">
        <div className="px-4 py-3">
          <StatsBar
            xp={user.xp}
            streak={user.streak}
            hearts={user.hearts}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-4">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">
            Pialli, {user.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to continue learning?
          </p>
        </motion.div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="notion-block p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full xp-gradient flex items-center justify-center">
                <span className="text-sm font-bold text-gray-25">{user.level}</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Level {user.level}</h3>
                <p className="text-xs text-muted-foreground">
                  {user.totalXpForLevel - user.xp} XP to next level
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {user.xp}/{user.totalXpForLevel}
            </span>
          </div>
          <ProgressBar value={levelProgress} size="md" />
        </motion.div>

        {/* Continue Learning */}
        <NotionBlock
          title="Continue Learning"
          subtitle={recommendedLesson.unitTitle}
          icon={<IconPlayerPlay size={20} />}
          expandable={false}
          onClick={() => navigate("/units")}
          rightContent={
            <IconChevronRight size={20} className="text-gray-400" />
          }
        >
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{recommendedLesson.lessonTitle}</span>
              <span className="text-xs text-muted-foreground">
                {recommendedLesson.progress}%
              </span>
            </div>
            <ProgressBar value={recommendedLesson.progress} size="sm" />
            <Button className="w-full mt-3" size="sm">
              <IconPlayerPlay size={16} />
              Continue
            </Button>
          </div>
        </NotionBlock>

        {/* Quick Review */}
        <NotionBlock
          title="Quick Review"
          subtitle="Practice words you've learned"
          icon={<IconTrendingUp size={20} />}
          onClick={() => navigate("/review")}
          rightContent={
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
              12 words
            </span>
          }
        />

        {/* Weak Words */}
        <NotionBlock
          title="Words to Practice"
          subtitle="Focus on these challenging words"
          icon={<IconTarget size={20} />}
          defaultExpanded
        >
          <div className="space-y-3 mt-2">
            {weakWords.map((item, index) => (
              <motion.div
                key={item.word}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">{item.word}</p>
                  <p className="text-sm text-muted-foreground">{item.translation}</p>
                </div>
                <div className="w-16">
                  <ProgressBar value={item.mastery} size="sm" />
                </div>
              </motion.div>
            ))}
          </div>
        </NotionBlock>

        {/* Daily Goal */}
        <NotionBlock
          title="Daily Goal"
          subtitle="Complete 1 lesson today"
          icon={<IconBookmark size={20} />}
          rightContent={
            <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-md">
              0/1
            </span>
          }
        />
      </main>

      <BottomNav />
    </div>
  );
}
