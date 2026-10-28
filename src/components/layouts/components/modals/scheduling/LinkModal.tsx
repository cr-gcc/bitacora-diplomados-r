import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressBar } from "@components/layouts/components/loading/ProgressBar";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function LinkModal({ open, onOpenChange }: Props) {
    const [grupo, setGrupo] = useState("");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/4 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl text-navy">Vincular</DialogTitle>
                    <DialogDescription className="text-xs text-gray-500">
                        Asigna un grupo para vincularlo a este registro.
                    </DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar max-h-[50vh] overflow-y-auto mt-1 mb-2">
                    <div className="flex flex-col col-span-2 gap-1 w-full">
                        <Select
                            id="grupo"
                            value={grupo}
                            onValueChange={setGrupo}
                        >
                            <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                <SelectValue placeholder="Seleccionar grupo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Activo" className="text-xs">Activo</SelectItem>
                                <SelectItem value="Inactivo" className="text-xs">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div>
                    <ProgressBar />
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer" size="xs">Guardar</Button>
                    <DialogClose render={<Button variant="outline" className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer" size="xs">Salir</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
