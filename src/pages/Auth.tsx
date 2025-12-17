import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IconMail, IconLock, IconKey } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PinModal } from "@/components/PinModal";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if user has a stored pin
  const hasStoredPin = localStorage.getItem("nahuatl_pin") !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store user session (demo)
    localStorage.setItem("nahuatl_user", JSON.stringify({
      email: formData.email,
      name: formData.email.split("@")[0],
    }));

    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: "You've successfully signed in.",
    });

    setIsLoading(false);
    navigate("/");
  };

  const handlePinSubmit = (pin: string) => {
    const storedPin = localStorage.getItem("nahuatl_pin");
    
    if (pin === storedPin) {
      toast({
        title: "Welcome back!",
        description: "PIN verified successfully.",
      });
      setShowPinModal(false);
      navigate("/");
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Nahuatl
          </h1>
          <p className="text-muted-foreground mt-2">
            Learn the language of the Aztecs
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-sm mx-auto"
        >
          {/* PIN Login Button (if returning user) */}
          {hasStoredPin && (
            <Button
              variant="block"
              className="w-full mb-6 h-14"
              onClick={() => setShowPinModal(true)}
            >
              <IconKey size={20} />
              <span>Quick Login with PIN</span>
            </Button>
          )}

          {/* Divider */}
          {hasStoredPin && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <IconMail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <IconLock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-11"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {isLogin && (
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot password?
              </button>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <span className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-foreground hover:underline"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4">
        <p className="text-xs text-center text-muted-foreground">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </footer>

      {/* PIN Modal */}
      <PinModal
        isOpen={showPinModal}
        onClose={() => {
          setShowPinModal(false);
          setPinError("");
        }}
        onSubmit={handlePinSubmit}
        error={pinError}
      />
    </div>
  );
}
