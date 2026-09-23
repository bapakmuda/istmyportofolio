import { prisma } from "@/lib/prisma";
import { createSocial, deleteSocial, updateSocial } from "../actions";
import DeleteForm from "@/components/admin/DeleteForm";
import IconPicker from "@/components/admin/IconPicker";
import Link from "next/link";

export default async function SocialsAdminPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  const editId = params.edit;
  
  const socials = await prisma.social.findMany({ orderBy: { createdAt: "desc" } });
  const editingSocial = editId ? socials.find(s => s.id === editId) : null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-6">MANAGE SOCIALS</h1>
        
        <form action={editingSocial ? updateSocial : createSocial} className="bg-[#050505] p-6 border border-zinc-800 flex flex-col gap-4 max-w-xl">
          <h2 className="font-bold text-lg mb-2 text-[var(--color-terminal-green)]">
            {editingSocial ? "EDIT MODE" : "ADD NEW SOCIAL LINK"}
          </h2>
          {editingSocial && <input type="hidden" name="id" value={editingSocial.id} />}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Platform Name</label>
            <input name="platform" type="text" required defaultValue={editingSocial?.platform || ""} placeholder="e.g. GitHub" className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">URL</label>
            <input name="url" type="url" required defaultValue={editingSocial?.url || ""} placeholder="e.g. https://github.com/..." className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Icon Class</label>
            <IconPicker 
              name="icon" 
              defaultValue={editingSocial?.icon || ""}
              options={[
                "fa-brands fa-github", "fa-brands fa-linkedin", "fa-brands fa-twitter", 
                "fa-brands fa-instagram", "fa-brands fa-threads", "fa-brands fa-facebook", 
                "fa-brands fa-youtube", "fa-brands fa-tiktok", "fa-brands fa-discord", 
                "fa-brands fa-twitch", "fa-brands fa-telegram", "fa-brands fa-whatsapp", 
                "fa-solid fa-envelope", "fa-solid fa-globe", "fa-solid fa-link"
              ]}
            />
          </div>
          <div className="flex gap-4 mt-2">
            <button type="submit" className="px-4 py-2 border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] font-bold hover:bg-[var(--color-terminal-green)] hover:text-black transition-colors">
              {editingSocial ? "[ UPDATE SOCIAL ]" : "[ SAVE SOCIAL ]"}
            </button>
            {editingSocial && (
              <Link href="/kamar-belakang/socials" className="px-4 py-2 border border-zinc-600 text-zinc-400 font-bold hover:bg-zinc-800 transition-colors">
                [ CANCEL ]
              </Link>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-bold text-xl text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-4">EXISTING SOCIALS ({socials.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socials.map(social => (
            <div key={social.id} className="p-4 border border-[var(--color-terminal-green-dim)] bg-[#050505] flex items-center justify-between group hover:border-[var(--color-terminal-green)] transition-colors">
              <div className="flex items-center gap-4">
                <i className={`${social.icon} text-3xl text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]`}></i>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-white text-lg tracking-wide truncate">{social.platform}</span>
                  <span className="text-zinc-500 text-xs truncate max-w-[200px]">{social.url}</span>
                </div>
              </div>
              <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/kamar-belakang/socials?edit=${social.id}`} className="text-zinc-500 hover:text-[var(--color-terminal-green)] text-xl" title="Edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <DeleteForm action={deleteSocial} id={social.id}>
                  <button type="submit" className="text-zinc-500 hover:text-red-500 text-xl" title="Delete">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </DeleteForm>
              </div>
            </div>
          ))}
          {socials.length === 0 && (
            <div className="text-zinc-500 italic font-bold">No socials added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
