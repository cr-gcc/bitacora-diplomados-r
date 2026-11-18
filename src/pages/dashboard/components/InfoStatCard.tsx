import type { LucideIcon } from "lucide-react"

interface Props {
    title: string
    value: number
    description: string
    icon: LucideIcon
}

export function InfoStatCard({ title, value, description, icon: Icon }: Props) {
    return (
        <div
            key={title}
            className="bg-white rounded-xl border border-gray-200 px-6 pt-3 pb-4 shadow-xs flex flex-col justify-between gap-y-4 hover:border-gray-300 hover:shadow-sm transition-all"
        >
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {title}
                </span>
                <div className="size-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-navy">
                    <Icon className="size-5" />
                </div>
            </div>
            <div>
                <div className="text-4xl font-bold text-navy tracking-tight">
                    {value}
                </div>
            </div>
        </div>
    )
}