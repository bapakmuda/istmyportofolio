const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const skills = [
    { name: "Linux", icon: "devicon-linux-plain" },
    { name: "Windows", icon: "devicon-windows11-original" },
    { name: "Docker", icon: "devicon-docker-plain" },
    { name: "Proxmox", icon: "fa-solid fa-server" },
    { name: "Cloudflare", icon: "devicon-cloudflare-plain" },
    { name: "GCP", icon: "devicon-googlecloud-plain" },
    { name: "Grafana", icon: "devicon-grafana-plain" },
    { name: "Prometheus", icon: "devicon-prometheus-original" },
    { name: "Zabbix", icon: "fa-solid fa-chart-line" },
    { name: "Wazuh SIEM", icon: "fa-solid fa-shield-halved" },
    { name: "Python", icon: "devicon-python-plain" },
    { name: "Bash", icon: "devicon-bash-plain" },
    { name: "PowerShell", icon: "devicon-powershell-plain" },
    { name: "TCP/IP", icon: "fa-solid fa-network-wired" },
    { name: "Tailscale", icon: "fa-solid fa-lock" },
    { name: "NMAP", icon: "fa-solid fa-crosshairs" },
    { name: "Burp Suite", icon: "fa-solid fa-spider" },
    { name: "Wireshark", icon: "fa-solid fa-water" },
  ];
  for (const s of skills) {
    await prisma.skill.create({ data: s });
  }
  console.log("Seeded skills!");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
