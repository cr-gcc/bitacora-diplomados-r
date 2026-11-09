import type { Group, GroupModule } from "./group-modules.types";

export type GroupModalState =
    | { type: "create-group" }
    | { type: "edit-group"; group: Group }
    | { type: "delete-group"; group: Group }
    | { type: "edit-module"; module: GroupModule }
    | { type: "check-module"; module: GroupModule }
    | null;