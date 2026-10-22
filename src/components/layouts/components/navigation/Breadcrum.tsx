import { Link, matchPath, useLocation } from "react-router";
import { navigationItems } from "@components/layouts/config/navigation/navigationItems";
import { mockDiplomas } from "@components/layouts/config/navigation/mockDiplomas";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export function Breadcrum() {
    const { pathname } = useLocation();

    const currentItem = navigationItems.find(
        (item) => item.to === pathname
    );

    const diplomaMatch = matchPath(
        "/diplomados/:slug",
        pathname
    );

    const diploma = diplomaMatch
        ? mockDiplomas.find(
            (diploma) => diploma.slug === diplomaMatch.params.slug
        )
        : undefined;

    const currentLabel = currentItem?.label ?? "Página";

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <span className="text-muted-foreground">
                        Bitácora
                    </span>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {diplomaMatch ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<Link to="/diplomados" />}>
                                Diplomados
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold">
                                {diploma?.title ?? "Diplomado no encontrado"}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                ) : (
                    <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold">
                            {currentLabel}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
