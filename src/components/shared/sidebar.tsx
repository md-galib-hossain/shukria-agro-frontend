
import Link from "next/link";
import React from "react";
import { PiCowFill } from "react-icons/pi";
import { ImStatsDots } from "react-icons/im";
import { MdCategory } from "react-icons/md";
import { PiClockCountdownFill } from "react-icons/pi";
import { FaCow } from "react-icons/fa6";
import { BiSolidInjection } from "react-icons/bi";
import { SiHappycow } from "react-icons/si";

export default function Sidebar() {
  return (
    <aside className="hidden md:block h-screen w-[220px] lg:w-[280px] bg-muted/40 border-r sticky top-0">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
          <SiHappycow size={30} />
          <span className="">Sukria Agro <span className="text-xs text-gray-400">v {process.env.NEXT_PUBLIC_APP_VERSION}</span></span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground transition-all hover:text-primary"
            >
              <ImStatsDots size={20} />
              Dashboard
            </Link>
            <Link
              href="/cows"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground transition-all hover:text-primary"
            >
              <PiCowFill size={20} />
              Cows
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground transition-all hover:text-primary"
            >
              <MdCategory size={20} />
              Cow Categories
            </Link>
            <Link
              href="/lactations"
              className="flex items-center gap-3 rounded-lg focus:bg-muted  text-muted-foreground px-3 py-2  transition-all hover:text-primary"
            >
              <PiClockCountdownFill size={20} />
              Lactations
            </Link>
            <Link
              href="/pregnancy"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground transition-all hover:text-primary"
            >
              <FaCow size={20} />
              Pregnancy
            </Link>
            <Link
              href="/vaccines"
              className="flex items-center gap-3 rounded-lg px-3 py-2 focus:bg-muted  text-muted-foreground  transition-all hover:text-primary"
            >
              <BiSolidInjection size={20} />
              Vaccines
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
