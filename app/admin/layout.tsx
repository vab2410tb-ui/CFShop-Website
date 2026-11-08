import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/admin/_components/app-sidebar"
import { Toaster } from "sonner";

interface SideBarProp {
    children: React.ReactNode
}

export default function AdminLayout({ children }: SideBarProp) {
  return (
    <SidebarProvider>
        <AppSidebar/>    
        <main className="flex-1 w-full">
            <SidebarTrigger />
            <Toaster richColors position="bottom-right" />
            {children}
        </main>
    </SidebarProvider>
  )
}