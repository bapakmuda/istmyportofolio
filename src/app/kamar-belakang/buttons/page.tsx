import { prisma } from "@/lib/prisma";
import SortableButtonsList from "@/components/admin/SortableButtonsList";
import { createActionButton, updateActionButton } from "../actions";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ButtonsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const editId = edit;

  const buttons = await prisma.actionButton.findMany({ orderBy: { order: "asc" } });
  const editingButton = editId ? buttons.find(b => b.id === editId) : null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-6">ACTION BUTTONS</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-bold text-xl text-white mb-4">
              {editingButton ? "> EDIT_BUTTON" : "> NEW_BUTTON"}
            </h2>
            <form action={editingButton ? updateActionButton : createActionButton} className="bg-[#050505] p-6 border border-zinc-800 flex flex-col gap-4">
              {editingButton && <input type="hidden" name="id" value={editingButton.id} />}
              
              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 text-sm">LABEL (E.g. $ mail -s "Hire Me")</label>
                <input 
                  type="text" 
                  name="label" 
                  defaultValue={editingButton?.label} 
                  required 
                  className="bg-transparent border border-zinc-700 p-2 text-white focus:border-[var(--color-terminal-green)] outline-none font-mono"
                  placeholder='e.g. $ mail -s "Hire Me"'
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 text-sm">URL</label>
                <input 
                  type="text" 
                  name="url" 
                  defaultValue={editingButton?.url} 
                  required 
                  className="bg-transparent border border-zinc-700 p-2 text-white focus:border-[var(--color-terminal-green)] outline-none font-mono"
                  placeholder="e.g. mailto:ryan@example.com or https://..."
                />
              </div>
              
              <div className="flex gap-4 mt-4">
                <button type="submit" className="bg-[var(--color-terminal-green)] text-black font-bold py-2 px-6 hover:bg-green-400 transition-colors">
                  {editingButton ? "[ UPDATE ]" : "[ ADD ]"}
                </button>
                {editingButton && (
                  <a href="/kamar-belakang/buttons" className="border border-zinc-700 text-zinc-300 font-bold py-2 px-6 hover:bg-zinc-800 transition-colors text-center">
                    [ CANCEL ]
                  </a>
                )}
              </div>
            </form>
          </div>

          <div>
            <h2 className="font-bold text-xl text-white mb-4">
              {">"} CONFIGURED_BUTTONS
            </h2>
            {buttons.length === 0 ? (
              <div className="text-zinc-500 italic p-4 border border-zinc-800 bg-[#050505]">
                No action buttons configured yet.
              </div>
            ) : (
              <SortableButtonsList 
                initialButtons={buttons} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
