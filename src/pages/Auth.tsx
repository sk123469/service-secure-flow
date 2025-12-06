import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Mail, Lock, User, Briefcase, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup";
type UserRole = "client" | "provider";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(
    searchParams.get("mode") === "signup" ? "signup" : "signin"
  );
  const [role, setRole] = useState<UserRole>(
    (searchParams.get("role") as UserRole) || "client"
  );
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SecureEscrow</span>
          </Link>

          {mode === "signin" ? (
            <SignInForm onSwitchMode={() => setMode("signup")} />
          ) : (
            <SignUpForm
              role={role}
              setRole={setRole}
              step={step}
              setStep={setStep}
              onSwitchMode={() => setMode("signin")}
            />
          )}
        </div>
      </div>

      {/* Right Panel - Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero p-12 items-center justify-center">
        <div className="max-w-lg text-primary-foreground">
          <h2 className="text-3xl font-bold mb-6">
            {mode === "signin"
              ? "Welcome Back!"
              : "Join the Trusted Marketplace"}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            {mode === "signin"
              ? "Access your dashboard, manage projects, and track payments securely."
              : "Create your account and start transacting with confidence. Complete KYC verification to unlock all features."}
          </p>

          <div className="space-y-4">
            {[
              "KYC/KYB verified users only",
              "Secure escrow protection",
              "Fast & reliable payouts",
              "24/7 dispute resolution",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="text-primary-foreground/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInForm({ onSwitchMode }: { onSwitchMode: () => void }) {
  return (
    <div className="animate-slide-up">
      <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
      <p className="text-muted-foreground mb-8">
        Enter your credentials to access your dashboard
      </p>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-border" />
            <span className="text-muted-foreground">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm text-accent hover:underline">
            Forgot password?
          </Link>
        </div>

        <Link to="/dashboard">
          <Button className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2">
            Sign In
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <button onClick={onSwitchMode} className="text-accent hover:underline font-medium">
          Sign up
        </button>
      </p>
    </div>
  );
}

function SignUpForm({
  role,
  setRole,
  step,
  setStep,
  onSwitchMode,
}: {
  role: UserRole;
  setRole: (role: UserRole) => void;
  step: number;
  setStep: (step: number) => void;
  onSwitchMode: () => void;
}) {
  return (
    <div className="animate-slide-up">
      <h1 className="text-2xl font-bold mb-2">Create your account</h1>
      <p className="text-muted-foreground mb-8">
        {step === 1
          ? "Choose how you want to use SecureEscrow"
          : "Enter your details to get started"}
      </p>

      {step === 1 ? (
        <div className="space-y-4">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole("client")}
              className={cn(
                "p-6 rounded-xl border-2 text-left transition-all",
                role === "client"
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <User className={cn("h-8 w-8 mb-3", role === "client" ? "text-accent" : "text-muted-foreground")} />
              <h3 className="font-semibold mb-1">Service Receiver</h3>
              <p className="text-sm text-muted-foreground">
                I want to hire service providers
              </p>
            </button>

            <button
              onClick={() => setRole("provider")}
              className={cn(
                "p-6 rounded-xl border-2 text-left transition-all",
                role === "provider"
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <Briefcase className={cn("h-8 w-8 mb-3", role === "provider" ? "text-accent" : "text-muted-foreground")} />
              <h3 className="font-semibold mb-1">Service Provider</h3>
              <p className="text-sm text-muted-foreground">
                I want to offer my services
              </p>
            </button>
          </div>

          <Button
            onClick={() => setStep(2)}
            className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2 mt-4"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+91 98765 43210" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                className="pl-10"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="rounded border-border mt-1" />
            <span className="text-muted-foreground">
              I agree to the{" "}
              <Link to="/terms" className="text-accent hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Back
            </Button>
            <Link to="/onboarding" className="flex-1">
              <Button className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <button onClick={onSwitchMode} className="text-accent hover:underline font-medium">
          Sign in
        </button>
      </p>
    </div>
  );
}
