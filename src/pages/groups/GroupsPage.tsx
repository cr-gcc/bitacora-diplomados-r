import { useState } from "react";
import { useDiploma } from "@pages/groups/hooks/useDiploma";
import { GroupAccordion } from "@components/layouts/components/accordions/GroupAccordion";
import { Button } from "@/components/ui/button";
import { CreateGroupModal } from "@/pages/groups/components/CreateGroupModal";
import { EditGroupModal } from "@/pages/groups/components/EditGroupModal";
import { DeleteGroupModal } from "@/pages/groups/components/DeleteGroupModal";
import { CheckModuleModal } from "@/pages/groups/components/CheckModuleModal";
import { EditModuleModal } from "@/pages/groups/components/EditModuleModal";

export function GroupsPage() {
    const { diploma, theme } = useDiploma();
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCheck, setOpenCheck] = useState(false);
    const [openEditModule, setOpenEditModule] = useState(false);

    return (
        <>
            <div id="groups" className="flex flex-col gap-y-4 pb-12">
                <div className="flex flex-1 justify-between">
                    <div className="flex flex-col">
                        <h2 className={`text-4xl tracking-tight ${theme.textColor}`}>
                            {diploma?.title ?? "Diplomado"}
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            A continuación se muestra la información de los grupos.
                        </p>
                    </div>
                    <div className="flex gap-x-4">
                        <Button
                            size="sm"
                            className={`text-xs text-white hover:text-white cursor-pointer ${theme.buttonBg} ${theme.buttonHover}`}
                            onClick={() => setOpenCreate(true)}
                        >
                            Crear grupo
                        </Button>
                    </div>
                </div>
                <GroupAccordion groups={diploma?.groups} theme={theme} />
            </div>
            <CreateGroupModal
                open={openCreate}
                onOpenChange={setOpenCreate}
                theme={theme}
            />
            <DeleteGroupModal
                open={openDelete}
                onOpenChange={setOpenDelete}
                theme={theme}
            />
            <EditGroupModal
                open={openEdit}
                onOpenChange={setOpenEdit}
                theme={theme}
            />
            <CheckModuleModal
                open={openCheck}
                onOpenChange={setOpenCheck}
                theme={theme}
            />
            <EditModuleModal
                open={openEditModule}
                onOpenChange={setOpenEditModule}
                theme={theme}
            />
        </>

    )
}