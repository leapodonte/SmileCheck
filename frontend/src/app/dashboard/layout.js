import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  return (
    <div className="relative min-h-screen bg-[#F9FAFB]">
      {/* Full-width fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <DashboardNavbar user={session.user} />
      </div>

    <div className="flex pt-16 h-182">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>

    </div>
  );
}
