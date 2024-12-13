import Link from "next/link";
import React from "react";
import { PiCowFill } from "react-icons/pi";
import { ImStatsDots } from "react-icons/im";
import { MdCategory } from "react-icons/md";
import { PiClockCountdownFill } from "react-icons/pi";
import { FaCow } from "react-icons/fa6";
import { BiSolidInjection } from "react-icons/bi";
import { SiHappycow } from "react-icons/si";
import { GiMilkCarton } from "react-icons/gi";

const links = [
  {
    href: "/",
    label: "Dashboard",
    icon: <ImStatsDots size={20} />,
  },
  {
    href: "/cows",
    label: "Cows",
    icon: <PiCowFill size={20} />,
  },
  {
    href: "/categories",
    label: "Cow Categories",
    icon: <MdCategory size={20} />,
  },
  {
    href: "/lactations",
    label: "Lactations",
    icon: <PiClockCountdownFill size={20} />,
  },
  {
    href: "/pregnancy",
    label: "Pregnancy",
    icon: <FaCow size={20} />,
  },
  {
    href: "/vaccines",
    label: "Vaccines",
    icon: <BiSolidInjection size={20} />,
  },
  {
    href: "/milk",
    label: "Milk",
    icon: <GiMilkCarton size={20} />,
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block h-screen w-[220px] lg:w-[280px] bg-secondary sticky top-0">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b-[0.1px] border-secondary-foreground px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <SiHappycow className="text-primary" size={30} />
            {/* <span className="text-primary">
              Sukria Agro{" "}
              <span className="text-xs text-gray-400">
                v {process.env.NEXT_PUBLIC_APP_VERSION}
              </span>
            </span> */}
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-8">
            {links.map(({ href, label, icon }) => (
              <div className="px-3 py-2 hover:bg-primary hover:text-primary-foreground focus:bg-muted rounded-md text-muted-foreground transition-all" key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 "
                >
                  {icon}
                  {label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
