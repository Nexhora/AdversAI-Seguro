
"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { FileText, FlaskConical, Briefcase, Wand2 } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Campaña", icon: FileText },
  { href: "/dashboard/landing-generator", label: "Landing AI", icon: Wand2 },
  { href: "/dashboard/builder", label: "Laboratorio", icon: FlaskConical },
  { href: "/dashboard/my-sites", label: "Mis Sitios", icon: Briefcase },
];

export function SidebarNav() {
  const pathname = usePathname();

  // El generador de campañas ahora está en /dashboard, por lo que esta lógica
  // resalta correctamente el ícono de "Campaña".
  const isCampaignPage = pathname === '/dashboard' || pathname === '/dashboard/campaign-generator';

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            tooltip={item.label}
            isActive={pathname === item.href}
          >
            <a href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
