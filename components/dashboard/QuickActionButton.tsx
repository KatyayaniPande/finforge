import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export function QuickActionButton({
  icon: Icon,
  label,
  onClick,
}: QuickActionButtonProps) {
  return (
    <Button
      variant="outline"
      className="h-20 flex flex-col items-center justify-center w-full"
      onClick={onClick}
    >
      <Icon className="h-6 w-6 mb-2" />
      {label}
    </Button>
  );
} 