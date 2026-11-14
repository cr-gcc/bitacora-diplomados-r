import type { Group, GroupModule, Review } from "./group-modules.types";

export type GroupModalState =
    | { type: "create-group" }
    | { type: "update-group"; group: Group }
    | { type: "delete-group"; group: Group }
    | { type: "edit-module"; module: GroupModule }
    | { type: "check-module"; module_number: number; review: Review }
    | null;