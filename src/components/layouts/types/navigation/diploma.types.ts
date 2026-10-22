export interface Diploma {
    id: number
    title: string
    slug: string
    description: string
    platformUrl: string
}

export interface DiplomaTheme {
    icon: React.ComponentType<{ className?: string }>
    accentGradient: string
    iconBg: string
    hoverBorder: string
    hoverTitle: string
    glowColor: string
    btnPlatform: string
    btnGroups: string
}