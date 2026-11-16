import { useParams } from "react-router";
import { diplomaThemes, defaultDiplomaTheme } from "@/config/diplomas/diplomaThemes";
import type { DiplomaTheme } from "@/config/diplomas/diploma.types";

export function useDiplomaTheme(): { slug: string | undefined; theme: DiplomaTheme } {
    const { slug } = useParams<{ slug: string }>();
    const theme = diplomaThemes[slug ?? ""] ?? defaultDiplomaTheme;

    return { slug, theme };
}
