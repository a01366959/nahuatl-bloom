import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconBackspace, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pin: string) => void;
  title?: string;
  pinLength?: number;
  error?: string;
}

export function PinModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Enter your PIN",
  pinLength = 4,
  error,
}: PinModalProps) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (error) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin("");
    }
  }, [error]);

  useEffect(() => {
    if (pin.length === pinLength) {
      onSubmit(pin);
    }
  }, [pin, pinLength, onSubmit]);

  const handleNumberPress = (num: string) => {
    if (pin.length < pinLength) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-card rounded-t-3xl sm:rounded-3xl shadow-block-active p-6 pb-8 safe-area-bottom"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* PIN Display */}
            <motion.div
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex justify-center gap-3 mb-2"
            >
              {Array.from({ length: pinLength }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: pin.length === i ? [1, 1.1, 1] : 1,
                  }}
                  className={cn(
                    "w-4 h-4 rounded-full transition-all duration-200",
                    i < pin.length ? "bg-foreground" : "bg-gray-200"
                  )}
                />
              ))}
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-center text-sm text-destructive mb-4"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {numbers.map((num, i) => {
                if (num === "") {
                  return <div key={i} />;
                }
                if (num === "back") {
                  return (
                    <Button
                      key={i}
                      variant="ghost"
                      size="icon-lg"
                      onClick={handleBackspace}
                      className="w-full h-14 text-gray-500"
                    >
                      <IconBackspace size={24} />
                    </Button>
                  );
                }
                return (
                  <Button
                    key={i}
                    variant="pin"
                    onClick={() => handleNumberPress(num)}
                    className="w-full"
                  >
                    {num}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
