import { useEffect, useMemo, useState } from "react";
import "./App.css";

function formatDate(d) {
  try {
    return new Date(d).toISOString().slice(0, 10);
  } catch {
    return String(d);
  }
}

function App() {
  const [prices, setPrices] = useState([]);
  const [events, setEvents] = useState([]);
  const [cp, setCp] = useState(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  // simple date range for display counts (frontend only)
  const [startDate, setStartDate] = useState("2014-01-01");
  const [endDate, setEndDate] = useState("2022-12-31");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/prices")
      .then((res) => res.json())
      .then((data) => {
        // Normalize date key for safety
        const cleaned = (data || []).map((row) => ({
          Date: row.Date,
          Price: row.Price,
        }));
        setPrices(cleaned);
      })
      .catch(console.error);

    fetch("http://127.0.0.1:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        const cleaned = (data || []).map((e) => ({
          ...e,
          event_date: e.event_date ? formatDate(e.event_date) : "",
        }));
        setEvents(cleaned);
      })
      .catch(console.error);

    fetch("http://127.0.0.1:5000/api/change-point")
      .then((res) => res.json())
      .then(setCp)
      .catch(console.error);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(events.map((e) => e.category).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [events]);

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter((e) => (category === "All" ? true : e.category === category))
      .filter((e) => {
        if (!q) return true;
        return (
          (e.event_name || "").toLowerCase().includes(q) ||
          (e.description || "").toLowerCase().includes(q) ||
          (e.expected_market_channel || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.event_date > b.event_date ? 1 : -1));
  }, [events, query, category]);

  const pricesInRange = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    return prices.filter((p) => {
      const d = new Date(p.Date);
      return d >= s && d <= e;
    });
  }, [prices, startDate, endDate]);

  return (
    <div className="page">
      <header className="header">
        <div>
          <h1>Brent Oil Dashboard</h1>
          <p className="sub">
            Track historical prices, key events, and detected change points.
          </p>
        </div>

        <div className="badge">
          <div className="badgeTitle">Detected Change Point</div>
          <div className="badgeValue">{cp?.tau_date || "—"}</div>
          <div className="badgeNote">{cp?.note || ""}</div>
        </div>
      </header>

      <div className="grid">
        <div className="card">
          <div className="cardTitle">Data Summary</div>
          <div className="kpis">
            <div className="kpi">
              <div className="kpiLabel">Total price records</div>
              <div className="kpiValue">{prices.length}</div>
            </div>
            <div className="kpi">
              <div className="kpiLabel">Records in range</div>
              <div className="kpiValue">{pricesInRange.length}</div>
            </div>
            <div className="kpi">
              <div className="kpiLabel">Key events</div>
              <div className="kpiValue">{events.length}</div>
            </div>
          </div>

          <div className="filters">
            <div className="field">
              <label>Start</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="field">
              <label>End</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="hint">
            Tip: this date range is for quick exploration (frontend filtering).
          </div>
        </div>

        <div className="card">
          <div className="cardTitle">Event Explorer</div>

          <div className="filters">
            <div className="field grow">
              <label>Search</label>
              <input
                placeholder="Search event name, description, channel…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="tableWrap">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 120 }}>Date</th>
                  <th>Event</th>
                  <th style={{ width: 170 }}>Category</th>
                  <th style={{ width: 260 }}>Market channel</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((e, i) => (
                  <tr key={i}>
                    <td className="mono">{e.event_date}</td>
                    <td>
                      <div className="eventName">{e.event_name}</div>
                      {e.description ? (
                        <div className="eventDesc">{e.description}</div>
                      ) : null}
                    </td>
                    <td>{e.category}</td>
                    <td>{e.expected_market_channel || "—"}</td>
                  </tr>
                ))}
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty">
                      No events match your filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="hint">
            Next upgrade (optional): add a price chart with event markers.
          </div>
        </div>
      </div>

      <footer className="footer">
        <span className="mono">API:</span> prices / events / change-point
      </footer>
    </div>
  );
}

export default App;
