"use client";

import { GrindScoreData } from "@/lib/grindScore";
import { useEffect, useRef } from "react";

interface GrindScoreCardProps {
  data: GrindScoreData;
}

export function GrindScoreCard({ data }: GrindScoreCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 160;
    canvas.width = size;
    canvas.height = size;

    const cx = size / 2;
    const cy = size / 2;
    const radius = 60;
    const startAngle = -Math.PI * 0.75;
    const endAngle = Math.PI * 0.75;
    const progress = data.score / 100;

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    const progressAngle = startAngle + (endAngle - startAngle) * progress;
    // 2-hue gradient — teal to blue, within 40deg
    const gradient = ctx.createLinearGradient(0, 0, size, 0);
    gradient.addColorStop(0, "hsl(173, 80%, 44%)");
    gradient.addColorStop(1, "hsl(210, 80%, 60%)");

    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, progressAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 30px Syne, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.score.toString(), cx, cy - 8);

    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "11px DM Sans, system-ui, sans-serif";
    ctx.fillText("/ 100", cx, cy + 16);
  }, [data]);

  return (
    <div
      className="card"
      style={{ borderRadius: "var(--radius-lg)", overflow: "hidden" }}
    >
      {/* Card header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-brand)">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 700,
            fontSize: "var(--text-sm)",
            color: "var(--color-text-primary)",
          }}
        >
          Grind Score
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: "var(--text-xs)",
            color: "var(--color-text-muted)",
          }}
        >
          On-chain reputation
        </span>
      </div>

      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Gauge */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <canvas ref={canvasRef} style={{ width: 160, height: 160 }} />
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--text-xs)",
              fontWeight: 700,
              background: `${data.color}18`,
              color: data.color,
              border: `1px solid ${data.color}35`,
              letterSpacing: "0.04em",
            }}
          >
            {data.tier}
          </span>
        </div>

        {/* Breakdown bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {data.breakdown.map((item) => (
            <div key={item.label}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-xs)" }}>
                  {item.label}
                </span>
                <span
                  style={{
                    color: "var(--color-text-secondary)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 600,
                  }}
                >
                  {item.score}/{item.weight}
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${(item.score / item.weight) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        {data.badges.length > 0 && (
          <div>
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "var(--text-xs)",
                marginBottom: "8px",
                fontWeight: 500,
              }}
            >
              Earned Badges
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {data.badges.map((badge) => (
                <span key={badge} className="tag-muted">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
