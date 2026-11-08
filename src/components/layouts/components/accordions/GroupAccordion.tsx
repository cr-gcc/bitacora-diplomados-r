import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge";
import { GroupTable } from "@components/layouts/components/tables/GroupTable";
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";

interface Props {
    groups: {
        id: number;
        diploma_id: number;
        code: string;
        status: string;
        modules: {
            id: number;
            module_id: number;
            number: number;
            name: string;
            start_date: string;
            end_date: string;
            regular_students: number;
            repeating_students: number;
            total_students: number;
            professor: {
                id: number;
                name: string;
                last_name: string;
            };
        }[];
    }[];
    theme: DiplomaTheme;
}

export function GroupAccordion({ groups, theme }: Props) {
    return (
        <Accordion multiple={false} className="bg-white w-full rounded-lg border">
            {groups?.map((group) => (
                <AccordionItem
                    key={group.id}
                    value={group.id.toString()}
                    className="border-b px-4 last:border-b-0"
                >
                    <AccordionTrigger
                        className="flex justify-between gap-x-4 items-center w-full font-medium text-lg hover:no-underline cursor-pointer"
                    >
                        <span className={`flex gap-x-2 items-center ${theme.textColor}`}>
                            <span>Grupo:</span>{group.code}
                        </span>
                        <Badge variant="outline" className={group.status === "active" ? "text-xs text-lime-700 border-lime-700" : group.status === "finished" ? "text-xs text-red-800 border-red-800" : "text-xs text-yellow-800 border-yellow-800"}>
                            {group.status === "active" ? "Activo" : group.status === "finished" ? "Finalizado" : "Pendiente"}
                        </Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                        <GroupTable modules={group.modules} theme={theme} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}