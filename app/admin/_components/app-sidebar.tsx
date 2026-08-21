"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { ChevronRight, LayoutDashboard, Package,ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth/logout";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function AppSidebar() {
    const { isMobile, toggleSidebar, openMobile } = useSidebar()
    const pathname = usePathname();
    
    const onClick = () => {
        logout();
    }
    
    return (
        <>
            {isMobile && (
                <div className="p-4 bg-gray-100 z-50 fixed top-0 left-0 right-0">
                    <p>Trạng thái: {openMobile ? "Mở" : "Đóng"}</p>
                    <button 
                        onClick={toggleSidebar}
                        className="bg-slate-900 text-white px-4 py-2 mt-2 rounded"
                    >
                        Đóng/Mở Sidebar
                    </button>
                </div>
            )}
        
            <Sidebar>
                <SidebarHeader>
                    <p className="p-2 font-bold text-xl">
                        NAB Coffee & Tea
                    </p>
                </SidebarHeader>

                <SidebarContent>
                    {/* START LAYOUT: DASHBOARD GROUP */}
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                                    <Link href="/admin/dashboard">
                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                        <span className="text-lg">Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    {/* END LAYOUT: DASHBOARD GROUP */}

                    {/* START LAYOUT PRODUCTS GROUP */}
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <Collapsible className="group/collapsible" defaultOpen={pathname.startsWith("/admin/products")}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton isActive={pathname.startsWith("/admin/products")}>
                                                <Package className="w-4 h-4 mr-2" />
                                                <span className="text-lg">Products</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/products/all"}>
                                                        <Link href="/admin/products/all">
                                                            <span className="text-base">All Products</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>

                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/products/add"}>
                                                        <Link href="/admin/products/add">
                                                            <span className="text-base">Add Product</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>

                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton asChild isActive={pathname === "/admin/products/categories"}>
                                                        <Link href="/admin/categories">
                                                            <span className="text-base">Categories</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>

                                    </Collapsible>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    {/* END LAYOUT: PRODUCT */}

                    {/* START LAYOUT: ORDER */}
                    <SidebarGroup>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <Collapsible className="group/collapsible" defaultOpen={pathname.startsWith("/admin/products")}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton isActive={pathname.startsWith("/admin/products")}>
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                <span className="text-lg">Orders</span>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                    </Collapsible>
                                </SidebarMenuItem>
                            </SidebarMenu>
                    </SidebarGroup>
                    {/* END LAYOUT: ORDERS */}

                    {/* START LAYOUT: USER */}
                    <SidebarGroup>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <Collapsible className="group/collapsible" >
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton asChild isActive={pathname.startsWith("/admin/user")}>
                                            <Link href="/admin/user">
                                                <User className="w-4 h-4 mr-2" />
                                                <span className="text-lg">User</span>
                                            </Link>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                    </Collapsible>
                                </SidebarMenuItem>
                            </SidebarMenu>
                    </SidebarGroup>
                    {/* END LAYOUT: USER */}
                </SidebarContent>

                <SidebarFooter>
                    <Button onClick={onClick}>
                        Log out
                    </Button>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}