import { prisma } from "@/lib/prisma";
import ClientPage from "./ClientPage";

export const revalidate = 0; // Disable cache so db updates reflect immediately

export default async function Home() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  const historyItems = await prisma.history.findMany({ orderBy: { year: "desc" } }); // Newest first for timeline
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  const certificates = await prisma.certificate.findMany({ orderBy: { createdAt: "desc" } });
  const socials = await prisma.social.findMany({ orderBy: { createdAt: "asc" } });
  const buttons = await prisma.actionButton.findMany({ orderBy: { order: "asc" } });
  
  return <ClientPage dbSkills={skills} dbHistory={historyItems} dbProjects={projects} dbCertificates={certificates} dbSocials={socials} dbButtons={buttons} />;
}
