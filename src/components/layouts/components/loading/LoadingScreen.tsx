interface LoadingScreenProps {
    message?: string;
}

export function LoadingScreen({ message = "Cargando..." }: LoadingScreenProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label={message}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
            <div className="flex flex-col items-center gap-4 p-6">
                <div aria-hidden="true" className="size-14 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin motion-reduce:animate-none" />
                <p className="text-lg font-medium text-white">{message}</p>
            </div>
        </div>
    );
}
