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
      <div className="p-4 pb-[90px] md:p-8 md:pb-8 max-w-7xl mx-auto mt-6">
        <DashboardClient data={dashboardData} />
      </div>
    </main>
  );
}
