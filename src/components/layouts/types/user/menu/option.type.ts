export interface SessionOption {
    label: string;
    type: "profile" | "settings" | "logout";
    action: () => void;
    variant: "default" | "destructive";
}