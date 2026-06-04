import { useEffect, useState } from "react";

export default function Metrics() {
  const [data, setData] = useState({
    visitors: 1200,
    entries: 800,
    exits: 300,
    conversion: 66.7,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        visitors: prev.visitors + Math.floor(Math.random() * 10),
        entries: prev.entries + Math.floor(Math.random() * 5),
        exits: prev.exits + Math.floor(Math.random() * 3),
        conversion: ((prev.entries / prev.visitors) * 100).toFixed(1),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    { label: "Visitors", value: data.visitors },
    { label: "Entries", value: data.entries },
    { label: "Exits", value: data.exits },
    { label: "Conversion %", value: data.conversion + "%" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px",
        marginBottom: "20px",
      }}
    >
      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            background: "#1f2937",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #374151",
            textAlign: "center",
            minHeight: "100px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              marginBottom: "10px",
              fontSize: "14px",
            }}
          >
            {c.label}
          </p>

          <h2
            style={{
              fontSize: "32px",
              margin: 0,
            }}
          >
            {c.value}
          </h2>
        </div>
      ))}
    </div>
  );
}