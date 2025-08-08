"use client";

import Image from "next/image";
import { Bell } from "lucide-react";

export default function DashboardNavbar({ user }) {
  return (
    <div className="flex justify-between items-center h-16 bg-[#C9E1E5] px-6 shadow">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Image
          src="/icons/smilecheck.png"
          alt="SmileCheck Logo"
          width={180}
          height={180}
          className="mx-2 my-4"
        />
      </div>

      {/* Right-side: Bell + User Avatar */}
      <div className="flex items-center gap-4">
        <Bell className="w-8 h-8 text-[#0B869F] bg-white p-2 rounded-full shadow" />
        <div className="flex items-center gap-2">
          {user?.image && (
            <img
              src={user.image}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
