export function LoadingScreen() {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-9999 transition-all duration-300"
        >
            <div className="p-6 rounded-lg max-w-sm w-full text-center">
                <div className="border-4 border-t-4 border-gray-200 border-t-gray-500 rounded-full h-16 w-16 animate-spin mx-auto"></div>
                <p className="mt-4 text-lg text-gray-200 tracking-wide">Cargando...</p>
            </div>
        </div>
    )
}