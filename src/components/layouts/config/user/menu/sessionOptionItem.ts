import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import type { SessionOption } from "@/components/layouts/types/user/menu/option.type";

export const sessionOptionItem: SessionOption[] = [
    {
        label: "Perfil",
        action: () => { alert("Perfil") },
        icon: UserIcon,
        variant: 'default',
    },
    {
        label: "Ajustes",
        action: () => { alert("Ajustes") },
        icon: SettingsIcon,
        variant: 'default',
    },
    {
        label: "Cerrar sesión",
        action: () => { alert("Cerrar sesión") },
        icon: LogOutIcon,
        variant: 'destructive',
    },
];

