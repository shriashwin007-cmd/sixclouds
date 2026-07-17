"use client";
import { useEffect, useState, useCallback } from "react";
import { BEVERAGES, SNACKS } from "@/app/components/addonsData";

const ALL_ITEMS = [...BEVERAGES, ...SNACKS];
const STATUS_COLORS: Record<string, string> = {
  pending: "#FFD700", confirmed: "#39FF14", completed: "#888", cancelled: "#ff4d4d",
};

type Booking = {
  id: number; name: string; phone: string; date: string; session: string;
  room: string; players: string; note: string; addons: string;
  total: number; status: string; created_at: string;
};

type Override = { item_id: string; out_of_stock: boolean; hidden: boolean };

const PASS_KEY = "1234";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [menuOverrides, setMenuOverrides] = useState<Override[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<"list" | "schedule" | "menu">("list");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const authHeader = { Authorization: `Bearer ${PASS_KEY}` };

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const r = await fetch("/api/admin/bookings", { headers: authHeader });
    const d = await r.json();
    setBookings(d.bookings ?? []);
    setLoading(false);
  }, []);

  const fetchMenu = useCallback(async () => {
    const r = await fetch("/api/admin/menu");
    const d = await r.json();
    setMenuOverrides(d.overrides ?? []);
  }, []);

  useEffect(() => {
    if (authed) { fetchBookings(); fetchMenu(); }
  }, [authed, fetchBookings, fetchMenu]);

  function login() {
    if (pw === PASS_KEY) { setAuthed(true); setPwError(false); }
    else { setPwError(true); }
  }

  async function updateStatus(id: number, status: string) {
    await fetch("/api/admin/bookings", { method: "PATCH", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify({ id, status }) });
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
  }

  async function deleteBooking(id: number, name: string) {
    if (!confirm(`Delete booking for ${name}?`)) return;
    await fetch("/api/admin/bookings", { method: "DELETE", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify({ id }) });
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  async function toggleMenuField(item_id: string, field: "out_of_stock" | "hidden", currentValue: boolean) {
    const value = !currentValue;
    await fetch("/api/admin/menu", { method: "PATCH", headers: { "Content-Type": "application/json", ...authHeader }, body: JSON.stringify({ item_id, field, value }) });
    setMenuOverrides((prev) => {
      const existing = prev.find((o) => o.item_id === item_id);
      if (existing) return prev.map((o) => o.item_id === item_id ? { ...o, [field]: value } : o);
      return [...prev, { item_id, out_of_stock: false, hidden: false, [field]: value }];
    });
  }

  const getOverride = (id: string) => menuOverrides.find((o) => o.item_id === id) ?? { item_id: id, out_of_stock: false, hidden: false };

  // Stats
  const today = new Date().toISOString().slice(0, 10);
  const todayBookings = bookings.filter((b) => b.date === today);
  const todayRevenue = todayBookings.reduce((s, b) => s + (b.total || 0), 0);
  const pending = bookings.filter((b) => b.status === "pending").length;
  const confirmed = bookings.filter((b) => b.status === "confirmed").length;

  // Filtered
  let filtered = bookings;
  if (search) filtered = filtered.filter((b) => b.name?.toLowerCase().includes(search.toLowerCase()) || b.phone?.includes(search));
  if (dateFilter) filtered = filtered.filter((b) => b.date === dateFilter);
  if (statusFilter !== "all") filtered = filtered.filter((b) => b.status === statusFilter);

  // Schedule (group by date)
  const byDate: Record<string, Booking[]> = {};
  bookings.forEach((b) => { if (!byDate[b.date]) byDate[b.date] = []; byDate[b.date].push(b); });

  const inputStyle: React.CSSProperties = {
    padding: "10px 14px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,215,0,0.2)", color: "#F0F0F0",
    fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", outline: "none",
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100svh", background: "#050505", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "min(380px, 90vw)", background: "#0a0a0a", border: "1px solid rgba(255,215,0,0.2)", padding: "40px 32px" }}>
          <div className="pixel" style={{ fontSize: "0.65rem", color: "#FFD700", marginBottom: 8, textAlign: "center" }}>LEVELUP GAMING</div>
          <div className="pixel" style={{ fontSize: "0.55rem", color: "rgba(240,240,240,0.5)", marginBottom: 32, textAlign: "center", lineHeight: 1.8 }}>ADMIN PANEL</div>
          <input
            type="password" placeholder="Enter password" value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={{ ...inputStyle, width: "100%", marginBottom: 12 }}
          />
          {pwError && <p className="mono" style={{ color: "#ff4d4d", fontSize: "0.7rem", marginBottom: 12 }}>❌ Wrong password</p>}
          <button onClick={login} className="pixel-btn" style={{ width: "100%", fontSize: "0.5rem", padding: "14px" }}>
            LOGIN →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100svh", background: "#050505", padding: "24px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div className="pixel" style={{ fontSize: "0.7rem", color: "#FFD700" }}>⚙ LEVELUP GAMING ADMIN</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={fetchBookings} style={{ ...inputStyle, cursor: "pointer" }}>↻ Refresh</button>
            <button onClick={() => setAuthed(false)} style={{ ...inputStyle, cursor: "pointer", color: "#ff4d4d" }}>Logout</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "TOTAL BOOKINGS", value: bookings.length },
            { label: "TODAY'S BOOKINGS", value: todayBookings.length },
            { label: "TODAY'S REVENUE", value: `₹${todayRevenue}` },
            { label: "PENDING", value: pending },
            { label: "CONFIRMED", value: confirmed },
            { label: "MENU ITEMS", value: ALL_ITEMS.length },
          ].map((s) => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,215,0,0.15)", padding: "16px 18px" }}>
              <div className="mono" style={{ fontSize: "0.6rem", color: "rgba(240,240,240,0.4)", letterSpacing: "0.1em", marginBottom: 8 }}>{s.label}</div>
              <div className="pixel" style={{ fontSize: "1rem", color: "#FFD700" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid rgba(255,215,0,0.15)" }}>
          {(["list", "schedule", "menu"] as const).map((tab) => (
            <button key={tab} onClick={() => setView(tab)} style={{
              padding: "10px 24px", background: view === tab ? "rgba(255,215,0,0.1)" : "none",
              border: "none", borderBottom: view === tab ? "2px solid #FFD700" : "2px solid transparent",
              color: view === tab ? "#FFD700" : "rgba(240,240,240,0.5)",
              fontFamily: "'Press Start 2P', monospace", fontSize: "0.5rem", cursor: "pointer",
              textTransform: "uppercase",
            }}>
              {tab === "list" ? "📋 Bookings" : tab === "schedule" ? "📅 Schedule" : "🍟 Menu"}
            </button>
          ))}
        </div>

        {/* === BOOKINGS LIST === */}
        {view === "list" && (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              <input placeholder="Search name / phone..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStyle, flex: 1, minWidth: 200 }} />
              <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={{ ...inputStyle }} />
              <button onClick={() => setDateFilter(today)} style={{ ...inputStyle, cursor: "pointer", color: "#FFD700", border: "1px solid rgba(255,215,0,0.4)" }}>Today</button>
              <button onClick={() => { setSearch(""); setDateFilter(""); setStatusFilter("all"); }} style={{ ...inputStyle, cursor: "pointer" }}>Clear</button>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            {loading ? (
              <p className="pixel" style={{ color: "rgba(240,240,240,0.4)", fontSize: "0.55rem" }}>LOADING...</p>
            ) : filtered.length === 0 ? (
              <p className="mono" style={{ color: "rgba(240,240,240,0.4)", padding: "40px 0", textAlign: "center" }}>No bookings found.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.map((b) => (
                  <div key={b.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,215,0,0.1)", padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 14 }}>
                      <div>
                        <span className="pixel" style={{ fontSize: "0.6rem", color: "#FFD700" }}>{b.name}</span>
                        <span className="mono" style={{ color: "rgba(240,240,240,0.5)", fontSize: "0.75rem", marginLeft: 16 }}>{b.phone}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ background: STATUS_COLORS[b.status] ?? "#888", color: "#050505", fontFamily: "'Press Start 2P', monospace", fontSize: "0.45rem", padding: "4px 10px" }}>
                          {b.status?.toUpperCase()}
                        </span>
                        <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)} style={{ ...inputStyle, padding: "4px 8px", fontSize: "0.72rem" }}>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button onClick={() => deleteBooking(b.id, b.name)} style={{ background: "rgba(255,45,45,0.1)", border: "1px solid rgba(255,45,45,0.3)", color: "#ff4d4d", padding: "4px 10px", cursor: "pointer", fontSize: "0.9rem" }}>🗑</button>
                      </div>
                    </div>
                    <div className="mono" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "6px 20px", fontSize: "0.72rem", color: "rgba(240,240,240,0.6)" }}>
                      <span>📅 {b.date}</span>
                      <span>⏱ {b.session}</span>
                      <span>🔒 {b.room}</span>
                      <span>👥 {b.players}</span>
                      {b.total > 0 && <span>💰 ₹{b.total}</span>}
                      {b.note && <span style={{ gridColumn: "1 / -1" }}>📝 {b.note}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* === SCHEDULE === */}
        {view === "schedule" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {Object.keys(byDate).sort().map((date) => (
              <div key={date}>
                <div className="pixel" style={{ fontSize: "0.55rem", color: "#FFD700", marginBottom: 12, padding: "8px 0", borderBottom: "1px solid rgba(255,215,0,0.15)" }}>
                  📅 {date} — {byDate[date].length} booking{byDate[date].length > 1 ? "s" : ""}
                  {date === today && <span style={{ marginLeft: 12, color: "#39FF14" }}>← TODAY</span>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {byDate[date].map((b) => (
                    <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,215,0,0.1)", padding: "12px 16px", flexWrap: "wrap" }}>
                      <span className="pixel" style={{ fontSize: "0.5rem", color: "#FFD700", minWidth: 120 }}>{b.name}</span>
                      <span className="mono" style={{ color: "rgba(240,240,240,0.6)", fontSize: "0.75rem" }}>{b.session}</span>
                      <span className="mono" style={{ color: "rgba(240,240,240,0.5)", fontSize: "0.72rem" }}>{b.room}</span>
                      <span style={{ marginLeft: "auto", background: STATUS_COLORS[b.status] ?? "#888", color: "#050505", fontFamily: "'Press Start 2P', monospace", fontSize: "0.4rem", padding: "3px 8px" }}>
                        {b.status?.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(byDate).length === 0 && <p className="mono" style={{ color: "rgba(240,240,240,0.4)", textAlign: "center", padding: "40px 0" }}>No bookings yet.</p>}
          </div>
        )}

        {/* === MENU MANAGEMENT === */}
        {view === "menu" && (
          <div>
            {["Beverages", "Snacks"].map((cat) => {
              const items = cat === "Beverages" ? BEVERAGES : SNACKS;
              return (
                <div key={cat} style={{ marginBottom: 36 }}>
                  <div className="pixel" style={{ fontSize: "0.55rem", color: "#FFD700", marginBottom: 16 }}>{cat === "Beverages" ? "🥤" : "🍟"} {cat.toUpperCase()}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map((item) => {
                      const ov = getOverride(item.id);
                      return (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, background: ov.hidden ? "rgba(255,45,45,0.05)" : "rgba(255,255,255,0.03)", border: `1px solid ${ov.hidden ? "rgba(255,45,45,0.2)" : "rgba(255,215,0,0.1)"}`, padding: "12px 16px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                          <span className="mono" style={{ flex: 1, fontSize: "0.8rem", color: ov.hidden ? "rgba(240,240,240,0.3)" : "#F0F0F0" }}>{item.name}</span>
                          <span className="pixel" style={{ fontSize: "0.5rem", color: "#FFD700", marginRight: 8 }}>{item.label}</span>
                          <button
                            onClick={() => toggleMenuField(item.id, "out_of_stock", ov.out_of_stock)}
                            style={{
                              padding: "6px 14px", cursor: "pointer", border: "1px solid",
                              fontFamily: "'Press Start 2P', monospace", fontSize: "0.42rem",
                              background: ov.out_of_stock ? "rgba(255,45,45,0.15)" : "rgba(57,255,20,0.1)",
                              borderColor: ov.out_of_stock ? "rgba(255,45,45,0.4)" : "rgba(57,255,20,0.4)",
                              color: ov.out_of_stock ? "#ff4d4d" : "#39FF14",
                            }}
                          >
                            {ov.out_of_stock ? "OUT OF STOCK" : "IN STOCK"}
                          </button>
                          <button
                            onClick={() => toggleMenuField(item.id, "hidden", ov.hidden)}
                            style={{
                              padding: "6px 14px", cursor: "pointer", border: "1px solid",
                              fontFamily: "'Press Start 2P', monospace", fontSize: "0.42rem",
                              background: ov.hidden ? "rgba(255,45,45,0.15)" : "rgba(255,255,255,0.05)",
                              borderColor: ov.hidden ? "rgba(255,45,45,0.4)" : "rgba(255,255,255,0.15)",
                              color: ov.hidden ? "#ff4d4d" : "rgba(240,240,240,0.6)",
                            }}
                          >
                            {ov.hidden ? "HIDDEN" : "VISIBLE"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
