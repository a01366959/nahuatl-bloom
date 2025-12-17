import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IconArrowLeft } from "@tabler/icons-react";
import { BottomNav } from "@/components/BottomNav";
import { UnitCard } from "@/components/UnitCard";
import { Button } from "@/components/ui/button";

// Demo units data
const unitsData = [
  {
    id: "unit-1",
    title: "Unit 1: Greetings",
    description: "Learn basic greetings and introductions in Nahuatl",
    progress: 75,
    isLocked: false,
    lessons: [
      { id: "l1", title: "Hello & Goodbye", completed: true, locked: false },
      { id: "l2", title: "Basic Introductions", completed: true, locked: false },
      { id: "l3", title: "Pleasantries", completed: true, locked: false },
      { id: "l4", title: "Time of Day Greetings", completed: false, locked: false },
      { id: "l5", title: "Review & Practice", completed: false, locked: true },
    ],
  },
  {
    id: "unit-2",
    title: "Unit 2: Numbers",
    description: "Count from 1 to 20 and beyond",
    progress: 20,
    isLocked: false,
    lessons: [
      { id: "l6", title: "Numbers 1-5", completed: true, locked: false },
      { id: "l7", title: "Numbers 6-10", completed: false, locked: false },
      { id: "l8", title: "Numbers 11-20", completed: false, locked: true },
      { id: "l9", title: "Counting Objects", completed: false, locked: true },
      { id: "l10", title: "Review & Practice", completed: false, locked: true },
    ],
  },
  {
    id: "unit-3",
    title: "Unit 3: Family",
    description: "Talk about your family members",
    progress: 0,
    isLocked: false,
    lessons: [
      { id: "l11", title: "Parents & Children", completed: false, locked: false },
      { id: "l12", title: "Siblings", completed: false, locked: true },
      { id: "l13", title: "Extended Family", completed: false, locked: true },
      { id: "l14", title: "Family Activities", completed: false, locked: true },
      { id: "l15", title: "Review & Practice", completed: false, locked: true },
    ],
  },
  {
    id: "unit-4",
    title: "Unit 4: Food & Drink",
    description: "Learn vocabulary for common foods",
    progress: 0,
    isLocked: true,
    lessons: [
      { id: "l16", title: "Fruits & Vegetables", completed: false, locked: true },
      { id: "l17", title: "Meats & Proteins", completed: false, locked: true },
      { id: "l18", title: "Drinks", completed: false, locked: true },
      { id: "l19", title: "At the Market", completed: false, locked: true },
      { id: "l20", title: "Review & Practice", completed: false, locked: true },
    ],
  },
  {
    id: "unit-5",
    title: "Unit 5: Colors & Nature",
    description: "Describe the world around you",
    progress: 0,
    isLocked: true,
    lessons: [
      { id: "l21", title: "Basic Colors", completed: false, locked: true },
      { id: "l22", title: "Animals", completed: false, locked: true },
      { id: "l23", title: "Plants & Trees", completed: false, locked: true },
      { id: "l24", title: "Weather", completed: false, locked: true },
      { id: "l25", title: "Review & Practice", completed: false, locked: true },
    ],
  },
];

export default function UnitsPage() {
  const navigate = useNavigate();

  const handleUnitClick = (unitId: string, isLocked: boolean) => {
    if (!isLocked) {
      navigate(`/lessons/${unitId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50 safe-area-top">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Learning Path</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unitsData.filter(u => !u.isLocked).length} units available
          </p>
        </div>
      </header>

      {/* Units List */}
      <main className="px-4 py-6 space-y-4">
        {unitsData.map((unit, index) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <UnitCard
              {...unit}
              onClick={() => handleUnitClick(unit.id, unit.isLocked)}
            />
          </motion.div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
