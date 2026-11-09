import { useState } from "react";
import { useDiploma } from "@pages/groups/hooks/useDiploma";
import { GroupAccordion } from "@/pages/groups/components/GroupAccordion";
import { Button } from "@/components/ui/button";
import type { GroupModalState } from "./types/group-modal.types";
import { CreateGroupModal } from "@/pages/groups/components/CreateGroupModal";
import { EditGroupModal } from "@/pages/groups/components/EditGroupModal";
import { DeleteGroupModal } from "@/pages/groups/components/DeleteGroupModal";
import { CheckModuleModal } from "@/pages/groups/components/CheckModuleModal";
import { EditModuleModal } from "@/pages/groups/components/EditModuleModal";

export function GroupsPage() {
    const { diploma, theme } = useDiploma();
    const [activeModal, setActiveModal] = useState<GroupModalState>(null);

    const handleOpenModal = (modal: Exclude<GroupModalState, null>) => {
        setActiveModal(modal);
    };
    const handleCloseModal = () => {
        setActiveModal(null);
    };

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
                            onClick={() => setActiveModal({ type: "create-group" })}
                        >
                            Crear grupo
                        </Button>
                    </div>
                </div>
                <GroupAccordion
                    theme={theme}
                    groups={diploma?.groups}
                    onOpenModal={handleOpenModal}
                />
            </div>
            {activeModal?.type === "create-group" && (
                <CreateGroupModal
                    open={true}
                    theme={theme}
                    onOpenChange={(open) => !open && handleCloseModal()}
                />
            )}
            {activeModal?.type === "edit-group" && (
                <EditGroupModal
                    open={true}
                    theme={theme}
                    group={activeModal.group}
                    onOpenChange={(open) => !open && handleCloseModal()}
                />
            )}
            {activeModal?.type === "delete-group" && (
                <DeleteGroupModal
                    open={true}
                    theme={theme}
                    group={activeModal.group}
                    onOpenChange={(open) => !open && handleCloseModal()}
                />
            )}
            {activeModal?.type === "check-module" && (
                <CheckModuleModal
                    open={true}
                    theme={theme}
                    module={activeModal.module}
                    onOpenChange={(open) => !open && handleCloseModal()}
                />
            )}
            {activeModal?.type === "edit-module" && (
                <EditModuleModal
                    open={true}
                    theme={theme}
                    module={activeModal.module}
                    onOpenChange={(open) => !open && handleCloseModal()}
                />
            )}
        </>

    )
}