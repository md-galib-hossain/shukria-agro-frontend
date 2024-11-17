import MobileNav from "@/components/shared/mobile-nav";
import Sidebar from "@/components/shared/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-third">
      <Sidebar />
      <div className="flex flex-col p-5">
        <MobileNav />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
