import logo from "@/assets/images/logos/cedigec_w_t.png";

interface LoadingScreenProps {
    message?: string;
    description?: string;
}

export function LoadingScreen({
    message = "Cargando...",
    description = "Sincronizando información académica"
}: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-navy/70 backdrop-blur-md transition-all duration-300">
            {/* Tarjeta flotante con efecto cristal */}
            <div className="relative mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#172b4d]/90 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">

                {/* Resplandor ambiental dorado sutil */}
                <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold/15 rounded-full blur-2xl" />

                {/* Logo CEDIGEC con pulso suave */}
                <div className="relative mx-auto mb-5 flex items-center justify-center">
                    <img
                        src={logo}
                        alt="CEDIGEC"
                        className="h-10 w-auto object-contain drop-shadow animate-pulse"
                    />
                </div>

                {/* Spinner dual: aro exterior dorado con giro continuo */}
                <div className="relative mx-auto my-5 size-14">
                    <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-gold/60 animate-spin [animation-direction:reverse] [animation-duration:1.2s]" />
                </div>

                {/* Textos */}
                <h3 className="text-base font-semibold tracking-wide text-white">
                    {message}
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                    {description}
                </p>

                {/* Barra de progreso dorada (usa la animación que ya tienes en index.css) */}
                <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                        className="h-full bg-gradient-to-r from-gold/40 via-gold to-gold/40 animate-progress rounded-full"
                        style={{ width: "100%", animationDuration: "1.6s" }}
                    />
                </div>
            </div>
        </div>
    );
}
