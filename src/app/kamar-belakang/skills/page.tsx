import { prisma } from "@/lib/prisma";
import { createSkill, deleteSkill, updateSkill } from "../actions";
import IconPicker from "@/components/admin/IconPicker";
import SortableSkillsList from "@/components/admin/SortableSkillsList";
import Link from "next/link";

export default async function SkillsAdminPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  const editId = params.edit;
  
  // Order by the 'order' field ascending
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  const editingSkill = editId ? skills.find(s => s.id === editId) : null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-6">MANAGE SKILLS</h1>
        
        <form action={editingSkill ? updateSkill : createSkill} className="bg-[#050505] p-6 border border-zinc-800 flex flex-col gap-4 max-w-xl">
          <h2 className="font-bold text-lg mb-2 text-[var(--color-terminal-green)]">
            {editingSkill ? "EDIT MODE" : "ADD NEW SKILL"}
          </h2>
          {editingSkill && <input type="hidden" name="id" value={editingSkill.id} />}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Skill Name</label>
            <input name="name" type="text" required defaultValue={editingSkill?.name || ""} placeholder="e.g. React" className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Icon Class (Devicon)</label>
            <IconPicker 
              name="icon" 
              defaultValue={editingSkill?.icon || ""}
              options={[
                "devicon-javascript-plain", "devicon-typescript-plain", "devicon-react-original", 
                "devicon-nextjs-plain", "devicon-nodejs-plain", "devicon-python-plain", 
                "devicon-php-plain", "devicon-laravel-plain", "devicon-go-original-wordmark",
                "devicon-html5-plain", "devicon-css3-plain", "devicon-tailwindcss-plain",
                "devicon-docker-plain", "devicon-kubernetes-plain", "devicon-amazonwebservices-plain-wordmark",
                "devicon-googlecloud-plain", "devicon-mysql-plain", "devicon-postgresql-plain",
                "devicon-mongodb-plain", "devicon-git-plain", "devicon-linux-plain", "devicon-ubuntu-plain"
              ]}
            />
          </div>
          <div className="flex gap-4 mt-2">
            <button type="submit" className="px-4 py-2 border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] font-bold hover:bg-[var(--color-terminal-green)] hover:text-black transition-colors">
              {editingSkill ? "[ UPDATE SKILL ]" : "[ SAVE SKILL ]"}
            </button>
            {editingSkill && (
              <Link href="/kamar-belakang/skills" className="px-4 py-2 border border-zinc-600 text-zinc-400 font-bold hover:bg-zinc-800 transition-colors">
                [ CANCEL ]
              </Link>
            )}
          </div>
        </form>
      </div>

      <div>
        <SortableSkillsList initialSkills={skills} deleteSkillAction={deleteSkill} />
      </div>
    </div>
  );
}
