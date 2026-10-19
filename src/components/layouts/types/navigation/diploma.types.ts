export interface DiplomaItem {
    id: number
    title: string
    slug: string
    description: string
    platformUrl: string
    icon: React.ComponentType<{ className?: string }>
    theme: {
        accentGradient: string
        iconBg: string
        hoverBorder: string
        hoverTitle: string
        glowColor: string
        btnPlatform: string
        btnGroups: string
    }
}