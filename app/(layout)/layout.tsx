
import type { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/shared/app-sidebar";
import { Card } from "@/components/ui/card";
import { AppNavbar } from "@/components/layout/shared/app-navbar";


export const metadata: Metadata = {
  title: "Dasbhoard",
  description: "Dashboard",
};

export default async function dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppNavbar />
          <div className="flex flex-1 flex-col px-4 py-6 bg-slate-300">
            <div className="max-w-screen-2xl">
              <div className="mx-auto max-w-242.5">
                <Card className="rounded-sm border border">
                  <div className="px-4 pb-6 lg:pb-8 xl:pb-11.5">
                    {children}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
}
