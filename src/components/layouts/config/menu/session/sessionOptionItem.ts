import type { SessionOption } from "@/components/layouts/types/user/menu/option.type";

export const sessionOptionItem: SessionOption[] = [
    {
        label: "Perfil",
        type: 'profile',
        action: () => { alert("Perfil") },
        variant: 'default',
    },
    {
        label: "Ajustes",
        type: 'settings',
        action: () => { alert("Ajustes") },
        variant: 'default',
    },
    {
        label: "Cerrar sesión",
        type: 'logout',
        action: () => { },
        variant: 'destructive',
    },
];

