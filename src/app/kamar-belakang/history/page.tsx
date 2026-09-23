import { prisma } from "@/lib/prisma";
import { createHistory, deleteHistory, updateHistory } from "../actions";
import DeleteForm from "@/components/admin/DeleteForm";
import Link from "next/link";

export default async function HistoryAdminPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  const editId = params.edit;
  
  const historyItems = await prisma.history.findMany({ orderBy: { createdAt: "desc" } });
  const editingHistory = editId ? historyItems.find(h => h.id === editId) : null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-6">MANAGE CAREER / HISTORY</h1>
        
        <form action={editingHistory ? updateHistory : createHistory} className="bg-[#050505] p-6 border border-zinc-800 flex flex-col gap-4 max-w-xl">
          <h2 className="font-bold text-lg mb-2 text-[var(--color-terminal-green)]">
            {editingHistory ? "EDIT MODE" : "ADD NEW CAREER RECORD"}
          </h2>
          {editingHistory && <input type="hidden" name="id" value={editingHistory.id} />}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Year / Date</label>
            <input name="year" type="text" required defaultValue={editingHistory?.year || ""} placeholder="e.g. 2023 - Present" className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Title / Role</label>
            <input name="title" type="text" required defaultValue={editingHistory?.title || ""} placeholder="e.g. Senior DevOps Engineer" className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Description (Optional)</label>
            <textarea name="description" defaultValue={editingHistory?.description || ""} placeholder="Short description of responsibilities..." rows={3} className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)] resize-none" />
          </div>
          <div className="flex gap-4 mt-2">
            <button type="submit" className="px-4 py-2 border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] font-bold hover:bg-[var(--color-terminal-green)] hover:text-black transition-colors">
              {editingHistory ? "[ UPDATE RECORD ]" : "[ SAVE RECORD ]"}
            </button>
            {editingHistory && (
              <Link href="/kamar-belakang/history" className="px-4 py-2 border border-zinc-600 text-zinc-400 font-bold hover:bg-zinc-800 transition-colors">
                [ CANCEL ]
              </Link>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-bold text-xl text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-4">EXISTING RECORDS ({historyItems.length})</h2>
        <div className="flex flex-col gap-4 max-w-3xl">
          {historyItems.map(item => (
            <div key={item.id} className="p-4 border border-[var(--color-terminal-green-dim)] bg-[#050505] flex items-start justify-between group hover:border-[var(--color-terminal-green)] transition-colors">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[var(--color-terminal-green)] tracking-wide">{item.year}</span>
                <span className="font-bold text-white text-xl">{item.title}</span>
                {item.description && <span className="text-zinc-400 font-mono mt-2 whitespace-pre-wrap">{item.description}</span>}
              </div>
              <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                <Link href={`/kamar-belakang/history?edit=${item.id}`} className="text-zinc-500 hover:text-[var(--color-terminal-green)] text-xl" title="Edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <DeleteForm action={deleteHistory} id={item.id}>
                  <button type="submit" className="text-zinc-500 hover:text-red-500 text-xl" title="Delete">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </DeleteForm>
              </div>
            </div>
          ))}
          {historyItems.length === 0 && (
            <div className="text-zinc-500 italic font-bold">No history records added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
