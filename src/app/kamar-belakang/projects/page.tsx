import { prisma } from "@/lib/prisma";
import { createProject, deleteProject, updateProject } from "../actions";
import DeleteForm from "@/components/admin/DeleteForm";
import Link from "next/link";
import Image from "next/image";

export default async function ProjectsAdminPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  const editId = params.edit;

  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  const editingProject = editId ? projects.find(p => p.id === editId) : null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-6">MANAGE PROJECTS</h1>
        
        <form action={editingProject ? updateProject : createProject} className="bg-[#050505] p-6 border border-zinc-800 flex flex-col gap-4 max-w-xl">
          <h2 className="font-bold text-lg mb-2 text-[var(--color-terminal-green)]">
            {editingProject ? "EDIT MODE" : "ADD NEW PROJECT"}
          </h2>
          {editingProject && <input type="hidden" name="id" value={editingProject.id} />}
          
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Project Title</label>
            <input name="title" type="text" required defaultValue={editingProject?.title || ""} placeholder="e.g. Server Infrastructure" className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Description</label>
            <textarea name="description" required defaultValue={editingProject?.description || ""} placeholder="Project details..." rows={3} className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)] resize-none" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Hashtags</label>
            <input name="hashtags" type="text" defaultValue={editingProject?.hashtags || ""} placeholder="e.g. #linux #devops" className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Project Image</label>
            <input name="image" type="file" accept="image/*" required={!editingProject} className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)] file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:bg-[var(--color-terminal-green)] file:text-black file:font-bold hover:file:bg-[var(--color-terminal-green-dim)]" />
            {editingProject && editingProject.image && <span className="text-xs text-zinc-400">Leave empty to keep existing image</span>}
          </div>
          <div className="flex gap-4 mt-2">
            <button type="submit" className="px-4 py-2 border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] font-bold hover:bg-[var(--color-terminal-green)] hover:text-black transition-colors">
              {editingProject ? "[ UPDATE PROJECT ]" : "[ SAVE PROJECT ]"}
            </button>
            {editingProject && (
              <Link href="/kamar-belakang/projects" className="px-4 py-2 border border-zinc-600 text-zinc-400 font-bold hover:bg-zinc-800 transition-colors">
                [ CANCEL ]
              </Link>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-bold text-xl text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-4">EXISTING PROJECTS ({projects.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => (
            <div key={project.id} className="p-4 border border-[var(--color-terminal-green-dim)] bg-[#050505] flex flex-col gap-4 group hover:border-[var(--color-terminal-green)] transition-colors">
              {project.image && (
                <div className="relative w-full h-48 border border-zinc-800">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="font-bold text-white text-xl">{project.title}</span>
                <span className="text-[var(--color-terminal-green)] font-bold text-sm">{project.hashtags}</span>
                <p className="text-zinc-400 font-mono mt-2 text-sm">{project.description}</p>
              </div>
              <div className="flex gap-4 mt-auto self-end opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/kamar-belakang/projects?edit=${project.id}`} className="text-zinc-500 hover:text-[var(--color-terminal-green)] text-xl" title="Edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <DeleteForm action={deleteProject} id={project.id}>
                  <button type="submit" className="text-zinc-500 hover:text-red-500 text-xl" title="Delete">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </DeleteForm>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="text-zinc-500 italic font-bold">No projects added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
