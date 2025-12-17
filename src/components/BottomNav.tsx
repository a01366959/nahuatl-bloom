import { useLocation, useNavigate } from "react-router-dom";
import { IconHome, IconBooks, IconRefresh, IconUser } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", icon: IconHome, label: "Home" },
  { path: "/units", icon: IconBooks, label: "Units" },
  { path: "/review", icon: IconRefresh, label: "Review" },
  { path: "/profile", icon: IconUser, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-full py-2 transition-colors touch-feedback",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-foreground rounded-b-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className="mb-1"
              />
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
