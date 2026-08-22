"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/sidebar";
import AppHeader from "@/components/appheader";

export default function LayoutDashBoard({ children }: { children: ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <main className="h-screen overflow-hidden bg-background">
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <div
        className={[
          "flex h-screen flex-col transition-[margin] duration-300",
          sidebarCollapsed ? "md:ml-20" : "md:ml-72",
        ].join(" ")}
      >
        {/* Header fixo */}
        <AppHeader
          onMenuClick={() => setMobileSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <section className="flex-1 overflow-y-auto pt-10 md:pt-5 pb-20  md:pb-3">
          <div className="p-4">{children}</div>
        </section>
      </div>
    </main>
  );
}
