import Link from "next/link";
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
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
      <header
        className="mb-8 flex flex-col gap-6 rounded-[var(--radius-xl)] border border-[var(--glass-border)] p-6 shadow-[var(--shadow-md)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(0,212,170,0.06), transparent 50%), var(--bg-secondary)",
          animation: "fadeInUp 0.5s ease-out",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-hover)] border border-[var(--glass-border)] text-xl font-bold text-[var(--accent)] shadow-[var(--shadow-glow)]">
            {dashboardData.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Workspace</p>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-strong)]">
              Hello, {dashboardData.userName.split(' ')[0]}
            </h1>
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="secondary-button" type="submit">
            Sign out
          </button>
        </form>
      </header>

      <DashboardClient data={dashboardData} />
    </main>
  );
}
