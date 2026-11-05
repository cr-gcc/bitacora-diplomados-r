import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAddProfessorForm } from "../hooks/useAddProfessorForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddProfessorModal({ open, onOpenChange }: Props) {
    const {
        form,
        errors,
        updateFile,
        validateForm,
        resetForm
    } = useAddProfessorForm();

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
                                value={form.name}
                                onChange={(e) => updateFile('name', e.target.value)}
                            />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="apellidos" className="text-sm text-gray-500 font-medium">Apellidos</Label>
                            <Input
                                id="apellidos"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.lastName}
                                onChange={(e) => updateFile('lastName', e.target.value)}
                            />
                            {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName}</span>}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="email" className="text-sm text-gray-500 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.email}
                                onChange={(e) => updateFile('email', e.target.value)}
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="rfc" className="text-sm text-gray-500 font-medium">RFC</Label>
                            <Input
                                id="rfc"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.rfc}
                                onChange={(e) => updateFile('rfc', e.target.value)}
                            />
                            {errors.rfc && <span className="text-red-500 text-xs">{errors.rfc}</span>}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="usuario" className="text-sm text-gray-500 font-medium">Usuario</Label>
                            <Input
                                id="usuario"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.user}
                                onChange={(e) => updateFile('user', e.target.value)}
                            />
                            {errors.user && <span className="text-red-500 text-xs">{errors.user}</span>}
                        </div>
                    </div>
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button
                        size="xs"
                        className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                        onClick={() => validateForm()}
                    >
                        Guardar
                    </Button>
                    <DialogClose render={
                        <Button
                            size="xs"
                            variant="outline"
                            className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                            onClick={() => resetForm()}
                        >
                            Salir
                        </Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
