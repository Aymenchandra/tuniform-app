"use client"

import * as React from "react"
import {
  Handshake,
} from "lucide-react"

import { NavMain } from "@/components/layout/shared/nav-main"
import {
  Sidebar,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  userNav: [
    {
      title: "Orders",
      url: "/orders",
      icon: Handshake,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  return (
    <Sidebar className="border-r-0" {...props}>
      <div className="flex justify-center items-center pt-2">
        <Image src="/img/tuniform-logo.png" width={150} height={150} alt="logo not found" priority={true}/>
      </div>
      <SidebarHeader>
        <SidebarGroupLabel>Explore</SidebarGroupLabel>
        <NavMain items={data.userNav} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  )
}
