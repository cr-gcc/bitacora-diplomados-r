import {
    UserRoundGroup,
    UserShield,
    ShoppingCart,
    Lightbulb,
    CircleDollarSign,
    Server,
    Diamond
} from "lucide-react";

import type { DiplomaTheme } from
    "@components/layouts/types/navigation/diploma.types";

export const diplomaThemes: Record<string, DiplomaTheme> = {
    "auditoria-interna": {
        icon: UserShield,
        accentGradient: 'from-pink-950 via-pink-900 to-pink-800',
        iconBg: 'bg-pink-100 group-hover:bg-pink-950 text-pink-950 group-hover:text-white',
        hoverBorder: 'hover:border-pink-900',
        hoverTitle: 'group-hover:text-pink-950',
        glowColor: 'bg-pink-950/10',
        btnPlatform: 'bg-pink-50 text-pink-950 hover:bg-pink-100 border border-pink-200',
        btnGroups: 'bg-pink-950 text-white hover:bg-pink-900 shadow-sm shadow-pink-950/25',
    },
    "comercio-electronico": {
        icon: ShoppingCart,
        accentGradient: 'from-blue-600 via-blue-500 to-sky-500',
        iconBg: 'bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white',
        hoverBorder: 'hover:border-blue-600',
        hoverTitle: 'group-hover:text-blue-600',
        glowColor: 'bg-blue-600/10',
        btnPlatform: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200',
        btnGroups: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/25',
    },
    "finanzas": {
        icon: CircleDollarSign,
        accentGradient: 'from-yellow-900 via-yellow-800 to-amber-700',
        iconBg: 'bg-yellow-50 group-hover:bg-yellow-900 text-yellow-900 group-hover:text-white',
        hoverBorder: 'hover:border-yellow-900',
        hoverTitle: 'group-hover:text-yellow-900',
        glowColor: 'bg-yellow-900/10',
        btnPlatform: 'bg-yellow-50 text-yellow-900 hover:bg-yellow-100 border border-yellow-200',
        btnGroups: 'bg-yellow-900 text-white hover:bg-yellow-950 shadow-sm shadow-yellow-900/25',
    },
    "mercadotecnia": {
        icon: Lightbulb,
        accentGradient: 'from-yellow-600 via-amber-500 to-yellow-500',
        iconBg: 'bg-yellow-50 group-hover:bg-yellow-600 text-yellow-600 group-hover:text-white',
        hoverBorder: 'hover:border-yellow-600',
        hoverTitle: 'group-hover:text-yellow-600',
        glowColor: 'bg-yellow-600/10',
        btnPlatform: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200',
        btnGroups: 'bg-yellow-600 text-white hover:bg-yellow-700 shadow-sm shadow-yellow-600/25',
    },
    "talento-humano": {
        icon: UserRoundGroup,
        accentGradient: 'from-lime-900 via-lime-800 to-green-800',
        iconBg: 'bg-lime-50 group-hover:bg-lime-900 text-lime-900 group-hover:text-white',
        hoverBorder: 'hover:border-lime-900',
        hoverTitle: 'group-hover:text-lime-900',
        glowColor: 'bg-lime-900/10',
        btnPlatform: 'bg-lime-50 text-lime-900 hover:bg-lime-100 border border-lime-200',
        btnGroups: 'bg-lime-900 text-white hover:bg-lime-950 shadow-sm shadow-lime-900/25',
    },
    "tics": {
        icon: Server,
        accentGradient: 'from-blue-950 via-blue-900 to-indigo-950',
        iconBg: 'bg-blue-50 group-hover:bg-blue-950 text-blue-950 group-hover:text-white',
        hoverBorder: 'hover:border-blue-950',
        hoverTitle: 'group-hover:text-blue-950',
        glowColor: 'bg-blue-950/10',
        btnPlatform: 'bg-blue-50 text-blue-950 hover:bg-blue-100 border border-blue-200',
        btnGroups: 'bg-blue-950 text-white hover:bg-blue-900 shadow-sm shadow-blue-950/25',
    }
};

export const defaultDiplomaTheme: DiplomaTheme = {
    icon: Diamond,
    accentGradient: 'from-gray-600 via-gray-500 to-gray-400',
    iconBg: 'bg-gray-50 group-hover:bg-gray-600 text-gray-600 group-hover:text-white',
    hoverBorder: 'hover:border-gray-600',
    hoverTitle: 'group-hover:text-gray-600',
    glowColor: 'bg-gray-600/10',
    btnPlatform: 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200',
    btnGroups: 'bg-gray-600 text-white hover:bg-gray-700 shadow-sm shadow-gray-600/25',
};
