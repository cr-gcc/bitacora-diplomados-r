import type { LucideIcon } from "lucide-react";

export interface SessionOption {
    label: string;
    action: () => void;
    icon: LucideIcon;
    variant: 'default' | 'destructive';
}