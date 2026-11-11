import { useParams } from "react-router";
import { diplomaThemes, defaultDiplomaTheme } from "@/config/diplomas/diplomaThemes";

export function useDiploma() {
    const { slug } = useParams<{ slug: string }>();
    const theme = diplomaThemes[slug ?? ""] ?? defaultDiplomaTheme;

    return { slug, theme };
}
