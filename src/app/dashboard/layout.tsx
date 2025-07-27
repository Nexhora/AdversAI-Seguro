
"use client";

import * as React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { LogOut, MoreHorizontal } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const pageTitles: { [key: string]: string } = {
    '/dashboard': 'Panel de Control',
    '/dashboard/builder': 'Laboratorio de Páginas',
    '/dashboard/my-sites': 'Mis Sitios Guardados',
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const headerTitle = pageTitles[pathname] || 'Panel de Control';

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Cargando...</p>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <div className="group-data-[collapsed=icon]:-mt-8 group-data-[collapsed=icon]:opacity-0 duration-200">
              <h1 className="text-xl font-semibold font-headline leading-tight">Nexhora</h1>
              <p className="text-xs text-muted-foreground">AdversAI</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src={user.photoURL || `https://placehold.co/40x40.png`} alt="User Avatar" />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden group-data-[collapsed=icon]:-mt-8 group-data-[collapsed=icon]:opacity-0 duration-200">
                <p className="text-sm font-medium truncate">{user.displayName || 'Usuario'}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-40">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold font-headline flex-1">{headerTitle}</h2>
            <ThemeToggle />
        </header>
        <main className="flex-1 overflow-auto h-[calc(100vh-theme(spacing.14))]">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
