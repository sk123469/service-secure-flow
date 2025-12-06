import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StepIndicator } from "@/components/ui/step-indicator";
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  IndianRupee,
  Calendar,
  User,
  FileText,
  CreditCard,
  Check,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Service Details" },
  { label: "Milestones" },
  { label: "Review" },
  { label: "Fund Escrow" },
];

interface Milestone {
  id: string;
  title: string;
  amount: number;
  description: string;
}

export default function CreateEscrow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "1", title: "Initial Design", amount: 25000, description: "" },
  ]);
  const navigate = useNavigate();

  const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0);
  const platformFee = Math.round(totalAmount * 0.025);
  const grandTotal = totalAmount + platformFee;

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { id: Date.now().toString(), title: "", amount: 0, description: "" },
    ]);
  };

  const removeMilestone = (id: string) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id));
    }
  };

  const updateMilestone = (
    id: string,
    field: keyof Milestone,
    value: string | number
  ) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">Create Escrow Transaction</span>
          </div>
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
            <ServiceDetailsStep onNext={() => setCurrentStep(1)} />
          )}
          {currentStep === 1 && (
            <MilestonesStep
              milestones={milestones}
              onAdd={addMilestone}
              onRemove={removeMilestone}
              onUpdate={updateMilestone}
              totalAmount={totalAmount}
              onNext={() => setCurrentStep(2)}
              onBack={() => setCurrentStep(0)}
            />
          )}
          {currentStep === 2 && (
            <ReviewStep
              milestones={milestones}
              totalAmount={totalAmount}
              platformFee={platformFee}
              grandTotal={grandTotal}
              onNext={() => setCurrentStep(3)}
              onBack={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 3 && (
            <PaymentStep
              grandTotal={grandTotal}
              onBack={() => setCurrentStep(2)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function ServiceDetailsStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Service Details</h1>
        <p className="text-muted-foreground">
          Describe the service you're requesting
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <div className="space-y-2">
          <Label>Service Provider</Label>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              alt="Provider"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">Arjun Mehta</p>
              <p className="text-sm text-muted-foreground">
                Full Stack Developer
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            placeholder="e.g., E-commerce Website Development"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the scope of work, deliverables, and requirements..."
            rows={5}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option>Software Development</option>
              <option>Design & Creative</option>
              <option>Marketing & SEO</option>
              <option>Consulting</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input id="deadline" type="date" />
          </div>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
      >
        Continue to Milestones
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function MilestonesStep({
  milestones,
  onAdd,
  onRemove,
  onUpdate,
  totalAmount,
  onNext,
  onBack,
}: {
  milestones: Milestone[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Milestone, value: string | number) => void;
  totalAmount: number;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Define Milestones</h1>
        <p className="text-muted-foreground">
          Break down the project into payment milestones
        </p>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="p-6 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Milestone {index + 1}</h3>
              {milestones.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => onRemove(milestone.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={milestone.title}
                    onChange={(e) =>
                      onUpdate(milestone.id, "title", e.target.value)
                    }
                    placeholder="e.g., Design Phase"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={milestone.amount || ""}
                      onChange={(e) =>
                        onUpdate(
                          milestone.id,
                          "amount",
                          parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="0"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description (Optional)</Label>
                <Textarea
                  value={milestone.description}
                  onChange={(e) =>
                    onUpdate(milestone.id, "description", e.target.value)
                  }
                  placeholder="Describe deliverables for this milestone..."
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          onClick={onAdd}
          className="w-full gap-2 border-dashed"
        >
          <Plus className="h-4 w-4" />
          Add Milestone
        </Button>
      </div>

      <div className="p-4 rounded-xl bg-muted flex items-center justify-between">
        <span className="font-medium">Total Project Value</span>
        <span className="text-xl font-bold flex items-center gap-1">
          <IndianRupee className="h-5 w-5" />
          {totalAmount.toLocaleString()}
        </span>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
        >
          Review & Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function ReviewStep({
  milestones,
  totalAmount,
  platformFee,
  grandTotal,
  onNext,
  onBack,
}: {
  milestones: Milestone[];
  totalAmount: number;
  platformFee: number;
  grandTotal: number;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Review Transaction</h1>
        <p className="text-muted-foreground">
          Confirm the details before funding escrow
        </p>
      </div>

      {/* Project Summary */}
      <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Project Summary
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Project Title</span>
            <span className="font-medium">E-commerce Website Development</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service Provider</span>
            <span className="font-medium">Arjun Mehta</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category</span>
            <span className="font-medium">Software Development</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Deadline</span>
            <span className="font-medium">Dec 31, 2024</span>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Payment Milestones
        </h3>
        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div>
                <p className="font-medium">
                  {milestone.title || `Milestone ${index + 1}`}
                </p>
                {milestone.description && (
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                )}
              </div>
              <span className="font-semibold flex items-center gap-1">
                <IndianRupee className="h-4 w-4" />
                {milestone.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Breakdown */}
      <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Payment Breakdown
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Project Amount</span>
            <span className="font-medium flex items-center gap-1">
              <IndianRupee className="h-3.5 w-3.5" />
              {totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              Platform Fee (2.5%)
              <Info className="h-3.5 w-3.5" />
            </span>
            <span className="font-medium flex items-center gap-1">
              <IndianRupee className="h-3.5 w-3.5" />
              {platformFee.toLocaleString()}
            </span>
          </div>
          <div className="pt-3 border-t border-border flex justify-between">
            <span className="font-semibold">Total to Pay</span>
            <span className="text-lg font-bold text-accent flex items-center gap-1">
              <IndianRupee className="h-4 w-4" />
              {grandTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-info/10 border border-info/20 flex items-start gap-3">
        <Shield className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-info mb-1">Escrow Protection</p>
          <p className="text-muted-foreground">
            Your funds will be held securely until each milestone is completed
            and approved. You can request refunds or raise disputes at any time.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
        >
          Proceed to Payment
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function PaymentStep({
  grandTotal,
  onBack,
}: {
  grandTotal: number;
  onBack: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="text-center py-12 animate-slide-up">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Escrow Funded Successfully!</h1>
        <p className="text-muted-foreground mb-8">
          Your funds are now secured. The service provider has been notified to
          begin work.
        </p>
        <div className="p-4 rounded-xl bg-muted mb-8">
          <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
          <p className="font-mono font-semibold">ESC-2024-00847</p>
        </div>
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-accent text-accent-foreground gap-2"
        >
          Go to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Fund Escrow</h1>
        <p className="text-muted-foreground">
          Choose your preferred payment method
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <div className="text-center p-4 rounded-xl bg-muted">
          <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
          <p className="text-3xl font-bold flex items-center justify-center gap-1">
            <IndianRupee className="h-7 w-7" />
            {grandTotal.toLocaleString()}
          </p>
        </div>

        <div className="space-y-3">
          <Label>Payment Method</Label>
          {[
            { id: "upi", label: "UPI", desc: "Pay using any UPI app" },
            { id: "netbanking", label: "Net Banking", desc: "All major banks" },
            {
              id: "card",
              label: "Debit/Credit Card",
              desc: "Visa, Mastercard, RuPay",
            },
          ].map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left transition-all",
                paymentMethod === method.id
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <p className="font-medium">{method.label}</p>
              <p className="text-sm text-muted-foreground">{method.desc}</p>
            </button>
          ))}
        </div>

        {paymentMethod === "upi" && (
          <div className="space-y-2 pt-4">
            <Label>UPI ID</Label>
            <Input placeholder="yourname@upi" />
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handlePayment}
          disabled={processing}
          className="flex-1 bg-gradient-accent hover:opacity-90 text-accent-foreground gap-2"
        >
          {processing ? (
            <>
              <span className="animate-spin">⏳</span>
              Processing...
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              Pay & Secure Funds
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
