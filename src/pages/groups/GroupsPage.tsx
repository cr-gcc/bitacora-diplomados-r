import { useState } from "react";
import { useDiploma } from "@pages/groups/hooks/useDiploma";
import { useGroups } from "@pages/groups/hooks/useGroups";
import { GroupAccordion } from "@/pages/groups/components/GroupAccordion";
import { Button } from "@/components/ui/button";
import { CreateGroupModal } from "@/pages/groups/components/CreateGroupModal";
import { UpdateGroupModal } from "@/pages/groups/components/UpdateGroupModal";
import { DeleteGroupModal } from "@/pages/groups/components/DeleteGroupModal";
import { CheckModuleModal } from "@/pages/groups/components/CheckModuleModal";
import { EditModuleModal } from "@/pages/groups/components/EditModuleModal";
import type { GroupModalState } from "./types/group-modal.types";

export function GroupsPage() {
    const [activeModal, setActiveModal] = useState<GroupModalState>(null);
    const { slug, theme } = useDiploma();
    const {
        diploma,
        groups,
        loading,
        error,
        saving,
        createGroup,
        updateGroupStatus,
        deleteGroup
    } = useGroups(slug);

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
                {loading ? (
                    <p className="text-sm text-gray-500">Cargando grupos...</p>
                ) : error ? (
                    <p role="alert" className="text-sm text-red-600">{error}</p>
                ) : (
                    <GroupAccordion
                        theme={theme}
                        groups={groups}
                        onOpenModal={handleOpenModal}
                    />
                )}
            </div>
            {activeModal?.type === "create-group" && diploma && (
                <CreateGroupModal
                    open={true}
                    theme={theme}
                    diploma_id={diploma.id}
                    saving={saving}
                    onCreate={createGroup}
                    onOpenChange={(open) => !open && handleCloseModal()}
                />
            )}
            {activeModal?.type === "edit-group" && (
                <UpdateGroupModal
                    open={true}
                    theme={theme}
                    code={activeModal.group.code}
                    group_id={activeModal.group.id}
                    status={activeModal.group.status}
                    saving={saving}
                    onUpdateStatus={updateGroupStatus}
                    onOpenChange={(open) => !open && handleCloseModal()}
                />
            )}
            {activeModal?.type === "delete-group" && (
                <DeleteGroupModal
                    open={true}
                    theme={theme}
                    code={activeModal.group.code}
                    group_id={activeModal.group.id}
                    saving={saving}
                    onDelete={deleteGroup}
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