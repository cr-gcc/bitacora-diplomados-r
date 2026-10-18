import { cn } from "@/lib/utils";
import { NavLink } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import type { NavigationItem } from "@/components/layouts/types/navigation/navigation.types";

export function LinkMenuItem({
    label,
    to,
    icon: Icon,
    end = false,
}: NavigationItem) {
    return (
        <li>
            <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                    cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full py-6 justify-start",
                        "hover:bg-navyh hover:text-white",
                        "cursor-pointer",
                        isActive && "bg-gold text-white"
                    )
                }
            >
                <div className="flex items-center gap-2">
                    <Icon size={20} />
                    <span>{label}</span>
                </div>
            </NavLink>
        </li>
    );
}