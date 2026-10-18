import type { SessionOption } from "@/components/layouts/types/user/menu/option.type";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function SessionOption({
    label,
    action,
    icon: Icon,
    variant,
}: SessionOption) {
    return (
        <DropdownMenuItem
            className="cursor-pointer py-3"
            variant={variant}
            onClick={action}
        >
            <Icon />
            {label}
        </DropdownMenuItem>
    )
}