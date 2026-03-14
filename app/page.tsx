import { auth, signOut } from "@/auth";
import { DashboardClient } from "@/components/dashboard-client";
import { getDashboardData } from "@/lib/dashboard";
import { redirect } from "next/navigation";
import { LandingHero } from "@/components/landing-hero";

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    return <LandingHero />;
  }

  let dashboardData;
  try {
    dashboardData = await getDashboardData(session.user.id);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found.") {
      redirect("/api/auth/signout?callbackUrl=/");
    }
    throw error;
  }

  return (
    <main className="min-h-screen w-full bg-[#fdfdf9] text-black">
      {/* Header matching the new minimal desk aesthetic */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#e0e0e0] bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#D4F670] flex items-center justify-center font-bold text-lg border-2 border-black">
            {dashboardData.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">Studio Desk</p>
            <h1 className="text-xl font-bold tracking-tight">
              {dashboardData.userName.split(" ")[0]}&apos;s sketchboard
            </h1>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="px-4 py-2 text-sm font-semibold rounded-full border border-black hover:bg-gray-100 transition-colors" type="submit">
            Leave desk
          </button>
        </form>
      </header>

      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <DashboardClient data={dashboardData} />
      </div>
    </main>
  );
}
