import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/admin/_components/app-sidebar"


interface SideBarProp {
    children: React.ReactNode
}

export default function AdminLayout({ children }: SideBarProp) {
  return (
    <SidebarProvider>
        <AppSidebar/>    
        <main className="flex-1 w-full">
            <SidebarTrigger />
            {children}
        </main>
    </SidebarProvider>
  )
}