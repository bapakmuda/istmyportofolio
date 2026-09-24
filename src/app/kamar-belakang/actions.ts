"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- SKILLS ---
export async function createSkill(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;
    if (!name || !icon) return;
    
    await prisma.skill.create({ data: { name, icon } });
    revalidatePath("/");
    revalidatePath("/kamar-belakang/skills");
    redirect("/kamar-belakang/skills");
  } catch (error: any) {
    const fs = require('fs');
    fs.appendFileSync('./public/error.log', new Date().toISOString() + ' createSkill: ' + error.message + '\n' + error.stack + '\n');
    throw error;
  }
}

export async function updateSkill(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const icon = formData.get("icon") as string;
  if (!id || !name || !icon) return;
  
  await prisma.skill.update({ where: { id }, data: { name, icon } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/skills");
  redirect("/kamar-belakang/skills");
}

export async function deleteSkill(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/skills");
}

export async function reorderSkills(updates: { id: string; order: number }[]) {
  // Use a transaction to update all skill orders
  await prisma.$transaction(
    updates.map((update) =>
      prisma.skill.update({
        where: { id: update.id },
        data: { order: update.order },
      })
    )
  );
  revalidatePath("/");
  revalidatePath("/kamar-belakang/skills");
}

// --- HISTORY ---
export async function createHistory(formData: FormData) {
  const year = formData.get("year") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  if (!year || !title) return;
  
  await prisma.history.create({ data: { year, title, description } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/history");
  redirect("/kamar-belakang/history");
}

export async function updateHistory(formData: FormData) {
  const id = formData.get("id") as string;
  const year = formData.get("year") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  if (!id || !year || !title) return;
  
  await prisma.history.update({ where: { id }, data: { year, title, description } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/history");
  redirect("/kamar-belakang/history");
}

export async function deleteHistory(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.history.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/history");
}

// --- FILE UPLOAD UTILITY ---
import { writeFile, unlink } from "fs/promises";
import path from "path";

async function saveFile(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${Math.round(Math.random() * 1000)}${ext}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);
  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

async function deleteFile(fileUrl: string | null) {
  if (!fileUrl || !fileUrl.startsWith("/uploads/")) return;
  try {
    const filepath = path.join(process.cwd(), "public", fileUrl);
    await unlink(filepath);
  } catch (e) {
    console.error("Failed to delete file:", e);
  }
}

// --- PROJECTS ---
export async function createProject(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const hashtags = formData.get("hashtags") as string;
    const imageFile = formData.get("image") as File;
    
    if (!title || !description) return;
    
    const imageUrl = await saveFile(imageFile);
    
    await prisma.project.create({ 
      data: { title, description, hashtags, image: imageUrl } 
    });
    revalidatePath("/");
    revalidatePath("/kamar-belakang/projects");
    redirect("/kamar-belakang/projects");
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') throw error;
    const fs = require('fs');
    fs.appendFileSync('./public/error.log', new Date().toISOString() + ' createProject: ' + error.message + '\n' + error.stack + '\n');
    throw error;
  }
}

export async function updateProject(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const hashtags = formData.get("hashtags") as string;
    const imageFile = formData.get("image") as File;
    
    if (!id || !title || !description) return;
    
    const data: any = { title, description, hashtags };
    
    if (imageFile && imageFile.size > 0) {
      const project = await prisma.project.findUnique({ where: { id } });
      if (project?.image) await deleteFile(project.image);
      data.image = await saveFile(imageFile);
    }
    
    await prisma.project.update({ where: { id }, data });
    revalidatePath("/");
    revalidatePath("/kamar-belakang/projects");
    redirect("/kamar-belakang/projects");
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') throw error;
    const fs = require('fs');
    fs.appendFileSync('./public/error.log', new Date().toISOString() + ' updateProject: ' + error.message + '\n' + error.stack + '\n');
    throw error;
  }
}

export async function deleteProject(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  const project = await prisma.project.findUnique({ where: { id } });
  if (project?.image) await deleteFile(project.image);
  
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/projects");
}

// --- CERTIFICATES ---
export async function createCertificate(formData: FormData) {
  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;
  
  if (!name || !imageFile || imageFile.size === 0) return;
  
  const imageUrl = await saveFile(imageFile);
  
  await prisma.certificate.create({ 
    data: { name, image: imageUrl } 
  });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/certificates");
  redirect("/kamar-belakang/certificates");
}

export async function updateCertificate(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;
  
  if (!id || !name) return;
  
  const data: any = { name };
  
  if (imageFile && imageFile.size > 0) {
    const cert = await prisma.certificate.findUnique({ where: { id } });
    if (cert?.image) await deleteFile(cert.image);
    data.image = await saveFile(imageFile);
  }
  
  await prisma.certificate.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/certificates");
  redirect("/kamar-belakang/certificates");
}

export async function deleteCertificate(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  const cert = await prisma.certificate.findUnique({ where: { id } });
  if (cert?.image) await deleteFile(cert.image);
  
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/certificates");
}

// --- SOCIALS ---
export async function createSocial(formData: FormData) {
  const platform = formData.get("platform") as string;
  const url = formData.get("url") as string;
  const icon = formData.get("icon") as string;
  if (!platform || !url || !icon) return;
  
  await prisma.social.create({ data: { platform, url, icon } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/socials");
  redirect("/kamar-belakang/socials");
}

export async function updateSocial(formData: FormData) {
  const id = formData.get("id") as string;
  const platform = formData.get("platform") as string;
  const url = formData.get("url") as string;
  const icon = formData.get("icon") as string;
  if (!id || !platform || !url || !icon) return;
  
  await prisma.social.update({ where: { id }, data: { platform, url, icon } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/socials");
  redirect("/kamar-belakang/socials");
}

export async function deleteSocial(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.social.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/socials");
}

// --- ACTION BUTTONS ---
export async function createActionButton(formData: FormData) {
  const label = formData.get("label") as string;
  const url = formData.get("url") as string;
  if (!label || !url) return;
  
  await prisma.actionButton.create({ data: { label, url, order: 0 } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/buttons");
  redirect("/kamar-belakang/buttons");
}

export async function updateActionButton(formData: FormData) {
  const id = formData.get("id") as string;
  const label = formData.get("label") as string;
  const url = formData.get("url") as string;
  if (!id || !label || !url) return;
  
  await prisma.actionButton.update({ where: { id }, data: { label, url } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/buttons");
  redirect("/kamar-belakang/buttons");
}

export async function deleteActionButton(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  
  await prisma.actionButton.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/kamar-belakang/buttons");
}

export async function reorderActionButtons(items: { id: string; order: number }[]) {
  
  await prisma.$transaction(
    items.map((item) =>
      prisma.actionButton.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  );
  revalidatePath("/");
  revalidatePath("/kamar-belakang/buttons");
}
