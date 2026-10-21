import { DiplomaCard } from '@components/layouts/components/cards/DiplomaCard'
import { diplomaItems } from '@components/layouts/config/navigation/diplomaItems'

export function DiplomasPage() {
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {diplomaItems.map((diploma) => (
                        <DiplomaCard key={diploma.id} diploma={diploma} />
                    ))}
                </div>
            </section>
        </div>
    )
}   