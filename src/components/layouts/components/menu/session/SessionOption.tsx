import type { SessionOption } from "@/components/layouts/types/user/menu/option.type";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function SessionOption({
    label,
    action,
    icon: Icon,
    variant,
}: SessionOption) {
    return (
        <DropdownMenuItem
            className={cn(
                "py-3 cursor-pointer transition-colors",
                variant === "destructive"
                    ? "focus:bg-destructive/20 focus:text-destructive hover:bg-destructive/20 hover:text-destructive"
                    : "focus:bg-navyh focus:text-white hover:bg-navyh hover:text-white focus:[&_svg]:text-white hover:[&_svg]:text-white"
            )}
            variant={variant}
            onClick={action}
        >
            <Icon />
            {label}
        </DropdownMenuItem>
    );
}
