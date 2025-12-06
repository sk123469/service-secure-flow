import * as React from "react";
import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface VerifiedBadgeProps {
  level: "none" | "basic" | "full";
  className?: string;
  showLabel?: boolean;
}

const badgeConfig = {
  none: {
    icon: Shield,
    label: "Not Verified",
    description: "User has not completed verification",
    className: "text-muted-foreground",
  },
  basic: {
    icon: ShieldCheck,
    label: "ID Verified",
    description: "Identity verified via PAN & Aadhaar",
    className: "text-warning",
  },
  full: {
    icon: ShieldCheck,
    label: "Fully Verified",
    description: "Complete KYC/KYB verification passed",
    className: "text-accent",
  },
};

export function VerifiedBadge({ level, className, showLabel = false }: VerifiedBadgeProps) {
  const config = badgeConfig[level];
  const Icon = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn("inline-flex items-center gap-1.5", className)}>
          <Icon className={cn("h-4 w-4", config.className)} />
          {showLabel && (
            <span className={cn("text-xs font-medium", config.className)}>
              {config.label}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-medium">{config.label}</p>
        <p className="text-xs text-muted-foreground">{config.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}
