import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SiHappycow } from "react-icons/si";
import { ImStatsDots } from "react-icons/im";
import { PiCowFill, PiClockCountdownFill } from "react-icons/pi";
import { MdCategory } from "react-icons/md";
import { FaCow } from "react-icons/fa6";
import { BiSolidInjection } from "react-icons/bi";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-[250px] sm:w-[300px] lg:w-[320px]"> {/* Adjust width here */}
        <nav className="grid gap-2 text-lg font-medium">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <SiHappycow className="h-6 w-6" />
              <span>Sukria Agro</span>
            </Link>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted text-muted-foreground transition-all hover:text-primary"
          >
            <ImStatsDots className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/cows"
            className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted text-muted-foreground transition-all hover:text-primary"
          >
            <PiCowFill className="h-4 w-4" />
            Cows
          </Link>
          <Link
            href="/categories"
            className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted text-muted-foreground transition-all hover:text-primary"
          >
            <MdCategory className="h-4 w-4" />
            Cow Categories
          </Link>
          <Link
            href="/lactations"
            className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted text-muted-foreground transition-all hover:text-primary"
          >
            <PiClockCountdownFill className="h-4 w-4" />
            Lactations
          </Link>
          <Link
            href="/pregnancy"
            className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted text-muted-foreground transition-all hover:text-primary"
          >
            <FaCow className="h-4 w-4" />
            Pregnancy
          </Link>
          <Link
            href="/vaccines"
            className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted text-muted-foreground transition-all hover:text-primary"
          >
            <BiSolidInjection className="h-4 w-4" />
            Vaccines
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
