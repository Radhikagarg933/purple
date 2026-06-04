export default function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { id: "dashboard", label: "Dashboard" },
    { id: "metrics", label: "Metrics" },
    { id: "funnel", label: "Funnel" },
    { id: "heatmap", label: "Heatmap" },
    { id: "anomalies", label: "Anomalies" },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">📊 Store Intelligence</h2>

      {menu.map((item) => (
        <div
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`nav-item ${activeTab === item.id ? "active" : ""}`}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}