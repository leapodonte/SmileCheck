"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Home,
  History,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/history", label: "Check History", icon: History },
  { href: "/dashboard/reminder", label: "Daily Reminder", icon: Bell },
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/signin");
  };

  return (
    <div className="w-64 h-full bg-gradient-to-b from-[#EFEFEF] to-[#0B869F]/40 p-4 flex flex-col justify-between">
      <ul className="flex flex-col items-center space-y-4 w-full">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <li key={link.href} className="relative w-full flex justify-center">
              {isActive && (
                <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#0B869F] rounded-r-md" />
              )}
              <Link
                href={link.href}
                className={`flex items-center gap-3 p-2 pl-4 w-11/12 rounded-md transition-all justify-start ${
                  isActive
                    ? "text-[#0B869F] font-medium"
                    : "text-gray-500 hover:text-[#0B869F] hover:font-medium"
                }`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="relative w-full flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 pl-4 w-11/12 rounded-md text-gray-500 hover:text-[#0B869F] hover:font-medium transition-all justify-start"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}