import type { GroupStatus } from "../types/group-modules.types";

// Etiquetas en español para los valores del contrato (en inglés)
export const GROUP_STATUS_LABELS: Record<GroupStatus, string> = {
    active: "Activo",
    finished: "Finalizado",
};

// Opciones listas para el prop `items` de <Select>
export const GROUP_STATUS_OPTIONS = (
    Object.entries(GROUP_STATUS_LABELS) as [GroupStatus, string][]
).map(([value, label]) => ({ value, label }));

export function getGroupStatusLabel(status: string): string {
    return GROUP_STATUS_LABELS[status as GroupStatus] ?? "Pendiente";
}

