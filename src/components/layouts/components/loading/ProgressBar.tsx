export function ProgressBar() {
    return (
        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
                className="h-3 bg-gray-600 animate-progress rounded-full"
                style={{ width: "100%", animationDuration: "1.5s" }}
            ></div>
        </div>
    )
}