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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddProfessorModal({ open, onOpenChange }: Props) {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [rfc, setRfc] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/2 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl px-1 text-navy">Agregar Profesor</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[90vh] overflow-y-auto px-1 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="profesor" className="text-sm text-gray-500 font-medium">Nombre</Label>
                            <Input
                                id="nombre"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="apellidos" className="text-sm text-gray-500 font-medium">Apellidos</Label>
                            <Input
                                id="apellidos"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="email" className="text-sm text-gray-500 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="rfc" className="text-sm text-gray-500 font-medium">RFC</Label>
                            <Input
                                id="rfc"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={rfc}
                                onChange={(e) => setRfc(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="usuario" className="text-sm text-gray-500 font-medium">Usuario</Label>
                            <Input
                                id="usuario"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="password" className="text-sm text-gray-500 font-medium">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                className="text-xs h-7 border-gray-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
