// app/dashboard/page.js
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-bold text-[#0B869F]">Dashboard</h1>
        <p className="text-gray-600">Welcome, <strong>{session.user.name}</strong></p>
        <p className="text-gray-500 text-sm">{session.user.email}</p>

        {session.user.image && (
          <img
            src={session.user.image}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mx-auto border mt-4"
          />
        )}

        <SignOutButton />
      </div>
    </div>
  );
}
