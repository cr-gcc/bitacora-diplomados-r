import { cn } from "@/lib/utils";

interface ProgressBarProps {
    className?: string;
}

export function ProgressBar({ className }: ProgressBarProps) {
    return (
        <div
            role="progressbar"
            aria-label="Cargando..."
            className={cn(
                "w-full bg-gray-300 rounded-full h-2 overflow-hidden",
                className
            )}
        >
            <div
                className="h-full bg-gray-500 rounded-full animate-progress"
                style={{ width: "100%", animationDuration: "1.5s" }}
            />
        </div>
    );
}