import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SessionButton } from "@/components/layouts/components/menu/session/SessionButton"
import { SessionOption } from "@/components/layouts/components/menu/session/SessionOption"
import { sessionOptionItem } from "@/components/layouts/config/menu/session/sessionOptionItem.ts"
import { useNavigate } from "react-router"
import { useAuth } from "@/auth/hooks/useAuth"
import { ProfileModal } from "@components/layouts/components/modals/user/ProfileModal"

export function SessionMenu() {
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    }

    const handleSettings = () => {
        console.log('ajustes')
    }

    const handleProfile = () => {
        setOpenProfile(true);
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={
                    <SessionButton />
                } />
                <DropdownMenuContent className="p-0">
                    {
                        sessionOptionItem.map((option) => (
                            <SessionOption
                                key={option.label}
                                {...option}
                                action={
                                    option.type === "logout" ? handleLogout :
                                        option.type === "settings" ? handleSettings :
                                            handleProfile
                                }
                            />
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <ProfileModal open={openProfile} onOpenChange={setOpenProfile} />
        </>
    )
}