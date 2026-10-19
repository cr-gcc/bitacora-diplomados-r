import { Breadcrum } from "@/components/layouts/components/navigation/Breadcrum"
import { SessionMenu } from "@/components/layouts/components/menu/session/SessionMenu"

export function Header() {
    return (
        <header>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Breadcrum />
                    </div>
                    <div className="flex items-center justify-end">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-1 sm:gap-2 text-sm text-ts">
                                <li>
                                    <SessionMenu />
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}