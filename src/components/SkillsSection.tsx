"use client";

import { motion } from "framer-motion";

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

type Skill = { id: string; name: string; icon: string; };

export default function SkillsSection({ dbSkills = [] }: { dbSkills?: Skill[] }) {
  return (
    <div className="w-full flex flex-col gap-10 font-sans">
      
      {/* Key Skills */}
      <div className="flex flex-col gap-6">
        <h4 className="text-[var(--color-terminal-green)] font-mono text-base font-bold drop-shadow-[0_0_2px_rgba(0,255,65,0.4)]">
          key_skills[]
        </h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {dbSkills.length > 0 ? (
            dbSkills.map((skill, idx) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#0f1115] border border-zinc-800 hover:border-[var(--color-terminal-green)] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] rounded-lg p-4 flex items-center gap-3 transition-all duration-300 cursor-default group"
              >
                <i className={`${skill.icon} text-lg text-zinc-300 group-hover:text-[var(--color-terminal-green)] transition-colors duration-300`} />
                <span className="text-sm font-medium text-zinc-300 font-mono tracking-tight group-hover:text-white transition-colors duration-300">{skill.name}</span>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-zinc-500 italic text-sm">
              No skills added yet. Configure via /admin
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
