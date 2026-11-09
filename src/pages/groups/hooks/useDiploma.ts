import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { groupServices } from "../services/groupService";
import { diplomaThemes, defaultDiplomaTheme } from "@/config/diplomas/diplomaThemes";
import type { DiplomaWithGroups } from "../types/group-modules.types";

export function useDiploma() {
    const [diploma, setDiploma] = useState<DiplomaWithGroups | null>(null);
    const { slug } = useParams<{ slug: string }>();
    const theme = diplomaThemes[slug ?? ""] ?? defaultDiplomaTheme;

    useEffect(() => {
        if (!slug) return;
        const loadGroups = async () => {
            const response = await groupServices.getGroupsByDiploma(slug);
            setDiploma(response.data);
        };
        void loadGroups();
    }, [slug]);

    return { diploma, theme };
}