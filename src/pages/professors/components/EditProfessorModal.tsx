import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Professor } from "../types/professor.types";
import { useEditProfessorForm } from "../hooks/useEditProfessorForm";

interface Props {
    professor: Professor;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditProfessorModal({ professor, open, onOpenChange }: Props) {
    const {
        form,
        errors,
        updateField,
        validateForm,
    } = useEditProfessorForm(professor);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:w-1/2 px-4 py-3 gap-y-1" showCloseButton={false} >
                <DialogHeader>
                    <DialogTitle className="text-xl px-1 text-navy">Editar Profesor</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar max-h-[90vh] overflow-y-auto px-1 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="name" className="text-sm text-gray-500 font-medium">Nombre</Label>
                            <Input
                                id="name"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.name}
                                onChange={(e) => updateField("name", e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs">{errors.name}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="lastName" className="text-sm text-gray-500 font-medium">Apellidos</Label>
                            <Input
                                id="lastName"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.lastName}
                                onChange={(e) => updateField("lastName", e.target.value)}
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-xs">{errors.lastName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="email" className="text-sm text-gray-500 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.email}
                                onChange={(e) => updateField("email", e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="rfc" className="text-sm text-gray-500 font-medium">RFC</Label>
                            <Input
                                id="rfc"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.rfc}
                                onChange={(e) => updateField("rfc", e.target.value)}
                            />
                            {errors.rfc && (
                                <p className="text-red-500 text-xs">{errors.rfc}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="user" className="text-sm text-gray-500 font-medium">Usuario</Label>
                            <Input
                                id="user"
                                type="text"
                                className="text-xs h-7 border-gray-300"
                                value={form.user}
                                onChange={(e) => updateField("user", e.target.value)}
                            />
                            {errors.user && (
                                <p className="text-red-500 text-xs">{errors.user}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="status" className="text-sm text-gray-500 font-medium">Estatus</Label>
                            <Select
                                id="status"
                                items={[
                                    { label: "Activo", value: true },
                                    { label: "Inactivo", value: false },
                                ]}
                                value={form.active}
                                onValueChange={(value) => {
                                    if (value !== null) {
                                        updateField("active", value);
                                    }
                                }}
                            >
                                <SelectTrigger className="text-xs w-full border-gray-300 data-[size=sm]:h-7" size="sm">
                                    <SelectValue placeholder="Seleccionar estatus" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={true} className="text-xs">Activo</SelectItem>
                                    <SelectItem value={false} className="text-xs">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter className="w-full gap-x-1">
                    <Button
                        size="xs"
                        className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer"
                        onClick={() => {
                            const validatedData = validateForm();
                            if (!validatedData) return;
                            console.log("Formulario válido:", validatedData);
                        }}>
                        Guardar
                    </Button>
                    <DialogClose render={<Button variant="outline" className="bg-navy text-xs text-white hover:bg-navyh hover:text-white cursor-pointer" size="xs">Salir</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
