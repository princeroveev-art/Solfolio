import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardContent } from "@/components/portfolio/DashboardContent";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10 pt-24 pb-16">
        <DashboardContent />
      </div>
    </main>
  );
}
