import { ProgressBar } from "@components/layouts/components/loading/ProgressBar";
import { DiplomaCard } from "@pages/diplomas/components/DiplomaCard"
import { useDiplomas } from "@pages/diplomas/hooks/useDiplomas";

export function DiplomasPage() {
    const { diplomas, loading, error } = useDiplomas();

    return (
        <div id="diplomas" className="flex flex-col gap-y-4 pb-12">
            <div>
                <h1 className="text-5xl text-navy tracking-tight">
                    Diplomados
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                    Selecciona el diplomado para consultar su información, acceder directamente a su plataforma virtual y administrar grupos.
                </p>
            </div>
            <section className="flex flex-col gap-4">
                {
                    loading ? (
                        <ProgressBar />
                    ) : error ? (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    ) : diplomas.length === 0 ? (
                        <p role="alert" className="text-center py-3 text-sm text-gray-500">
                            No hay diplomados registrados.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {diplomas.map((diploma) => (
                                <DiplomaCard key={diploma.id} diploma={diploma} />
                            ))}
                        </div>
                    )
                }
            </section>
        </div>
    )
}   