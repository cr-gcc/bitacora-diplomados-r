import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { GroupTable } from "@/pages/groups/components/GroupTable";
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";
import type { GroupWithModules } from "@/pages/groups/types/group-modules.types";
import type { GroupModalState } from "../types/group-modal.types";

interface Props {
    groups?: GroupWithModules[];
    theme: DiplomaTheme;
    onOpenModal: (modal: Exclude<GroupModalState, null>) => void;
}

export function GroupAccordion({ groups, theme, onOpenModal }: Props) {
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
                        <GroupTable
                            theme={theme}
                            group={group}
                            modules={group.modules}
                            onOpenModal={onOpenModal}
                        />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}