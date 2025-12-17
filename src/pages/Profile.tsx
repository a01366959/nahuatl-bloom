import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  IconUser, 
  IconSettings, 
  IconKey,
  IconLanguage,
  IconLogout,
  IconChevronRight,
  IconStar,
  IconFlame,
  IconTrophy,
  IconCheck
} from "@tabler/icons-react";
import { BottomNav } from "@/components/BottomNav";
import { NotionBlock } from "@/components/NotionBlock";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Demo user stats
const userStats = {
  totalXP: 1250,
  wordsLearned: 48,
  lessonsCompleted: 12,
  currentStreak: 7,
  longestStreak: 14,
  level: 3,
  badges: [
    { id: "b1", name: "First Steps", description: "Complete your first lesson", earned: true },
    { id: "b2", name: "Week Warrior", description: "7 day streak", earned: true },
    { id: "b3", name: "Word Master", description: "Learn 100 words", earned: false },
  ],
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("Learner");
  const [userEmail, setUserEmail] = useState("");
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [newPin, setNewPin] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("nahuatl_user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserName(parsed.name || "Learner");
      setUserEmail(parsed.email || "");
    }
  }, []);

  const handleSavePin = () => {
    if (newPin.length >= 4 && newPin.length <= 6) {
      localStorage.setItem("nahuatl_pin", newPin);
      toast({
        title: "PIN saved!",
        description: "You can now use your PIN for quick login.",
      });
      setShowPinSetup(false);
      setNewPin("");
    } else {
      toast({
        title: "Invalid PIN",
        description: "PIN must be 4-6 digits.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nahuatl_user");
    toast({
      title: "Signed out",
      description: "See you next time!",
    });
    navigate("/auth");
  };

  const hasPin = localStorage.getItem("nahuatl_pin") !== null;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-background safe-area-top">
        <div className="px-4 py-6">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
              <IconUser size={28} className="text-gray-25" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{userName}</h1>
              <p className="text-sm text-muted-foreground">{userEmail || "Level " + userStats.level + " Learner"}</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-2 space-y-4">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="notion-block p-3 text-center">
            <IconStar size={20} className="mx-auto mb-1 text-gray-600" />
            <p className="text-lg font-bold text-foreground">{userStats.totalXP}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div className="notion-block p-3 text-center">
            <IconFlame size={20} className="mx-auto mb-1 text-streak" />
            <p className="text-lg font-bold text-foreground">{userStats.currentStreak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="notion-block p-3 text-center">
            <IconTrophy size={20} className="mx-auto mb-1 text-gray-600" />
            <p className="text-lg font-bold text-foreground">{userStats.wordsLearned}</p>
            <p className="text-xs text-muted-foreground">Words</p>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <NotionBlock
          title="Learning Progress"
          subtitle={`${userStats.lessonsCompleted} lessons completed`}
          icon={<IconTrophy size={20} />}
          defaultExpanded
        >
          <div className="space-y-4 mt-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Words Learned</span>
                <span className="font-medium">{userStats.wordsLearned}/100</span>
              </div>
              <ProgressBar value={userStats.wordsLearned} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Lessons Completed</span>
                <span className="font-medium">{userStats.lessonsCompleted}/25</span>
              </div>
              <ProgressBar value={(userStats.lessonsCompleted / 25) * 100} />
            </div>
          </div>
        </NotionBlock>

        {/* Badges */}
        <NotionBlock
          title="Achievements"
          subtitle={`${userStats.badges.filter(b => b.earned).length}/${userStats.badges.length} badges earned`}
          icon={<IconTrophy size={20} />}
        >
          <div className="space-y-2 mt-3">
            {userStats.badges.map((badge) => (
              <div
                key={badge.id}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  badge.earned ? "bg-gray-50" : "bg-gray-50/50 opacity-60"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  badge.earned ? "bg-success" : "bg-gray-200"
                }`}>
                  {badge.earned ? (
                    <IconCheck size={16} className="text-success-foreground" />
                  ) : (
                    <IconTrophy size={16} className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </NotionBlock>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-2"
        >
          <h2 className="text-sm font-semibold text-muted-foreground px-1">Settings</h2>
          
          {/* PIN Setup */}
          <NotionBlock
            title={hasPin ? "Change PIN" : "Set up PIN"}
            subtitle="Quick login with PIN code"
            icon={<IconKey size={20} />}
            onClick={() => setShowPinSetup(!showPinSetup)}
            rightContent={
              hasPin ? (
                <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded-md">
                  Active
                </span>
              ) : (
                <IconChevronRight size={18} className="text-gray-400" />
              )
            }
          />
          
          {showPinSetup && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="notion-block p-4"
            >
              <p className="text-sm text-muted-foreground mb-3">
                Enter a 4-6 digit PIN for quick login
              </p>
              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="Enter PIN"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="flex-1"
                  maxLength={6}
                />
                <Button onClick={handleSavePin}>Save</Button>
              </div>
            </motion.div>
          )}

          <NotionBlock
            title="Language"
            subtitle="English"
            icon={<IconLanguage size={20} />}
            expandable={false}
            rightContent={<IconChevronRight size={18} className="text-gray-400" />}
          />

          <NotionBlock
            title="App Settings"
            subtitle="Notifications, audio, display"
            icon={<IconSettings size={20} />}
            expandable={false}
            rightContent={<IconChevronRight size={18} className="text-gray-400" />}
          />
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            className="w-full text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <IconLogout size={18} />
            Sign Out
          </Button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
