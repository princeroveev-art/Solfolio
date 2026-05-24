import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { DashboardContent } from "@/components/portfolio/DashboardContent";

export default function DashboardPage() {
  return (
    <main className="sf-shell">
      <div className="sf-bg-glow" />
      <DashboardSidebar />
      <section className="sf-content-wrap">
        <DashboardContent />
      </section>
    </main>
  );
}
