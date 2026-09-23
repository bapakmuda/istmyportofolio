import { prisma } from "@/lib/prisma";
import { createCertificate, deleteCertificate, updateCertificate } from "../actions";
import DeleteForm from "@/components/admin/DeleteForm";
import Link from "next/link";
import Image from "next/image";

export default async function CertificatesAdminPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const params = await searchParams;
  const editId = params.edit;
  
  const certificates = await prisma.certificate.findMany({ orderBy: { createdAt: "desc" } });
  const editingCert = editId ? certificates.find(c => c.id === editId) : null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-6">MANAGE CERTIFICATES</h1>
        
        <form action={editingCert ? updateCertificate : createCertificate} className="bg-[#050505] p-6 border border-zinc-800 flex flex-col gap-4 max-w-xl">
          <h2 className="font-bold text-lg mb-2 text-[var(--color-terminal-green)]">
            {editingCert ? "EDIT MODE" : "ADD NEW CERTIFICATE"}
          </h2>
          {editingCert && <input type="hidden" name="id" value={editingCert.id} />}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Certificate Name</label>
            <input name="name" type="text" required defaultValue={editingCert?.name || ""} placeholder="e.g. AWS Certified Solutions Architect" className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-white">Certificate Image</label>
            <input name="image" type="file" required={!editingCert} accept="image/*" className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)] file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:bg-[var(--color-terminal-green)] file:text-black file:font-bold hover:file:bg-[var(--color-terminal-green-dim)]" />
            {editingCert && editingCert.image && <span className="text-xs text-zinc-400">Leave empty to keep existing image</span>}
          </div>
          <div className="flex gap-4 mt-2">
            <button type="submit" className="px-4 py-2 border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] font-bold hover:bg-[var(--color-terminal-green)] hover:text-black transition-colors">
              {editingCert ? "[ UPDATE CERTIFICATE ]" : "[ SAVE CERTIFICATE ]"}
            </button>
            {editingCert && (
              <Link href="/kamar-belakang/certificates" className="px-4 py-2 border border-zinc-600 text-zinc-400 font-bold hover:bg-zinc-800 transition-colors">
                [ CANCEL ]
              </Link>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-bold text-xl text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 mb-4">EXISTING CERTIFICATES ({certificates.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certificates.map(cert => (
            <div key={cert.id} className="p-4 border border-[var(--color-terminal-green-dim)] bg-[#050505] flex flex-col gap-4 group hover:border-[var(--color-terminal-green)] transition-colors">
              {cert.image && (
                <div className="relative w-full aspect-[4/3] border border-zinc-800">
                  <Image src={cert.image} alt={cert.name} fill className="object-cover" />
                </div>
              )}
              <span className="font-bold text-white text-center">{cert.name}</span>
              <div className="flex justify-center gap-4 mt-auto w-full opacity-0 group-hover:opacity-100 transition-opacity pt-2">
                <Link href={`/kamar-belakang/certificates?edit=${cert.id}`} className="text-zinc-500 hover:text-[var(--color-terminal-green)] text-xl" title="Edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </Link>
                <DeleteForm action={deleteCertificate} id={cert.id}>
                  <button type="submit" className="text-zinc-500 hover:text-red-500 text-xl" title="Delete">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </DeleteForm>
              </div>
            </div>
          ))}
          {certificates.length === 0 && (
            <div className="text-zinc-500 italic font-bold">No certificates added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
