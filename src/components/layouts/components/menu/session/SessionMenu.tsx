import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SessionButton } from "@/components/layouts/components/menu/session/SessionButton"
import { SessionOption } from "@/components/layouts/components/menu/session/SessionOption"
import { sessionOptionItem } from "@/components/layouts/config/user/menu/sessionOptionItem.ts"

export function SessionMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <SessionButton />
            } />
            <DropdownMenuContent className="p-0">
                {
                    sessionOptionItem.map((option) => (
                        <SessionOption key={option.label} {...option} />
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}