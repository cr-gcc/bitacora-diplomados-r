import { startOfWeek, endOfWeek } from "date-fns"
import { ProgressBar } from "@/components/layouts/components/loading/ProgressBar";
import { InfoStatCard } from "@pages/dashboard/components/InfoStatCard";
import { GroupCalendarTable } from "@/components/layouts/components/tables/GroupCalendarTable";
import { useDashboard } from "@pages/dashboard/hooks/useDashboard";
import { formatDateRange } from "@/lib/utils";

export function DashboardPage() {
    const { cardStats, groupsDates, loading, error } = useDashboard();
    const currentWeekInitDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const currentWeekEndDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    return (
        <div id="dashboard" className="flex flex-col gap-y-4 pb-12">
            <div>
                <h1 className="text-5xl text-navy tracking-tight">
                    Dashboard
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                    Seguimiento de diplomados, grupos y programación académica.
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
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {cardStats.map((stat) => (
                                    <InfoStatCard
                                        key={stat.title}
                                        title={stat.title}
                                        value={stat.value}
                                        description={stat.description}
                                        icon={stat.icon}
                                    />
                                ))}
                            </div>
                            <div className="bg-white rounded-xl border border-gray-200 px-6 pt-3 pb-4 shadow-xs">
                                <h3 className="text-base font-semibold text-navy mb-2">
                                    Inicio de cursos del <span className="italic">{formatDateRange(currentWeekInitDate, currentWeekEndDate)}</span>
                                </h3>
                                <GroupCalendarTable groupsDates={groupsDates} />
                            </div>
                        </>
                    )
                }
            </section>
        </div>
    )
}