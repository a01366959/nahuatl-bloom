import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useState, ReactNode } from "react";

interface NotionBlockProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
  defaultExpanded?: boolean;
  expandable?: boolean;
  onClick?: () => void;
  className?: string;
  headerClassName?: string;
}

export function NotionBlock({
  title,
  subtitle,
  icon,
  rightContent,
  children,
  defaultExpanded = false,
  expandable = true,
  onClick,
  className,
  headerClassName,
}: NotionBlockProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (expandable && children) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      className={cn("notion-block overflow-hidden", className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-3 p-4 text-left transition-colors",
          "hover:bg-gray-50 active:bg-gray-100",
          headerClassName
        )}
      >
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
            {icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground truncate mt-0.5">{subtitle}</p>
          )}
        </div>
        
        {rightContent && (
          <div className="flex-shrink-0">{rightContent}</div>
        )}
        
        {expandable && children && (
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-gray-400"
          >
            <IconChevronDown size={20} />
          </motion.div>
        )}
      </button>
      
      <AnimatePresence initial={false}>
        {isExpanded && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pt-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
