"use client";
import { AgentReport } from "@/lib/agentEngine";

interface AgentOpsPanelProps { report: AgentReport; loading: boolean; }

export function AgentOpsPanel({ report, loading }: AgentOpsPanelProps) {
  return (
    <section className="card p-0 overflow-hidden">
      <header className="px-6 py-4 border-b" style={{ borderColor: "var(--color-border)", background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)" }}>
        <div className="flex items-center justify-between gap-2">
          <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "15px", fontWeight: 700 }}>AI Operations Center</h3>
          <span className="tag">Autonomous</span>
        </div>
        <p style={{ color: "var(--color-text-muted)", fontSize: "12px", marginTop: 6 }}>Real-time portfolio risk intelligence and execution queue.</p>
      </header>
      <div className="p-6 space-y-4">
        {loading ? <div className="skeleton" style={{ height: 220 }} /> : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="card p-3"><p className="text-xs text-gray-400">Risk Score</p><p className="stat-value">{report.riskScore}</p></div>
              <div className="card p-3"><p className="text-xs text-gray-400">Health Score</p><p className="stat-value">{report.healthScore}</p></div>
            </div>
            <div>
              <p className="text-xs mb-2" style={{ color: "var(--color-text-muted)" }}>Risk Findings</p>
              {report.concentrationWarnings.length ? report.concentrationWarnings.map((w)=><div key={w} className="tag-muted mb-2" style={{display:'block'}}>{w}</div>) : <p className="text-xs" style={{color:'var(--color-success)'}}>No concentration risks detected. Allocation profile is healthy.</p>}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
