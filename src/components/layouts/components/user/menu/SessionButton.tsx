import type * as React from "react"
import { cn } from "@/lib/utils"

export function SessionButton({ className, ...props }: React.ComponentProps<"button">) {
    return (
        <button
            type="button"
            className={cn(
                "overflow-hidden rounded-full border border-gray-300 shadow-inner cursor-pointer",
                className
            )}
            {...props}
        >
            <span className="sr-only">Toggle dashboard menu</span>
            <img
                src="https://ui-avatars.com/api/?name=Cristobal+Gutierrez&background=b18a43&color=ffffff"
                alt="Avatar"
                className="size-10 object-cover"
            />
        </button>
    )
}
