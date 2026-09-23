import { prisma } from "@/lib/prisma";
import VisitorChart from "@/components/admin/VisitorChart";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VisitorsAdminPage() {
  const visitors = await prisma.visitor.findMany({
    orderBy: { visitedAt: "desc" },
  });

  const totalVisitors = visitors.length;

  // Aggregate data for chart (count per day)
  const visitorsPerDay: Record<string, number> = {};
  
  visitors.forEach((v) => {
    // Format date as "Sep 24"
    const dateStr = v.visitedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!visitorsPerDay[dateStr]) {
      visitorsPerDay[dateStr] = 0;
    }
    visitorsPerDay[dateStr]++;
  });

  // Convert to array for Recharts and sort chronologically (this is a simple sort, assuming all dates are within the same year for this demo)
  const chartData = Object.entries(visitorsPerDay)
    .map(([date, count]) => ({ date, count }))
    .reverse(); // reversing because findMany was desc

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-6">VISITOR STATS</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#050505] p-6 border border-zinc-800 flex flex-col items-center justify-center">
            <span className="text-zinc-500 font-bold mb-2">TOTAL VISITORS</span>
            <span className="text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{totalVisitors}</span>
          </div>
          <div className="bg-[#050505] p-6 border border-zinc-800 col-span-1 md:col-span-2 flex flex-col justify-center">
            <span className="text-zinc-500 font-bold mb-4">TRAFFIC OVERVIEW</span>
            <VisitorChart data={chartData} />
          </div>
        </div>

        <h2 className="font-bold text-xl text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-4">RECENT VISITORS</h2>
        
        <div className="bg-[#050505] border border-zinc-800 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500">
                <th className="p-4 font-bold">DATE</th>
                <th className="p-4 font-bold">IP ADDRESS</th>
                <th className="p-4 font-bold">DEVICE / OS</th>
                <th className="p-4 font-bold">LOCATION</th>
              </tr>
            </thead>
            <tbody>
              {visitors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-zinc-500 italic">No visitors recorded yet.</td>
                </tr>
              ) : (
                visitors.map((v) => (
                  <tr key={v.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4 whitespace-nowrap">
                      {v.visitedAt.toLocaleDateString()} {v.visitedAt.toLocaleTimeString()}
                    </td>
                    <td className="p-4 text-[var(--color-terminal-green)]">{v.ip}</td>
                    <td className="p-4 text-zinc-300">{v.device}</td>
                    <td className="p-4 text-zinc-400">{v.location}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
