import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <aside className="hidden md:block h-screen w-[220px] lg:w-[280px] bg-muted/40 border-r sticky top-0">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Sukria Agro</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/cows"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Cows
            </Link>
            <Link
              href="/lactations"
              className="flex items-center gap-3 rounded-lg focus:bg-muted  text-muted-foreground px-3 py-2  transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Lactations
            </Link>
            <Link
              href="/pregnancy"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Pregnancy
            </Link>
            <Link
              href="/vaccines"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground  transition-all hover:text-primary"
            >
              <LineChart className="h-4 w-4" />
              Vaccines
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
