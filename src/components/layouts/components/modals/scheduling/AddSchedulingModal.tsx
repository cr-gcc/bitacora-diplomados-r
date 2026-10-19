import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddSchedulingModal({ open, onOpenChange }: Props) {
    const [diplomado, setDiplomado] = useState('');
    const [modulo, setModulo] = useState('');
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const [profesor, setProfesor] = useState('');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/2 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl px-1 text-navy">Agregar Programación</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[90vh] overflow-y-auto px-1 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col col-span-2 gap-1 w-full">
                            <Label htmlFor="diplomado" className="text-sm text-gray-500 font-medium">Diplomado</Label>
                            <Select
                                id="diplomado"
                                value={diplomado}
                                onValueChange={setDiplomado}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                    <SelectValue placeholder="Seleccionar diplomado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Activo" className="text-xs">Activo</SelectItem>
                                    <SelectItem value="Inactivo" className="text-xs">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col col-span-2 gap-1 w-full">
                            <Label htmlFor="modulo" className="text-sm text-gray-500 font-medium">Módulo</Label>
                            <Select
                                id="modulo"
                                value={modulo}
                                onValueChange={setModulo}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                    <SelectValue placeholder="Seleccionar módulo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Activo" className="text-xs">Activo</SelectItem>
                                    <SelectItem value="Inactivo" className="text-xs">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="inicio" className="text-sm text-gray-500 font-medium">Inicio</Label>
                            <Input
                                id="inicio"
                                type="date"
                                className="text-xs h-7 border-gray-300"
                                value={inicio}
                                onChange={(e) => setInicio(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="fin" className="text-sm text-gray-500 font-medium">Termino</Label>
                            <Input
                                id="fin"
                                type="date"
                                className="text-xs h-7 border-gray-300"
                                value={fin}
                                onChange={(e) => setFin(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col col-span-2 gap-1 w-full">
                            <Label htmlFor="profesor" className="text-sm text-gray-500 font-medium">Profesor</Label>
                            <Select
                                id="profesor"
                                value={profesor}
                                onValueChange={setProfesor}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300" size="sm">
                                    <SelectValue placeholder="Seleccionar profesor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Activo" className="text-xs">Activo</SelectItem>
                                    <SelectItem value="Inactivo" className="text-xs">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer" size="xs">Guardar</Button>
                    <DialogClose render={<Button variant="outline" className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer" size="xs">Salir</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
