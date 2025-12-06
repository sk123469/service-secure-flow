import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepIndicator } from "@/components/ui/step-indicator";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Shield,
  Upload,
  Camera,
  Building2,
  CreditCard,
  Check,
  ArrowRight,
  ArrowLeft,
  FileText,
  User,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Identity", description: "PAN & Aadhaar" },
  { label: "Address", description: "Verification" },
  { label: "Business", description: "KYB (Optional)" },
  { label: "Bank", description: "Account Setup" },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SecureEscrow</span>
          </Link>
          <StatusBadge variant="pending">Verification Pending</StatusBadge>
        </div>
      </header>

      <main className="container py-8 lg:py-12">
        {/* Progress */}
        <div className="max-w-3xl mx-auto mb-12">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 0 && (
            <IdentityStep onNext={() => setCurrentStep(1)} />
          )}
          {currentStep === 1 && (
            <AddressStep
              onNext={() => setCurrentStep(2)}
              onBack={() => setCurrentStep(0)}
            />
          )}
          {currentStep === 2 && (
            <BusinessStep
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <BankStep onBack={() => setCurrentStep(2)} />
          )}
        </div>
      </main>
    </div>
  );
}

function IdentityStep({ onNext }: { onNext: () => void }) {
  const [panVerified, setPanVerified] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Identity Verification</h1>
        <p className="text-muted-foreground">
          Complete KYC verification to unlock all platform features
        </p>
      </div>

      {/* PAN Verification */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">PAN Card</h3>
              <p className="text-sm text-muted-foreground">
                For identity & tax verification
              </p>
            </div>
          </div>
          {panVerified && <StatusBadge variant="verified">Verified</StatusBadge>}
        </div>

        {!panVerified ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pan">PAN Number</Label>
              <Input id="pan" placeholder="ABCDE1234F" className="uppercase" />
            </div>
            <Button
              onClick={() => setPanVerified(true)}
              className="w-full"
              variant="outline"
            >
              Verify PAN
            </Button>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-center gap-2 text-success">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">
                PAN verified successfully
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Aadhaar Verification */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Aadhaar Verification</h3>
              <p className="text-sm text-muted-foreground">
                DigiLocker-based identity verification
              </p>
            </div>
          </div>
          {aadhaarVerified && (
            <StatusBadge variant="verified">Verified</StatusBadge>
          )}
        </div>

        {!aadhaarVerified ? (
          <div className="space-y-4">
            <Button
              onClick={() => setAadhaarVerified(true)}
              className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
            >
              <Shield className="h-4 w-4" />
              Connect with DigiLocker
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Secure verification powered by UIDAI
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-center gap-2 text-success">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">
                Aadhaar verified via DigiLocker
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Selfie Verification */}
      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Camera className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Face Verification</h3>
            <p className="text-sm text-muted-foreground">
              Liveness check & face match
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center p-8 border-2 border-dashed border-border rounded-xl">
          <Camera className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground text-center mb-4">
            Take a selfie for liveness verification
          </p>
          <Button variant="outline" className="gap-2">
            <Camera className="h-4 w-4" />
            Start Camera
          </Button>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!panVerified || !aadhaarVerified}
        className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
      >
        Continue to Address Verification
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function AddressStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Address Verification</h1>
        <p className="text-muted-foreground">
          Verify your address using Aadhaar or utility bills
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Address from Aadhaar</h3>
            <p className="text-sm text-muted-foreground">
              Pre-filled from your DigiLocker verification
            </p>
          </div>
        </div>

        <div className="space-y-4 p-4 rounded-lg bg-muted/50">
          <p className="text-sm">
            123, Example Street, Sector 15
            <br />
            New Delhi - 110001
            <br />
            India
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Is this your current address?
          </p>
          <div className="flex gap-3">
            <Button onClick={onNext} className="flex-1 bg-gradient-accent text-accent-foreground">
              Yes, Continue
            </Button>
            <Button variant="outline" className="flex-1">
              Upload Different Proof
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
}

function BusinessStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [isCompany, setIsCompany] = useState<boolean | null>(null);

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Business Verification</h1>
        <p className="text-muted-foreground">
          Complete KYB for higher transaction limits
        </p>
      </div>

      {isCompany === null ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setIsCompany(false)}
            className="p-6 rounded-xl border-2 border-border hover:border-accent transition-all text-left"
          >
            <User className="h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="font-semibold mb-1">Individual / Freelancer</h3>
            <p className="text-sm text-muted-foreground">
              I operate as a sole proprietor
            </p>
          </button>

          <button
            onClick={() => setIsCompany(true)}
            className="p-6 rounded-xl border-2 border-border hover:border-accent transition-all text-left"
          >
            <Building2 className="h-8 w-8 text-muted-foreground mb-3" />
            <h3 className="font-semibold mb-1">Registered Business</h3>
            <p className="text-sm text-muted-foreground">
              I have a registered company
            </p>
          </button>
        </div>
      ) : isCompany ? (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="space-y-2">
              <Label>Company PAN</Label>
              <Input placeholder="ABCDE1234F" className="uppercase" />
            </div>
            <div className="space-y-2">
              <Label>GST Number</Label>
              <Input placeholder="22AAAAA0000A1Z5" />
            </div>
            <div className="space-y-2">
              <Label>CIN (Company Identification Number)</Label>
              <Input placeholder="U12345MH2020PTC123456" />
            </div>
          </div>

          <Button
            onClick={onNext}
            className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
          >
            Verify Business
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 text-accent mb-4">
            <Check className="h-5 w-5" />
            <span className="font-medium">
              Operating as Individual / Freelancer
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            You can continue with individual verification. Business verification
            is optional but unlocks higher transaction limits.
          </p>
          <Button
            onClick={onNext}
            className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
          >
            Continue to Bank Setup
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={isCompany === null ? onBack : () => setIsCompany(null)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {isCompany === null && (
          <Button variant="ghost" onClick={onNext} className="ml-auto">
            Skip for now
          </Button>
        )}
      </div>
    </div>
  );
}

function BankStep({ onBack }: { onBack: () => void }) {
  const [verified, setVerified] = useState(false);

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Bank Account Setup</h1>
        <p className="text-muted-foreground">
          Add your bank account for receiving payouts
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Bank Account Details</h3>
            <p className="text-sm text-muted-foreground">
              Penny drop verification for account validation
            </p>
          </div>
        </div>

        {!verified ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Account Holder Name</Label>
              <Input placeholder="As per bank records" />
            </div>
            <div className="space-y-2">
              <Label>Account Number</Label>
              <Input placeholder="Enter account number" />
            </div>
            <div className="space-y-2">
              <Label>Confirm Account Number</Label>
              <Input placeholder="Re-enter account number" />
            </div>
            <div className="space-y-2">
              <Label>IFSC Code</Label>
              <Input placeholder="ABCD0001234" className="uppercase" />
            </div>

            <Button
              onClick={() => setVerified(true)}
              className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
            >
              Verify Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 text-success mb-2">
                <Check className="h-4 w-4" />
                <span className="font-medium">Bank Account Verified</span>
              </div>
              <p className="text-sm text-muted-foreground">
                HDFC Bank ****1234 - John Doe
              </p>
            </div>

            <Link to="/dashboard">
              <Button className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2">
                Complete Setup & Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Button variant="outline" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
    </div>
  );
}
