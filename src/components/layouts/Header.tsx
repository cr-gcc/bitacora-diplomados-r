import { Link, NavLink } from "react-router"
import {
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

export function Header() {
    return (
        <header>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Components</BreadcrumbLink>
                                </BreadcrumbItem>{/*
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                </BreadcrumbItem>
                                */}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center justify-end">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-1 sm:gap-2 text-sm text-ts">
                                <li>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger render={
                                            <button
                                                type="button"
                                                className="overflow-hidden rounded-full border border-gray-300 shadow-inner cursor-pointer"
                                            >
                                                <span className="sr-only">Toggle dashboard menu</span>

                                                <img
                                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1160"
                                                    alt=""
                                                    className="size-10 object-cover"
                                                />
                                            </button>
                                        } />
                                        <DropdownMenuContent className="p-0">
                                            <DropdownMenuItem
                                                className="hover:text-gold hover:font-semibold cursor-pointer py-3">
                                                <UserIcon />
                                                Perfil
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="hover:text-gold hover:font-semibold cursor-pointer py-3">
                                                <SettingsIcon />
                                                Ajustes
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer py-3" variant="destructive">
                                                <LogOutIcon />
                                                Cerrar sesión
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}