import React from "react";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";


export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Sukria Agro</span>
          </Link>
        </div>
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
   
      </SheetContent>
    </Sheet>
  );
}