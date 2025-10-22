import React, { useEffect, useMemo, useState } from "react";
const API = import.meta.env.VITE_API || "http://localhost:8080";

type Metrics = {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  ordersByStatus: { status: string; count: number }[];
};

export default function App() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [perf, setPerf] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function loadAll() {
    try {
      const [m, p] = await Promise.all([
        fetch(`${API}/api/analytics/dashboard-metrics`).then(r => r.json()),
        fetch(`${API}/api/dashboard/performance`).then(r => r.json()),
      ]);
      setMetrics(m);
      setPerf(p);
      setErr(null);
    } catch (e: any) {
      setErr(e?.message || "Failed to load");
    }
  }

  useEffect(() => {
    loadAll();
    const id = setInterval(loadAll, 5000); // refresh every 5s
    return () => clearInterval(id);
  }, []);

  const statusText = useMemo(
    () => metrics?.ordersByStatus?.map(s => `${s.status}: ${s.count}`).join(" • "),
    [metrics]
  );

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: 18 }}>
      <h1>Week 5 — Admin Dashboard</h1>
      <p style={{ opacity: 0.7 }}>API: {API}</p>
      {err && <p style={{ color: "crimson" }}>Error: {err}</p>}

      {!metrics ? (
        <p>Loading…</p>
      ) : (
        <>
          <Grid>
            <Card title="Total Revenue">${metrics.totalRevenue.toFixed(2)}</Card>
            <Card title="Total Orders">{metrics.totalOrders}</Card>
            <Card title="Avg Order Value">${metrics.avgOrderValue.toFixed(2)}</Card>
          </Grid>

          <section style={{ marginTop: 16 }}>
            <Card title="Orders by Status">{statusText || "—"}</Card>
          </section>

          <section style={{ marginTop: 16 }}>
            <Card title="Performance (latest)">
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {JSON.stringify(perf || {}, null, 2)}
              </pre>
            </Card>
          </section>

          <section style={{ marginTop: 16 }}>
            <OpenStream />
          </section>
        </>
      )}
    </main>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0,1fr))",
        gap: 12,
        marginTop: 12,
      }}
    >
      {children}
    </section>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        background: "white",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>{title}</div>
      <div style={{ fontSize: 22, marginTop: 6 }}>{children}</div>
    </div>
  );
}

function OpenStream() {
  const [orderId, setOrderId] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  function open() {
    if (!orderId) return;
    const es = new EventSource(`${API}/api/orders/${orderId}/stream`);
    es.addEventListener("status", (e) =>
      setLines((prev) => [...prev, (e as MessageEvent).data as string])
    );
    es.onerror = () => es.close();
  }
  return (
    <Card title="Order Status Stream (SSE)">
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Paste ORDER _id here"
          style={{
            flex: 1,
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            padding: "8px 10px",
          }}
        />
        <button onClick={open} style={{ padding: "8px 12px" }}>
          Open Stream
        </button>
      </div>
      <pre style={{ margin: 0, maxHeight: 220, overflow: "auto" }}>
        {lines.join("\n")}
      </pre>
    </Card>
  );
}
