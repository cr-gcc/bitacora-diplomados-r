import { NavLink } from "react-router";
import { LayoutDashboard, CalendarDays, LibraryBig, FolderUser, ChartColumn, CalendarPlus2 } from 'lucide-react';
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

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
                    <li>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full py-6 justify-start hover:bg-navyh hover:text-white cursor-pointer",
                                    isActive && "bg-gold text-white"
                                )
                            }
                        >
                            <div className="flex items-center gap-2">
                                <LayoutDashboard />
                                <span>Dashboard</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/calendario"
                            className={({ isActive }) =>
                                cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full py-6 justify-start hover:bg-navyh hover:text-white cursor-pointer",
                                    isActive && "bg-gold text-white"
                                )
                            }
                        >
                            <div className='flex items-center gap-2'>
                                <CalendarDays /><span>Calendario</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/diplomados"
                            className={({ isActive }) =>
                                cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full py-6 justify-start hover:bg-navyh hover:text-white cursor-pointer",
                                    isActive && "bg-gold text-white"
                                )
                            }
                        >
                            <div className='flex items-center gap-2'>
                                <LibraryBig /><span>Diplomados</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/programacion"
                            className={({ isActive }) =>
                                cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full py-6 justify-start hover:bg-navyh hover:text-white cursor-pointer",
                                    isActive && "bg-gold text-white"
                                )
                            }
                        >
                            <div className='flex items-center gap-2'>
                                <CalendarPlus2 /><span>Programación</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/grupos"
                            className={({ isActive }) =>
                                cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full py-6 justify-start hover:bg-navyh hover:text-white cursor-pointer",
                                    isActive && "bg-gold text-white"
                                )
                            }
                        >
                            <div className='flex items-center gap-2'>
                                <FolderUser /><span>Grupos</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/reportes"
                            className={({ isActive }) =>
                                cn(
                                    buttonVariants({ variant: "ghost" }),
                                    "w-full py-6 justify-start hover:bg-navyh hover:text-white cursor-pointer",
                                    isActive && "bg-gold text-white"
                                )
                            }
                        >
                            <div className='flex items-center gap-2'>
                                <ChartColumn /><span>Reportes</span>
                            </div>
                        </NavLink>
                    </li>
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