
"use client";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { FileText, FlaskConical, Briefcase, Wand2 } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard/campaign-generator", label: "Campaña", icon: FileText },
  { href: "/dashboard/landing-generator", label: "Landing AI", icon: Wand2 },
  { href: "/dashboard/builder", label: "Laboratorio", icon: FlaskConical },
  { href: "/dashboard/my-sites", label: "Mis Sitios", icon: Briefcase },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            tooltip={item.label}
            isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard' || pathname === '/dashboard/campaign-generator')}
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
