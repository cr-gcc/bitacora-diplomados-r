import { GroupAcordion } from "@components/layouts/components/accordions/GroupAcordion";
import { Button } from "@/components/ui/button";

export function GroupsPage() {
    const items = [
        {
            id: 1,
            group: "9603",
            status: "Activo",
            modules: [
                {
                    id: 1,
                    numero: 1,
                    module: "Fundamentos del comercio electrónico",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "José Antonio Gómez Rodríguez",
                    estatus: "Programado",
                },
                {
                    id: 2,
                    numero: 2,
                    module: "Aspectos legales y fiscales del comercio electrónico",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "Sin asignar",
                    estatus: "Programado",
                },
                {
                    id: 3,
                    numero: 3,
                    module: "Estrategias de mercadotecnia en internet",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "José Antonio Gómez Rodríguez",
                    estatus: "Programado",
                },
                {
                    id: 4,
                    numero: 4,
                    module: "Desarrollo de un plan de negocios",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "Sin asignar",
                    estatus: "Pendiente",
                },
                {
                    id: 5,
                    numero: 5,
                    module: "Desarrollo de aplicaciones de comercio electrónico",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "José Antonio Gómez Rodríguez",
                    estatus: "Pendiente",
                }
            ]
        },
        {
            id: 2,
            group: "9602",
            status: "Finalizado",
            modules: [
                {
                    id: 1,
                    numero: 1,
                    module: "Fundamentos del comercio electrónico",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "José Antonio Gómez Rodríguez",
                    estatus: "Programado",
                },
                {
                    id: 2,
                    numero: 2,
                    module: "Aspectos legales y fiscales del comercio electrónico",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "Sin asignar",
                    estatus: "Programado",
                },
                {
                    id: 3,
                    numero: 3,
                    module: "Estrategias de mercadotecnia en internet",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "José Antonio Gómez Rodríguez",
                    estatus: "Programado",
                },
                {
                    id: 4,
                    numero: 4,
                    module: "Desarrollo de un plan de negocios",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "Sin asignar",
                    estatus: "Pendiente",
                },
                {
                    id: 5,
                    numero: 5,
                    module: "Desarrollo de aplicaciones de comercio electrónico",
                    inicio: "24/11/2023",
                    termino: "30/11/2023",
                    profesor: "José Antonio Gómez Rodríguez",
                    estatus: "Pendiente",
                }
            ]
        }
    ]

    return (
        <div id="groups" className="flex flex-col gap-y-8 pb-12">
            <div className="flex flex-1 justify-between">
                <div className="flex flex-col">
                    <h2 className="text-4xl text-pink-950 tracking-tight">
                        Auditoría Interna
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm">
                        A continuación se muestra la información de los grupos.
                    </p>
                </div>
                <div className="flex gap-x-4">
                    <Button className="bg-pink-950 text-xs text-white hover:bg-pink-950/90 hover:text-white cursor-pointer" size="sm">Crear grupo</Button>
                </div>
            </div>
            <div>
                {items.map((item) => (
                    <GroupAcordion key={item.id} items={[item]} />
                ))}
            </div>
        </div>
    )
}