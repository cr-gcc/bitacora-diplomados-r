import { useParams } from "react-router";
import { mockDiplomas } from "@components/layouts/config/navigation/mockDiplomas";
import { diplomaThemes, defaultDiplomaTheme } from "@components/layouts/types/navigation/diplomaThemes";

export function useDiploma() {
    const { slug } = useParams<{ slug: string }>();
    const diploma = mockDiplomas.find((item) => item.slug === slug);
    const theme = diplomaThemes[slug ?? ""] ?? defaultDiplomaTheme;

    return { diploma, theme };
}