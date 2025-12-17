import { useState } from "react";
import { motion } from "framer-motion";
import { 
  IconRefresh, 
  IconFlame, 
  IconTarget,
  IconPlayerPlay,
  IconCheck
} from "@tabler/icons-react";
import { BottomNav } from "@/components/BottomNav";
import { NotionBlock } from "@/components/NotionBlock";
import { ProgressBar } from "@/components/ProgressBar";
import { AudioButton } from "@/components/AudioButton";
import { Button } from "@/components/ui/button";

// Demo weak words data
const weakWordsData = [
  { 
    id: "w1", 
    nahuatl: "Nimitztlazohtla", 
    translation: "I love you", 
    mastery: 30,
    lastReviewed: "2 days ago",
    timesSeen: 5,
    timesMissed: 3
  },
  { 
    id: "w2", 
    nahuatl: "Tlazohcamati", 
    translation: "Thank you", 
    mastery: 45,
    lastReviewed: "1 day ago",
    timesSeen: 8,
    timesMissed: 2
  },
  { 
    id: "w3", 
    nahuatl: "Cualli tonalli", 
    translation: "Good day", 
    mastery: 55,
    lastReviewed: "Today",
    timesSeen: 10,
    timesMissed: 2
  },
  { 
    id: "w4", 
    nahuatl: "Ximopanolti", 
    translation: "Welcome", 
    mastery: 40,
    lastReviewed: "3 days ago",
    timesSeen: 4,
    timesMissed: 2
  },
  { 
    id: "w5", 
    nahuatl: "Niltze", 
    translation: "Hello", 
    mastery: 70,
    lastReviewed: "Today",
    timesSeen: 15,
    timesMissed: 1
  },
];

const recentWords = [
  { id: "r1", nahuatl: "Ce", translation: "One", mastery: 90 },
  { id: "r2", nahuatl: "Ome", translation: "Two", mastery: 85 },
  { id: "r3", nahuatl: "Yei", translation: "Three", mastery: 80 },
];

export default function ReviewPage() {
  const [selectedTab, setSelectedTab] = useState<"weak" | "recent">("weak");

  const wordsToShow = selectedTab === "weak" ? weakWordsData : recentWords;
  const averageMastery = Math.round(
    wordsToShow.reduce((acc, w) => acc + w.mastery, 0) / wordsToShow.length
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 safe-area-top">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Review & Practice</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Strengthen your memory
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-4">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="notion-block p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconTarget size={18} className="text-gray-500" />
              <span className="text-sm text-muted-foreground">To Review</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{weakWordsData.length}</p>
          </div>
          <div className="notion-block p-4">
            <div className="flex items-center gap-2 mb-2">
              <IconFlame size={18} className="text-streak" />
              <span className="text-sm text-muted-foreground">Avg. Mastery</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{averageMastery}%</p>
          </div>
        </motion.div>

        {/* Start Review Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Button className="w-full h-14" size="lg">
            <IconPlayerPlay size={20} />
            Start Review Session
          </Button>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2"
        >
          <button
            onClick={() => setSelectedTab("weak")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "weak"
                ? "bg-foreground text-background"
                : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
            }`}
          >
            Weak Words ({weakWordsData.length})
          </button>
          <button
            onClick={() => setSelectedTab("recent")}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedTab === "recent"
                ? "bg-foreground text-background"
                : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
            }`}
          >
            Recent ({recentWords.length})
          </button>
        </motion.div>

        {/* Words List */}
        <div className="space-y-3">
          {wordsToShow.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.03 }}
              className="notion-block p-4"
            >
              <div className="flex items-start gap-3">
                <AudioButton size="sm" variant="outline" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {word.nahuatl}
                    </h3>
                    {word.mastery >= 80 && (
                      <IconCheck size={16} className="text-success flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{word.translation}</p>
                  
                  {"lastReviewed" in word && (
                    <p className="text-xs text-gray-400 mt-1">
                      Last reviewed: {(word as typeof weakWordsData[0]).lastReviewed}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 w-20">
                  <div className="text-right mb-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {word.mastery}%
                    </span>
                  </div>
                  <ProgressBar value={word.mastery} size="sm" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips Block */}
        <NotionBlock
          title="Review Tips"
          subtitle="How spaced repetition works"
          icon={<IconRefresh size={20} />}
          defaultExpanded={false}
        >
          <div className="space-y-2 text-sm text-muted-foreground mt-2">
            <p>• Words you struggle with appear more frequently</p>
            <p>• Mastered words are reviewed less often</p>
            <p>• Regular practice builds long-term memory</p>
            <p>• Try to review daily for best results</p>
          </div>
        </NotionBlock>
      </main>

      <BottomNav />
    </div>
  );
}
