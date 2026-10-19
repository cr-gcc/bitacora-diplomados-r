import { Link } from 'react-router'
import { ExternalLink, ArrowRight, ClipboardPen } from 'lucide-react'
import type { DiplomaItem } from '@/components/layouts/types/navigation/diploma.types'

export function DiplomaCard({ diploma }: { diploma: DiplomaItem }) {
    const IconComponent = diploma.icon
    return (
        <div
            key={diploma.id}
            className={`group relative flex flex-col justify-between rounded-2xl bg-white border border-gray-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${diploma.theme.hoverBorder}`}
        >
            <div className={`h-2 w-full bg-gradient-to-r ${diploma.theme.accentGradient}`} />
            <div
                className={`absolute top-0 right-0 w-36 h-36 ${diploma.theme.glowColor} rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100`}
            />
            <div className="p-6 flex flex-col flex-1 justify-between relative z-10">
                <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                        <div
                            className={`size-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs ${diploma.theme.iconBg}`}
                        >
                            <IconComponent className="size-7 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        <h3
                            className={`text-2xl font-bold text-gray-900 tracking-tight transition-colors duration-200 ${diploma.theme.hoverTitle}`}
                        >
                            {diploma.title}
                        </h3>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[40px]">
                        {diploma.description}
                    </p>
                </div>
                <div className="pt-4 mt-4 grid grid-cols-2 gap-2.5">
                    <a
                        href={diploma.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 text-center ${diploma.theme.btnPlatform}`}
                        title={`Acceder a la plataforma de ${diploma.title}`}
                    >
                        <span>Plataforma</span>
                        <ExternalLink className="size-3.5 opacity-80" />
                    </a>

                    <Link
                        to={`/diplomados/${diploma.slug}`}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 text-center ${diploma.theme.btnGroups}`}
                        title={`Revisar grupos de ${diploma.title}`}
                    >
                        <ClipboardPen className="size-3.5" />
                        <span>Grupos</span>
                        <ArrowRight className="size-3 opacity-80" />
                    </Link>
                </div>
            </div>
        </div>
    )
}