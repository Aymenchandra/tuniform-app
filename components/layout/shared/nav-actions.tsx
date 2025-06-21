"use client"

import * as React from "react"
import {
  House,
  ScreenShareOff,
  Settings2,
  Star,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import Image from "next/image"

const data = [
  [
    {
      label: "Home",
      icon: House,
      url: '/'
    },
  ]
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()

  const avatarAction = async (url: string) => {
    router.push(url)
    setIsOpen(false)
  }

  React.useEffect(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star />
      </Button>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
          >
            <Image className="w-10 h-10 rounded-full" src={"/img/default-avatar.png"} width={200} height={200} alt="avatar not found" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              <div className="flex items-center gap-4 p-4">
                <Image className="w-10 h-10 rounded-full" src={"/img/default-avatar.png"} width={200} height={200} alt="avatar not found" />
                <div className="font-medium">
                  <div>username</div>
                  <div className="text-xs text-gray-500">Role</div>
                </div>
              </div>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton onClick={() => avatarAction(item.url)}>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>

    </div>
  )
}
