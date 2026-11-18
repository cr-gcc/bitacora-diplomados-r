import { useMemo, useState } from "react";

type SearchableValue = string | number | null | undefined;

export function useTableSearch<T>(
    items: T[],
    getSearchableFields: (item: T) => SearchableValue[]
) {
    const [search, setSearch] = useState("");

    const filteredItems = useMemo(() => {
        const query = search.toLowerCase().trim();
        if (!query) return items;

        return items.filter((item) =>
            getSearchableFields(item).some((value) =>
                String(value ?? "").toLowerCase().includes(query)
            )
        );
    }, [items, search, getSearchableFields]);

    return {
        search,
        setSearch,
        filteredItems,
    };
}
