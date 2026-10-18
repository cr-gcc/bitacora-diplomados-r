import { navigationItems } from "@/components/layouts/config/navigation/navigationItems";
import { LinkMenuItem } from "@/components/layouts/components/navigation/LinkMenuItem";

export function Sidebar() {
    return (
        <aside className={`hidden md:flex bg-navy sticky top-0 h-screen shrink-0 z-40 flex-col transition-[width] duration-300 overflow-y-auto custom-scrollbar w-56`}>
            <div className="flex flex-col items-center justify-center px-2 pt-4 pb-4 text-center">
                <div className="mb-2 flex items-center justify-center">
                    <img
                        src="https://thor.fca.unam.mx/cedigec/cedigec/assets/img/logos/cedigec_s_trans.png"
                        alt="CEDIGEC"
                        className="h-auto w-auto max-w-[200px] object-contain"
                    />
                </div>
                <span className="text-xs tracking-wide text-white/90">
                    Bitácora Diplomados
                </span>
            </div>
            <nav className="flex flex-1 flex-col px-4 py-4">
                <ul className="space-y-1 text-white">
                    {navigationItems.map((item) => (
                        <LinkMenuItem
                            key={item.to}
                            {...item}
                        />
                    ))}
                </ul>
            </nav>
            <div className="pb-4 px-4">
                <hr className="border-white/30" />
            </div>
            <div className="flex flex-col px-4 pb-4 gap-2">
                <span className="text-xs tracking-wide text-white/90">
                    UNAM · FCA
                </span>
                <span className="text-xs tracking-wide text-white/90">
                    Copyright {new Date().getFullYear()} © Todos los derechos reservados.
                </span>
            </div>
        </aside >
    )
}