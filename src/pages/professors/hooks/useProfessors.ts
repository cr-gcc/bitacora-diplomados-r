import { useCallback, useEffect, useRef, useState } from "react";
import { professorService } from "../services/professorService";
import axios from "axios";
import type {
    Professor,
    CreateProfessorPayload,
    UpdateProfessorPayload,
} from "../types/professor.types";

export function useProfessors() {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const controllerRef = useRef<AbortController | null>(null);

    const loadProfessors = useCallback(async (silent = false) => {
        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;
        try {
            if (!silent) {
                setLoading(true);
                setError(null);
            }
            const data = await professorService.getAll(
                controller.signal
            );
            if (!controller.signal.aborted) {
                setProfessors(data);
            }
        } catch (error) {
            if (axios.isCancel(error) || controller.signal.aborted) {
                return;
            }
            if (!silent) {
                setError("No fue posible cargar los profesores.");
            } else {
                console.error("No fue posible actualizar los profesores:", error);
            }
        } finally {
            if (!silent && !controller.signal.aborted) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        void loadProfessors();
        return () => {
            controllerRef.current?.abort();
        };
    }, [loadProfessors]);

    const createProfessor = async (
        data: CreateProfessorPayload
    ): Promise<Professor> => {
        setSaving(true);
        let professor: Professor;
        try {
            professor = await professorService.create(data);
        } finally {
            setSaving(false);
        }
        try {
            await loadProfessors(true);
        } catch (err) {
            console.error("No fue posible actualizar los profesores:", err);
        }
        return professor;
    };

    const updateProfessor = async (
        id: number,
        data: UpdateProfessorPayload
    ): Promise<Professor> => {
        setSaving(true);
        try {
            const updatedProfessor = await professorService.update(id, data);
            setProfessors((prev) =>
                prev.map((professor) =>
                    professor.id === id ? updatedProfessor : professor
                )
            );
            return updatedProfessor;
        } finally {
            setSaving(false);
        }
    };

    return {
        professors,
        loading,
        saving,
        error,
        refetch: loadProfessors,
        createProfessor,
        updateProfessor,
    };
}