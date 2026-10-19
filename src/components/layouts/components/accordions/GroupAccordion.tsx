import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import { GroupTable } from "@components/layouts/components/tables/GroupTable";

interface Props {
    items: {
        id: number;
        group: string;
        status: string;
        modules: {
            id: number;
            numero: number;
            module: string;
            inicio: string;
            termino: string;
            profesor: string;
            estatus: string;
        }[];
    }[];
}

export function GroupAccordion({ items }: Props) {
    return (
        <Accordion className="bg-white w-full rounded-lg border">
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    value={item.id.toString()}
                    className="border-b px-4 last:border-b-0"
                >
                    <AccordionTrigger
                        className="flex justify-between gap-x-4 items-center w-full font-medium text-lg hover:no-underline cursor-pointer"
                    >
                        <span className="text-pink-950 flex gap-x-2 items-center">
                            <span>Grupo:</span>{item.group}
                        </span>
                        <Badge variant="outline" className={item.status === "Activo" ? "text-xs text-lime-700 border-lime-700" : item.status === "Finalizado" ? "text-xs text-red-800 border-red-800" : "text-xs text-yellow-800 border-yellow-800"}>
                            {item.status}
                        </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                        <GroupTable modules={item.modules} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}