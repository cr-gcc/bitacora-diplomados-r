import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/hooks/useAuth";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: Props) {
    const { user } = useAuth();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-navy text-xl ">Perfil</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mb-2">
                    <div className="flex flex-col gap-y-1">
                        <p className="text-navy text-md">Nombre: <span className="font-semibold">{user?.name}</span></p>
                        <p className="text-navy text-md">Email: <span className="font-semibold">{user?.email}</span></p>
                        <p className="text-navy text-md">Role: <span className="font-semibold">{user?.role}</span></p>
                    </div>
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <DialogClose render={<Button className="bg-navy text-xs text-white hover:text-white cursor-pointer" size="xs">Aceptar</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}