import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Check, Clock, Shield, AlertTriangle, Lock } from "lucide-react";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        pending: "bg-warning/10 text-warning border border-warning/20",
        verified: "bg-success/10 text-success border border-success/20",
        escrow: "bg-info/10 text-info border border-info/20",
        completed: "bg-success/10 text-success border border-success/20",
        disputed: "bg-destructive/10 text-destructive border border-destructive/20",
        default: "bg-muted text-muted-foreground border border-border",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const iconMap = {
  pending: Clock,
  verified: Check,
  escrow: Lock,
  completed: Check,
  disputed: AlertTriangle,
  default: Shield,
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  showIcon?: boolean;
}

function StatusBadge({
  className,
  variant = "default",
  size,
  showIcon = true,
  children,
  ...props
}: StatusBadgeProps) {
  const Icon = iconMap[variant || "default"];

  return (
    <div className={cn(statusBadgeVariants({ variant, size }), className)} {...props}>
      {showIcon && <Icon className="h-3 w-3" />}
      {children}
    </div>
  );
}

export { StatusBadge, statusBadgeVariants };
