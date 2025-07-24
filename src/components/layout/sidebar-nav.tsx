
"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { FileText, FlaskConical, Briefcase, Wand2, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Campaña", icon: LayoutDashboard },
  { href: "/dashboard/landing-generator", label: "Landing AI", icon: Wand2 },
  { href: "/dashboard/builder", label: "Laboratorio", icon: FlaskConical },
  { href: "/dashboard/my-sites", label: "Mis Sitios", icon: Briefcase },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isDashboardPage = pathname === '/dashboard' || pathname === '/dashboard/campaign-generator';

  return (
    <SidebarMenu>
       <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Generador de Campañas"
            isActive={isDashboardPage}
          >
            <a href="/dashboard">
              <FileText />
              <span>Campaña</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      {navItems.slice(1).map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            tooltip={item.label}
            isActive={pathname.startsWith(item.href)}
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
