import { Link, useLocation } from "react-router";
import { navigationItems } from "@components/layouts/config/navigation/navigationItems";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react";

export function Breadcrum() {
    const { pathname } = useLocation();
    const currentItem = navigationItems.find(
        (item) => item.to === pathname
    );
    const currentLabel = currentItem?.label ?? "Página";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathname !== "/" && (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/" />}>
                                <Home className="size-4" />
                                <span className="sr-only">Inicio</span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                )}
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {currentLabel}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}