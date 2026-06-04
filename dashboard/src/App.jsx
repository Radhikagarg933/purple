  import { useEffect, useRef, useState } from "react";

/* ─── helpers ─────────────────────────────────────────── */
const fmt    = n => n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n);
const fmtCur = n => "₹" + (n >= 100000 ? (n / 100000).toFixed(1) + "L" : (n / 1000).toFixed(1) + "k");
const clamp  = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rand   = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;

/* ─── per-store seed so each store looks different ──────── */
function storeSeed(storeId) {
  let h = 0;
  for (let i = 0; i < storeId.length; i++) h = (Math.imul(31, h) + storeId.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function seededRand(seed, lo, hi) {
  const x = Math.sin(seed) * 10000;
  return lo + Math.floor((x - Math.floor(x)) * (hi - lo + 1));
}

/* ─── global CSS ────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%;width:100%;overflow:hidden;background:#060c18;font-family:Inter,Arial,sans-serif;color:#e2e8f0}
@keyframes pulse  {0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.85)}}
@keyframes fadeUp {from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
.pulse{animation:pulse 1.4s ease-in-out infinite}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#1e2d47;border-radius:2px}
.store-select{background:#0b1325;border:1px solid rgba(255,255,255,.14);color:#e2e8f0;border-radius:8px;
  padding:5px 28px 5px 10px;font-size:12px;font-family:Inter,sans-serif;font-weight:600;cursor:pointer;
  outline:none;appearance:none;-webkit-appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 8px center;transition:border-color .2s}
.store-select:hover{border-color:rgba(96,165,250,.4)}
.store-select option{background:#0b1325}
.ev-row{animation:slideIn .25s ease forwards;border-bottom:1px solid rgba(255,255,255,.04)}
.ev-row:last-child{border-bottom:none}
.filter-btn{background:transparent;border:1px solid rgba(255,255,255,.1);color:#64748b;border-radius:20px;
  padding:4px 12px;font-size:11px;font-family:Inter,sans-serif;font-weight:600;cursor:pointer;
  letter-spacing:.05em;transition:all .15s;white-space:nowrap}
.filter-btn:hover{border-color:rgba(255,255,255,.25);color:#94a3b8}
.filter-btn.active{background:rgba(96,165,250,.15);border-color:rgba(96,165,250,.4);color:#60a5fa}
.filter-btn.count{background:rgba(96,165,250,.18);border-color:rgba(96,165,250,.35);color:#93c5fd;min-width:64px;text-align:center}
.tog-track{width:36px;height:20px;border-radius:10px;position:relative;cursor:pointer;transition:background .2s;flex-shrink:0}
.tog-thumb{width:14px;height:14px;border-radius:50%;background:#fff;position:absolute;top:3px;transition:left .2s}
.settings-row{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.settings-row:last-child{border-bottom:none}
`;
function injectCSS() {
  if (document.getElementById("rai-style")) return;
  const s = document.createElement("style");
  s.id = "rai-style"; s.textContent = CSS;
  document.head.appendChild(s);
}

/* ─── style constants ───────────────────────────────────── */
const S = {
  app:{ display:"flex", height:"100vh", overflow:"hidden", background:"#060c18", color:"#e2e8f0", fontFamily:"Inter,sans-serif" },
  sidebar:{ width:220, background:"#0b1325", flexShrink:0, borderRight:"1px solid rgba(255,255,255,.06)", display:"flex", flexDirection:"column", padding:"16px 12px", gap:4 },
  logo:{ fontSize:13, fontWeight:700, letterSpacing:".12em", color:"#60a5fa", padding:"4px 8px 14px", borderBottom:"1px solid rgba(255,255,255,.06)", marginBottom:8, display:"flex", alignItems:"center", gap:8 },
  liveBadge:{ display:"flex", alignItems:"center", gap:6, fontSize:10, fontWeight:600, letterSpacing:".1em", color:"#4ade80", margin:"8px 0", padding:"0 8px" },
  dot:{ width:7, height:7, borderRadius:"50%", background:"#4ade80" },
  sSection:{ fontSize:10, letterSpacing:".1em", color:"#475569", padding:"12px 10px 4px", fontWeight:600 },
  main:{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" },
  topbar:{ height:56, background:"rgba(11,19,37,.9)", backdropFilter:"blur(8px)", borderBottom:"1px solid rgba(255,255,255,.06)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", flexShrink:0 },
  tbRight:{ display:"flex", alignItems:"center", gap:10 },
  tbTime:{ fontSize:12, color:"#64748b", fontVariantNumeric:"tabular-nums" },
  tbBadge:{ fontSize:10, fontWeight:600, padding:"3px 8px", borderRadius:20, background:"rgba(74,222,128,.12)", color:"#4ade80", border:"1px solid rgba(74,222,128,.25)" },
  content:{ flex:1, overflowY:"auto", padding:16, display:"flex", flexDirection:"column", gap:14 },
  kpiRow:{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 },
  panel:{ background:"#0f1c35", border:"1px solid rgba(255,255,255,.06)", borderRadius:10, padding:16 },
  panelHdr:{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 },
  panelTitle:{ fontSize:13, fontWeight:600, color:"#cbd5e1", display:"flex", alignItems:"center", gap:8 },
  panelSub:{ fontSize:11, color:"#475569" },
  row2:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 },
  sparkbarRow:{ display:"flex", flexDirection:"column", gap:8 },
  sbarItem:{ display:"flex", alignItems:"center", gap:10 },
  sbarLabel:{ fontSize:11, color:"#94a3b8", width:72, flexShrink:0 },
  sbarTrack:{ flex:1, height:6, background:"rgba(255,255,255,.06)", borderRadius:3, overflow:"hidden" },
  sbarVal:{ fontSize:11, color:"#64748b", width:36, textAlign:"right", fontVariantNumeric:"tabular-nums" },
  funnelWrap:{ display:"flex", flexDirection:"column", gap:10 },
  funnelStep:{ display:"flex", alignItems:"center", gap:12 },
  funnelLabel:{ fontSize:11, color:"#94a3b8", width:80, flexShrink:0, textAlign:"right" },
  funnelTrack:{ flex:1, height:32, background:"rgba(255,255,255,.04)", borderRadius:6, overflow:"hidden" },
  funnelCount:{ fontSize:11, color:"#64748b", width:44, textAlign:"right", fontVariantNumeric:"tabular-nums" },
  hmapGrid:{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:5 },
};

const ACCENT    = { blue:"#3b82f6", green:"#10b981", amber:"#f59e0b", purple:"#8b5cf6" };
const ACCENT_BG = { blue:"rgba(59,130,246,.15)", green:"rgba(16,185,129,.15)", amber:"rgba(245,158,11,.15)", purple:"rgba(139,92,246,.15)" };
const ZONE_COLORS = ["#3b82f6","#10b981","#f59e0b","#8b5cf6","#f43f5e","#06b6d4"];

/* ─── KPI card ──────────────────────────────────────────── */
function KpiCard({ color, icon, label, value, delta, up }) {
  return (
    <div style={{ background:"#0f1c35", border:"1px solid rgba(255,255,255,.06)", borderRadius:10, padding:"14px 16px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:ACCENT[color] }} />
      <div style={{ width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, fontSize:16, background:ACCENT_BG[color], color:ACCENT[color] }}>
        <i className={`ti ${icon}`} aria-hidden="true" />
      </div>
      <div style={{ fontSize:11, color:"#64748b", fontWeight:600, letterSpacing:".08em", marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:26, fontWeight:700, color:"#f1f5f9", fontVariantNumeric:"tabular-nums", lineHeight:1 }}>{value}</div>
      <div style={{ fontSize:11, marginTop:6, display:"flex", alignItems:"center", gap:3, color: up ? "#4ade80" : "#f87171" }}>
        <i className={`ti ${up ? "ti-arrow-up" : "ti-arrow-down"}`} aria-hidden="true" style={{ fontSize:10 }} />
        {delta}
      </div>
    </div>
  );
}

/* ─── NavButton ─────────────────────────────────────────── */
function NavBtn({ tab, active, icon, label, onClick }) {
  return (
    <button onClick={() => onClick(tab)} style={{
      display:"flex", alignItems:"center", gap:10, padding:"9px 10px",
      borderRadius:8, border:"none", width:"100%", textAlign:"left",
      background: active ? "rgba(96,165,250,.15)" : "transparent",
      color: active ? "#60a5fa" : "#94a3b8",
      cursor:"pointer", fontSize:12, fontWeight:500, letterSpacing:".05em", transition:"all .18s",
    }}>
      <i className={`ti ${icon}`} aria-hidden="true" style={{ fontSize:17, flexShrink:0 }} />
      {label}
    </button>
  );
}

/* ─── Canvas charts ──────────────────────────────────────── */
function LiveChart({ data }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"), w = c.width, h = c.height, pts = data;
    const mx = Math.max(...pts.map(p => p.y)) + 20;
    ctx.clearRect(0,0,w,h);
    ctx.strokeStyle="rgba(255,255,255,.04)"; ctx.lineWidth=1;
    for (let i=0;i<5;i++){const y=h*(i/4)*.85+h*.05;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
    const xs=i=>i*(w/(pts.length-1)), ys=v=>h-h*.1-(v/mx)*(h*.8);
    const g=ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,"rgba(59,130,246,.35)"); g.addColorStop(1,"rgba(59,130,246,.01)");
    ctx.beginPath(); ctx.moveTo(xs(0),ys(pts[0].y));
    for(let i=1;i<pts.length;i++){const cx=(xs(i-1)+xs(i))/2;ctx.bezierCurveTo(cx,ys(pts[i-1].y),cx,ys(pts[i].y),xs(i),ys(pts[i].y));}
    ctx.lineTo(xs(pts.length-1),h);ctx.lineTo(xs(0),h);ctx.closePath();ctx.fillStyle=g;ctx.fill();
    ctx.beginPath(); ctx.moveTo(xs(0),ys(pts[0].y));
    for(let i=1;i<pts.length;i++){const cx=(xs(i-1)+xs(i))/2;ctx.bezierCurveTo(cx,ys(pts[i-1].y),cx,ys(pts[i].y),xs(i),ys(pts[i].y));}
    ctx.strokeStyle="#3b82f6";ctx.lineWidth=2.5;ctx.stroke();
    const lx=xs(pts.length-1),ly=ys(pts[pts.length-1].y);
    ctx.beginPath();ctx.arc(lx,ly,4,0,Math.PI*2);ctx.fillStyle="#60a5fa";ctx.fill();
    ctx.beginPath();ctx.arc(lx,ly,7,0,Math.PI*2);ctx.strokeStyle="rgba(96,165,250,.35)";ctx.lineWidth=2;ctx.stroke();
    ctx.fillStyle="#94a3b8";ctx.font="11px Inter,sans-serif";ctx.fillText(pts[pts.length-1].y,lx+10,ly+4);
  },[data]);
  return <canvas ref={ref} width={600} height={180} style={{display:"block",width:"100%",height:180}} aria-label="Live traffic"/>;
}
function HrChart({ data, labels }) {
  const ref = useRef(null);
  useEffect(() => {
    const c=ref.current; if(!c) return;
    const ctx=c.getContext("2d"),w=c.width,h=c.height,bw=(w-40)/data.length,mx=Math.max(...data);
    ctx.clearRect(0,0,w,h);
    data.forEach((v,i)=>{
      const x=30+i*bw+bw*.15,bh=Math.round((v/mx)*(h-30)),r=3,bx=x,by=h-bh-10;
      ctx.fillStyle=i===data.length-3?"#3b82f6":"rgba(59,130,246,.28)";
      ctx.beginPath();ctx.moveTo(bx+r,by);ctx.lineTo(bx+bw*.7-r,by);
      ctx.arcTo(bx+bw*.7,by,bx+bw*.7,by+r,r);ctx.lineTo(bx+bw*.7,h-10);ctx.lineTo(bx,h-10);
      ctx.lineTo(bx,by+r);ctx.arcTo(bx,by,bx+r,by,r);ctx.closePath();ctx.fill();
      ctx.fillStyle="#475569";ctx.font="9px Inter,sans-serif";ctx.textAlign="center";
      ctx.fillText(labels[i],x+bw*.35,h-1);
    });
  },[data,labels]);
  return <canvas ref={ref} width={400} height={140} style={{display:"block",width:"100%",height:140}} aria-label="Hourly chart"/>;
}
function WeekChart({ s1, s2, labels }) {
  const ref = useRef(null);
  useEffect(() => {
    const c=ref.current;if(!c)return;
    const ctx=c.getContext("2d"),w=c.width,h=c.height,mx=Math.max(...s1)+50;
    const xs=i=>40+i*(w-60)/(labels.length-1),ys=v=>h-30-Math.round((v/mx)*(h-50));
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<5;i++){const y=30+i*(h-60)/4;ctx.strokeStyle="rgba(255,255,255,.04)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(40,y);ctx.lineTo(w-10,y);ctx.stroke();}
    [[s2,"#8b5cf6","rgba(139,92,246,.18)","rgba(139,92,246,.01)"],[s1,"#3b82f6","rgba(59,130,246,.22)","rgba(59,130,246,.01)"]].forEach(([d,color,c0,c1])=>{
      const g=ctx.createLinearGradient(0,0,0,h);g.addColorStop(0,c0);g.addColorStop(1,c1);
      ctx.beginPath();ctx.moveTo(xs(0),ys(d[0]));
      for(let i=1;i<d.length;i++){const cx=(xs(i-1)+xs(i))/2;ctx.bezierCurveTo(cx,ys(d[i-1]),cx,ys(d[i]),xs(i),ys(d[i]));}
      ctx.lineTo(xs(d.length-1),h-30);ctx.lineTo(xs(0),h-30);ctx.closePath();ctx.fillStyle=g;ctx.fill();
      ctx.beginPath();ctx.moveTo(xs(0),ys(d[0]));
      for(let i=1;i<d.length;i++){const cx=(xs(i-1)+xs(i))/2;ctx.bezierCurveTo(cx,ys(d[i-1]),cx,ys(d[i]),xs(i),ys(d[i]));}
      ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();
      d.forEach((_,i)=>{ctx.beginPath();ctx.arc(xs(i),ys(d[i]),3,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();});
    });
    labels.forEach((l,i)=>{ctx.fillStyle="#475569";ctx.font="10px Inter,sans-serif";ctx.textAlign="center";ctx.fillText(l,xs(i),h-8);});
    ctx.fillStyle="#3b82f6";ctx.fillRect(w-140,10,10,4);ctx.fillStyle="#94a3b8";ctx.font="11px Inter,sans-serif";ctx.textAlign="left";ctx.fillText("Visitors",w-126,16);
    ctx.fillStyle="#8b5cf6";ctx.fillRect(w-140,26,10,4);ctx.fillStyle="#94a3b8";ctx.fillText("Purchases",w-126,32);
  },[s1,s2,labels]);
  return <canvas ref={ref} width={600} height={200} style={{display:"block",width:"100%",height:200}} aria-label="Weekly chart"/>;
}
function hmapColor(v){
  if(v<20)return{bg:"#1e3a5f",text:"#93c5fd"};if(v<40)return{bg:"#1d4ed8",text:"#bfdbfe"};
  if(v<60)return{bg:"#7c3aed",text:"#ddd6fe"};if(v<80)return{bg:"#dc2626",text:"#fca5a5"};
  return{bg:"#f97316",text:"#fed7aa"};
}

/* ─── Toggle ─────────────────────────────────────────────── */
function Toggle({ on, onChange }) {
  return (
    <div className="tog-track" style={{ background: on ? "#3b82f6" : "#1e2d47" }} onClick={() => onChange(!on)}>
      <div className="tog-thumb" style={{ left: on ? 19 : 3 }} />
    </div>
  );
}

/* ─── Event type config ──────────────────────────────────── */
const EV_CFG = {
  ENTRY:  { icon:"ti-door-enter",     color:"#60a5fa", bg:"rgba(96,165,250,.12)",  border:"rgba(96,165,250,.25)"  },
  EXIT:   { icon:"ti-door-exit",      color:"#94a3b8", bg:"rgba(148,163,184,.08)", border:"rgba(148,163,184,.18)" },
  ALERT:  { icon:"ti-alert-triangle", color:"#fbbf24", bg:"rgba(251,191,36,.1)",   border:"rgba(251,191,36,.25)"  },
  SALE:   { icon:"ti-receipt",        color:"#34d399", bg:"rgba(52,211,153,.1)",   border:"rgba(52,211,153,.25)"  },
  CAMERA: { icon:"ti-camera",         color:"#a78bfa", bg:"rgba(167,139,250,.1)",  border:"rgba(167,139,250,.25)" },
  SYSTEM: { icon:"ti-cpu",            color:"#38bdf8", bg:"rgba(56,189,248,.1)",   border:"rgba(56,189,248,.25)"  },
};

/* ─── Event generators ───────────────────────────────────── */
const GATES   = ["Gate 1","Gate 2","Gate 3"];
const CAMS    = ["CAM-01","CAM-02","CAM-03","CAM-04"];
const ZONES_L = ["Skincare","Makeup","Haircare","Fragrance","Body Care","Accessories"];
const PAY     = ["UPI","Card","Cash","Wallet"];
function genEvent(store) {
  const type = ["ENTRY","EXIT","ALERT","SALE","CAMERA","SYSTEM"][rand(0,5)];
  const gate = GATES[rand(0,2)], cam = CAMS[rand(0,3)], zone = ZONES_L[rand(0,5)], pay = PAY[rand(0,3)];
  const msgs = {
    ENTRY:  `Entry scan at ${gate}`,
    EXIT:   `Exit recorded at ${gate}`,
    ALERT:  ["Queue length " + rand(5,15) + " at billing", "Zone " + zone + " overcrowded", "Suspicious dwell near " + zone][rand(0,2)],
    SALE:   `${["Checkout","Purchase"][rand(0,1)]} ₹${(rand(500,5000)).toLocaleString("en-IN")} — ${zone} via ${pay}`,
    CAMERA: [`Camera ${cam} reconnected`, `Camera ${cam} offline`, `Camera ${cam} feed restored`][rand(0,2)],
    SYSTEM: ["Heartbeat OK — all nodes", "DB sync complete", "Alert threshold updated", "Backup snapshot taken"][rand(0,3)],
  };
  return { type, msg: msgs[type], store };
}

let _evId = 0;

/* ─── Real-time Event Feed ───────────────────────────────── */
const FILTER_TABS = ["ALL","ENTRY","EXIT","ALERT","SALE","CAMERA","SYSTEM"];

function EventFeed({ events, onClear, store }) {
  const [filter, setFilter] = useState("ALL");
  const listRef = useRef(null);
  const [atBottom, setAtBottom] = useState(true);

  const filtered = filter === "ALL" ? events : events.filter(e => e.type === filter);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 30);
  };
  const scrollToBottom = () => {
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  return (
    <div style={{ ...S.panel, padding:0, overflow:"hidden" }}>
      {/* header */}
      <div style={{ padding:"14px 16px 10px", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <div style={{ width:28, height:28, borderRadius:6, background:"rgba(96,165,250,.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <i className="ti ti-activity" style={{ fontSize:15, color:"#60a5fa" }} />
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:"#cbd5e1" }}>Real-time event feed</div>
            <div style={{ fontSize:10, color:"#475569" }}>Live — {store}</div>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
            <button className={`filter-btn count`} style={{ pointerEvents:"none" }}>
              {events.length} events
            </button>
            <button onClick={onClear} style={{ background:"rgba(248,113,113,.1)", border:"1px solid rgba(248,113,113,.25)", borderRadius:6, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#f87171" }}>
              <i className="ti ti-trash" style={{ fontSize:14 }} />
            </button>
          </div>
        </div>
        {/* filter pills */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {FILTER_TABS.map(f => (
            <button key={f} className={`filter-btn${filter===f?" active":""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>
      {/* list */}
      <div ref={listRef} onScroll={handleScroll}
        style={{ maxHeight:260, overflowY:"auto", position:"relative" }}>
        {filtered.length === 0 && (
          <div style={{ padding:"24px 16px", textAlign:"center", fontSize:11, color:"#475569" }}>No events yet…</div>
        )}
        {filtered.map((e, i) => {
          const cfg = EV_CFG[e.type] || EV_CFG.SYSTEM;
          return (
            <div key={e.id} className="ev-row" style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 16px" }}>
              <div style={{ width:26, height:26, borderRadius:6, background:cfg.bg, border:`1px solid ${cfg.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <i className={`ti ${cfg.icon}`} style={{ fontSize:13, color:cfg.color }} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:".07em", color:cfg.color,
                    background:cfg.bg, border:`1px solid ${cfg.border}`, borderRadius:4, padding:"1px 6px" }}>
                    {e.type}
                  </span>
                  <span style={{ fontSize:10, color:"#475569" }}>{e.store}</span>
                </div>
                <div style={{ fontSize:12, color:"#e2e8f0", fontWeight:500 }}>{e.msg}</div>
              </div>
              <div style={{ fontSize:10, color:"#475569", flexShrink:0, fontVariantNumeric:"tabular-nums" }}>{e.ts}</div>
            </div>
          );
        })}
      </div>
      {/* scroll-to-top fab */}
      {!atBottom && filtered.length > 0 && (
        <div onClick={scrollToBottom} style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", background:"rgba(15,28,53,.95)", border:"1px solid rgba(255,255,255,.12)", borderRadius:20, padding:"4px 14px", fontSize:11, color:"#94a3b8", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
          <i className="ti ti-arrow-up" style={{ fontSize:12 }} /> Newest
        </div>
      )}
    </div>
  );
}

/* ─── Settings panel ────────────────────────────────────── */
function SettingsPanel({ settings, onChange }) {
  const Row = ({ label, desc, k }) => (
    <div className="settings-row">
      <div>
        <div style={{ fontSize:13, color:"#e2e8f0", fontWeight:500 }}>{label}</div>
        {desc && <div style={{ fontSize:11, color:"#475569", marginTop:2 }}>{desc}</div>}
      </div>
      <Toggle on={settings[k]} onChange={v => onChange(k, v)} />
    </div>
  );
  const speeds = [{ v:800,l:"Fast (0.8s)" },{ v:1800,l:"Normal (1.8s)" },{ v:3500,l:"Slow (3.5s)" }];
  return (
    <div style={{ animation:"fadeUp .3s ease", display:"flex", flexDirection:"column", gap:14 }}>
      {/* General */}
      <div style={S.panel}>
        <div style={{ fontSize:12, fontWeight:600, letterSpacing:".08em", color:"#475569", marginBottom:14 }}>GENERAL</div>
        <Row k="liveData"      label="Live data updates"     desc="Ticker updates KPIs and charts in real time" />
        <Row k="eventFeed"     label="Real-time event feed"  desc="Stream store events as they happen" />
        <Row k="alertsEnabled" label="Alert notifications"   desc="Highlight warn/error events prominently" />
      </div>
      {/* Display */}
      <div style={S.panel}>
        <div style={{ fontSize:12, fontWeight:600, letterSpacing:".08em", color:"#475569", marginBottom:14 }}>DISPLAY</div>
        <Row k="showTicker"   label="Topbar ticker"   desc="Show CONV / DWELL / ZONE UTIL strip" />
        <Row k="showClock"    label="Live clock"      desc="Display current time in topbar" />
        <Row k="animateBars"  label="Animated bars"   desc="Transition zone and funnel bar widths smoothly" />
      </div>
      {/* Refresh rate */}
      <div style={S.panel}>
        <div style={{ fontSize:12, fontWeight:600, letterSpacing:".08em", color:"#475569", marginBottom:14 }}>REFRESH RATE</div>
        <div style={{ display:"flex", gap:8 }}>
          {speeds.map(s => (
            <button key={s.v} onClick={() => onChange("tickRate", s.v)}
              style={{ flex:1, padding:"8px 0", borderRadius:8, fontSize:11, fontWeight:600, cursor:"pointer",
                background: settings.tickRate===s.v ? "rgba(59,130,246,.2)" : "rgba(255,255,255,.04)",
                border: settings.tickRate===s.v ? "1px solid rgba(59,130,246,.45)" : "1px solid rgba(255,255,255,.08)",
                color: settings.tickRate===s.v ? "#60a5fa" : "#64748b", transition:"all .15s" }}>
              {s.l}
            </button>
          ))}
        </div>
      </div>
      {/* About */}
      <div style={S.panel}>
        <div style={{ fontSize:12, fontWeight:600, letterSpacing:".08em", color:"#475569", marginBottom:10 }}>ABOUT</div>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {[["Platform","Retail AI v2.0"],["Build","2025-07-04"],["Data mode","Simulated live feed"],["Stores tracked","6"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
              <span style={{ color:"#475569" }}>{k}</span>
              <span style={{ color:"#94a3b8", fontWeight:500 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Stores list ────────────────────────────────────────── */
const STORES = ["STORE_BLR_001","STORE_BLR_002","STORE_MUM_001","STORE_DEL_003","STORE_HYD_002","STORE_CHN_001"];

/* ─── per-store funnel data ──────────────────────────────── */
function storeFunnel(storeId) {
  const s = storeSeed(storeId);
  const entry = seededRand(s,    800, 1600);
  const zone  = seededRand(s+1,  Math.round(entry*.6), Math.round(entry*.85));
  const dwell = seededRand(s+2,  Math.round(zone*.65),  Math.round(zone*.85));
  const bill  = seededRand(s+3,  Math.round(dwell*.55), Math.round(dwell*.75));
  const purch = seededRand(s+4,  Math.round(bill*.5),   Math.round(bill*.75));
  return [
    { label:"Entry",      val:entry, color:"#3b82f6" },
    { label:"Zone visit", val:zone,  color:"#8b5cf6" },
    { label:"Dwell 30s+", val:dwell, color:"#06b6d4" },
    { label:"Billing",    val:bill,  color:"#f59e0b" },
    { label:"Purchase",   val:purch, color:"#10b981" },
  ];
}

/* ─── per-store anomalies ────────────────────────────────── */
function storeAnomalies(storeId) {
  const s = storeSeed(storeId);
  const pool = [
    { type:"warn", icon:"ti-alert-triangle", title:"Traffic spike — Makeup zone",    desc:"42% above hourly average. Possible event trigger.",      time:"2m ago"  },
    { type:"err",  icon:"ti-camera-off",     title:"Camera offline — Gate 2",        desc:"No feed since 14:32. Maintenance alert dispatched.",      time:"11m ago" },
    { type:"warn", icon:"ti-clock",          title:"Billing delay anomaly",          desc:"Avg checkout time up 38s. Queue length: 7 customers.",    time:"18m ago" },
    { type:"info", icon:"ti-info-circle",    title:"Conversion rate peak",           desc:"Conversion hit 68.4% — highest this week.",               time:"31m ago" },
    { type:"warn", icon:"ti-alert-triangle", title:"Zone Fragrance overcrowded",     desc:"35% above zone capacity. Staff notified.",                time:"5m ago"  },
    { type:"err",  icon:"ti-wifi-off",       title:"Network latency spike",          desc:"Avg response 420ms. Normal threshold: 80ms.",             time:"9m ago"  },
    { type:"info", icon:"ti-trending-up",    title:"Haircare sales surge",           desc:"Revenue up 28% vs yesterday same hour.",                  time:"14m ago" },
    { type:"warn", icon:"ti-users",          title:"Peak occupancy near threshold",  desc:"Store at 91% of max permitted occupancy.",                time:"3m ago"  },
  ];
  // pick 4 deterministically based on store
  const idx = [s%8, (s+2)%8, (s+5)%8, (s+7)%8];
  return idx.map(i => pool[i]);
}

/* ─── Main App ───────────────────────────────────────────── */
export default function App() {
  injectCSS();

  const [tab,  setTab]   = useState("dashboard");
  const [store, setStore] = useState("STORE_BLR_002");
  const [clock, setClock] = useState("");
  const [events, setEvents] = useState([]);
  const [funnelReady, setFR] = useState(false);

  const [settings, setSettings] = useState({
    liveData:true, eventFeed:true, alertsEnabled:true,
    showTicker:true, showClock:true, animateBars:true, tickRate:1800,
  });
  const changeSetting = (k, v) => setSettings(p => ({ ...p, [k]:v }));

  /* live numeric state */
  const [visitors, setVis]  = useState(1247);
  const [entries,  setEnt]  = useState(823);
  const [exits,    setEx]   = useState(341);
  const [sales,    setSales] = useState(148600);
  const [trafficPts, setTP] = useState(() => Array.from({length:20},(_,i)=>({x:i,y:rand(100,400)})));
  const [zones, setZones]   = useState([
    {name:"Skincare",visits:420,cap:700},{name:"Makeup",visits:680,cap:700},
    {name:"Haircare",visits:310,cap:700},{name:"Fragrance",visits:500,cap:700},
    {name:"Body Care",visits:390,cap:700},{name:"Accessories",visits:220,cap:700},
  ]);
  const [hmap, setHmap] = useState(()=>Array.from({length:30},()=>rand(10,95)));

  const HMAP_ZONES=["Skincare","Makeup","Haircare","Fragrance","Body","Accessories","Nails","Toner","Serums","Masks","SPF","Tools","Wipes","Mists","Primers","Blush","Liner","Gloss","Shadow","Lash","Setting","Remover","Concealer","Bronzer","Palette","Brow","Contour","Highlight","Lip","Cheek"];
  const HR_DATA=[88,132,175,220,310,410,490,520,480,440,380,310];
  const HR_LABELS=["8a","9a","10a","11a","12p","1p","2p","3p","4p","5p","6p","7p"];
  const WEEK_S1=[210,340,290,450,520,610,480];
  const WEEK_S2=[160,280,220,380,450,550,410];
  const WEEK_LBL=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  /* clock */
  useEffect(()=>{
    const tick=()=>setClock(new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit"}));
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[]);

  /* reset on store change */
  useEffect(()=>{
    const s=storeSeed(store);
    setVis(seededRand(s,900,2000)); setEnt(seededRand(s+1,500,1200));
    setEx(seededRand(s+2,100,600)); setSales(seededRand(s+3,50000,500000));
    setTP(Array.from({length:20},(_,i)=>({x:i,y:rand(100,400)})));
    setZones(z=>z.map((z2,i)=>({...z2,visits:seededRand(s+10+i,80,680)})));
    setHmap(Array.from({length:30},(_,i)=>seededRand(s+20+i,10,95)));
    setEvents([]);
  },[store]);

  /* live tick */
  const tickRef = useRef(null);
  useEffect(()=>{
    if(tickRef.current) clearInterval(tickRef.current);
    if(!settings.liveData) return;
    tickRef.current = setInterval(()=>{
      setVis(v=>clamp(v+rand(-4,12),900,2000));
      setEnt(v=>clamp(v+rand(-2,6),500,1200));
      setEx(v=>clamp(v+rand(-1,4),100,600));
      setSales(v=>clamp(v+rand(-500,2000),50000,500000));
      setTP(p=>[...p.slice(1),{x:p.length,y:rand(80,420)}]);
      setZones(p=>p.map(z=>({...z,visits:clamp(z.visits+rand(-8,20),0,700)})));
      setHmap(p=>p.map(v=>clamp(v+rand(-6,12),0,100)));
      if(settings.eventFeed && Math.random()<0.35){
        const e=genEvent(store);
        const ts=new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
        setEvents(p=>[{...e,id:++_evId,ts},...p.slice(0,99)]);
      }
    }, settings.tickRate);
    return()=>clearInterval(tickRef.current);
  },[settings.liveData, settings.eventFeed, settings.tickRate, store]);

  /* funnel re-animate on tab switch */
  useEffect(()=>{
    if(tab==="funnel"){setFR(false);setTimeout(()=>setFR(true),60);}
  },[tab]);

  const conv=((entries/visitors)*100).toFixed(1);
  const funnelData  = storeFunnel(store);
  const anomalies   = storeAnomalies(store);

  /* ── render helpers ── */
  const renderDashboard = () => (
    <>
      <div style={{...S.kpiRow,animation:"fadeUp .3s ease"}}>
        <KpiCard color="blue"   icon="ti-users"      label="VISITORS"   value={fmt(visitors)} delta="+3.2% today"   up />
        <KpiCard color="green"  icon="ti-door-enter" label="ENTRIES"    value={fmt(entries)}  delta="+1.8% vs avg"  up />
        <KpiCard color="amber"  icon="ti-door-exit"  label="EXITS"      value={fmt(exits)}    delta="-0.9% vs avg"  up={false} />
        <KpiCard color="purple" icon="ti-percentage" label="CONVERSION" value={conv+"%"}      delta="+5.1% this hr" up />
      </div>
      <div style={{...S.panel,animation:"fadeUp .35s ease"}}>
        <div style={S.panelHdr}>
          <div style={S.panelTitle}><i className="ti ti-activity" style={{fontSize:15,color:"#60a5fa"}}/>Live traffic stream</div>
          <div style={S.panelSub}>Rolling 20-point window</div>
        </div>
        <LiveChart data={trafficPts}/>
      </div>
      <div style={{...S.row2,animation:"fadeUp .4s ease"}}>
        <div style={S.panel}>
          <div style={S.panelHdr}><div style={S.panelTitle}><i className="ti ti-map-pin" style={{fontSize:15,color:"#60a5fa"}}/>Zone activity</div></div>
          <div style={S.sparkbarRow}>
            {zones.map((z,i)=>(
              <div key={z.name} style={S.sbarItem}>
                <div style={S.sbarLabel}>{z.name}</div>
                <div style={S.sbarTrack}><div style={{height:"100%",borderRadius:3,transition:settings.animateBars?"width .8s cubic-bezier(.34,1.56,.64,1)":"none",width:Math.round(z.visits/z.cap*100)+"%",background:ZONE_COLORS[i]}}/></div>
                <div style={S.sbarVal}>{z.visits}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={S.panel}>
          <div style={S.panelHdr}><div style={S.panelTitle}><i className="ti ti-clock" style={{fontSize:15,color:"#60a5fa"}}/>Hourly snapshots</div></div>
          <HrChart data={HR_DATA} labels={HR_LABELS}/>
        </div>
      </div>
      <EventFeed events={events} onClear={()=>setEvents([])} store={store}/>
    </>
  );

  const renderMetrics = () => (
    <>
      <div style={{...S.kpiRow,animation:"fadeUp .3s ease"}}>
        <KpiCard color="blue"   icon="ti-currency-rupee"     label="SALES TODAY"  value={fmtCur(sales)} delta="+12.4% vs yesterday" up />
        <KpiCard color="green"  icon="ti-shopping-cart"      label="ORDERS"       value={fmt(entries)}  delta="+8.1% this hr"       up />
        <KpiCard color="purple" icon="ti-user-check"         label="ACTIVE USERS" value={fmt(visitors)} delta="Online now"           up />
        <KpiCard color="amber"  icon="ti-heart-rate-monitor" label="SYS HEALTH"   value="98.4%"         delta="All nodes nominal"    up />
      </div>
      <div style={{...S.panel,animation:"fadeUp .35s ease"}}>
        <div style={S.panelHdr}><div style={S.panelTitle}><i className="ti ti-chart-area" style={{fontSize:15,color:"#60a5fa"}}/>Weekly performance</div></div>
        <WeekChart s1={WEEK_S1} s2={WEEK_S2} labels={WEEK_LBL}/>
      </div>
      <EventFeed events={events} onClear={()=>setEvents([])} store={store}/>
    </>
  );

  const renderFunnel = () => {
    const max = funnelData[0].val;
    const conv2 = ((funnelData[4].val/funnelData[0].val)*100).toFixed(1);
    const avgDwell = (3.5 + storeSeed(store)%30/10).toFixed(1);
    const dropOff  = (100 - ((funnelData[4].val/funnelData[3].val)*100)).toFixed(0);
    return (
      <>
        <div style={{...S.kpiRow,animation:"fadeUp .3s ease"}}>
          <KpiCard color="blue"   icon="ti-users"         label="TOP OF FUNNEL" value={funnelData[0].val.toLocaleString()} delta="Entries today"           up />
          <KpiCard color="green"  icon="ti-check"         label="CONVERSIONS"   value={funnelData[4].val.toLocaleString()} delta={conv2+"% close rate"}    up />
          <KpiCard color="amber"  icon="ti-clock"         label="AVG DWELL"     value={avgDwell+"m"}                       delta="-0.3m vs avg"            up={false} />
          <KpiCard color="purple" icon="ti-trending-down" label="DROP-OFF"       value={dropOff+"%"}                       delta="Stage 4→5"               up={false} />
        </div>
        <div style={{...S.panel,animation:"fadeUp .35s ease"}}>
          <div style={S.panelHdr}><div style={S.panelTitle}><i className="ti ti-filter" style={{fontSize:15,color:"#60a5fa"}}/>Conversion stages — {store}</div></div>
          <div style={S.funnelWrap}>
            {funnelData.map((s,i)=>{
              const pct=Math.round(s.val/max*100);
              const drop=i>0?Math.round((1-s.val/funnelData[i-1].val)*100):null;
              return (
                <div key={s.label} style={S.funnelStep}>
                  <div style={S.funnelLabel}>{s.label}</div>
                  <div style={S.funnelTrack}>
                    <div style={{height:"100%",borderRadius:6,display:"flex",alignItems:"center",paddingLeft:12,fontSize:12,fontWeight:600,color:"#fff",background:s.color,
                      width:funnelReady?pct+"%":"0%",
                      transition:settings.animateBars?`width .9s cubic-bezier(.34,1.56,.64,1) ${i*.08}s`:"none"}}>
                      {s.val.toLocaleString()}
                    </div>
                  </div>
                  <div style={S.funnelCount}>{drop!=null?`-${drop}%`:"—"}</div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  const renderHeatmap = () => {
    const ranked=[...zones].sort((a,b)=>b.visits-a.visits);
    return (
      <>
        <div style={{...S.panel,animation:"fadeUp .3s ease"}}>
          <div style={S.panelHdr}>
            <div style={S.panelTitle}><i className="ti ti-flame" style={{fontSize:15,color:"#60a5fa"}}/>Store zone heatmap</div>
            <div style={S.panelSub}>Live visit density</div>
          </div>
          <div style={S.hmapGrid}>
            {hmap.map((v,i)=>{const{bg,text}=hmapColor(v);return(
              <div key={i} style={{aspectRatio:"1",borderRadius:5,background:bg,color:text,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:600,transition:"all .4s"}}>{v}</div>
            );})}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginTop:12,fontSize:10,color:"#64748b"}}>
            <span>Low</span>
            <div style={{flex:1,height:4,borderRadius:2,background:"linear-gradient(90deg,#1e3a5f,#1d4ed8,#7c3aed,#dc2626,#f97316)"}}/>
            <span>High</span>
          </div>
        </div>
        <div style={{...S.panel,animation:"fadeUp .35s ease"}}>
          <div style={S.panelHdr}><div style={S.panelTitle}><i className="ti ti-chart-bar" style={{fontSize:15,color:"#60a5fa"}}/>Zone ranking</div></div>
          <div style={S.sparkbarRow}>
            {ranked.map((z,i)=>(
              <div key={z.name} style={S.sbarItem}>
                <div style={S.sbarLabel}>{z.name}</div>
                <div style={S.sbarTrack}><div style={{height:"100%",borderRadius:3,width:Math.round(z.visits/700*100)+"%",background:ZONE_COLORS[i],transition:settings.animateBars?"width .8s cubic-bezier(.34,1.56,.64,1)":"none"}}/></div>
                <div style={S.sbarVal}>{z.visits}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderAnomalies = () => {
    const activeCount = anomalies.filter(a=>a.type==="warn"||a.type==="err").length;
    const cameras = 12 - (storeSeed(store)%3);
    return (
      <>
        <div style={{...S.kpiRow,animation:"fadeUp .3s ease"}}>
          <KpiCard color="amber"  icon="ti-alert-triangle" label="ACTIVE ALERTS" value={String(activeCount)}       delta="This session"          up={false} />
          <KpiCard color="blue"   icon="ti-shield-check"   label="RESOLVED"      value={String(seededRand(storeSeed(store),8,20))} delta="Today total" up />
          <KpiCard color="green"  icon="ti-clock"          label="AVG RESOLVE"   value={(seededRand(storeSeed(store)+1,5,14))+"."+rand(0,9)+"m"} delta="-2.1m vs avg" up />
          <KpiCard color="purple" icon="ti-camera"         label="CAMERAS LIVE"  value={cameras+"/12"}             delta={cameras<12?"1 offline":"All live"} up={cameras===12} />
        </div>
        <div style={{...S.panel,animation:"fadeUp .35s ease"}}>
          <div style={S.panelHdr}>
            <div style={S.panelTitle}><i className="ti ti-list" style={{fontSize:15,color:"#60a5fa"}}/>Alert feed — {store}</div>
            <div style={S.panelSub}>Store-specific</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {anomalies.map((a,i)=>{
              const ts={warn:{bg:"rgba(245,158,11,.06)",border:"rgba(245,158,11,.2)",color:"#fbbf24"},err:{bg:"rgba(248,113,113,.06)",border:"rgba(248,113,113,.2)",color:"#f87171"},info:{bg:"rgba(96,165,250,.06)",border:"rgba(96,165,250,.2)",color:"#60a5fa"}}[a.type];
              return(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",borderRadius:8,background:ts.bg,border:`1px solid ${ts.border}`,animation:"fadeUp .35s ease"}}>
                  <i className={`ti ${a.icon}`} style={{fontSize:16,marginTop:1,color:ts.color}}/>
                  <div>
                    <div style={{fontSize:12,fontWeight:600,color:"#e2e8f0"}}>{a.title}</div>
                    <div style={{fontSize:11,color:"#64748b",marginTop:2}}>{a.desc}</div>
                  </div>
                  <div style={{fontSize:10,color:"#475569",marginLeft:"auto",flexShrink:0,paddingTop:1}}>{a.time}</div>
                </div>
              );
            })}
          </div>
        </div>
        <EventFeed events={events} onClear={()=>setEvents([])} store={store}/>
      </>
    );
  };

  const TABS=[
    {id:"dashboard",icon:"ti-layout-dashboard",label:"Dashboard"},
    {id:"metrics",  icon:"ti-chart-bar",        label:"Metrics"},
    {id:"funnel",   icon:"ti-filter",            label:"Funnel"},
    {id:"heatmap",  icon:"ti-flame",             label:"Heatmap"},
    {id:"anomalies",icon:"ti-alert-triangle",    label:"Anomalies"},
  ];
  const TITLES={dashboard:"Dashboard",metrics:"Metrics",funnel:"Conversion Funnel",heatmap:"Store Heatmap",anomalies:"Anomalies",settings:"Settings"};

  return (
    <div style={S.app}>
      {/* sidebar */}
      <div style={S.sidebar}>
        <div style={S.logo}><i className="ti ti-bolt" style={{fontSize:18}}/>RETAIL AI</div>
        <div style={S.liveBadge}><span style={S.dot} className="pulse"/>LIVE SYSTEM</div>
        <div style={S.sSection}>NAVIGATION</div>
        {TABS.map(t=>(
          <NavBtn key={t.id} tab={t.id} active={tab===t.id} icon={t.icon} label={t.label} onClick={setTab}/>
        ))}
        <div style={{flex:1}}/>
        <div style={S.sSection}>SYSTEM</div>
        <NavBtn tab="settings" active={tab==="settings"} icon="ti-settings" label="Settings" onClick={setTab}/>
      </div>

      {/* main */}
      <div style={S.main}>
        {/* topbar */}
        <div style={S.topbar}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:14,fontWeight:600,color:"#f1f5f9"}}>{TITLES[tab]||"Dashboard"}</div>
            <div style={{width:1,height:18,background:"rgba(255,255,255,.1)"}}/>
            <i className="ti ti-building-store" style={{fontSize:13,color:"#475569"}}/>
            <select className="store-select" value={store} onChange={e=>setStore(e.target.value)} aria-label="Select store">
              {STORES.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={S.tbRight}>
            {settings.showTicker && (
              <div style={{display:"flex",gap:8}}>
                {[{name:"CONV",val:conv+"%"},{name:"DWELL",val:"4.2m"},{name:"ZONE UTIL",val:"73%"}].map(t=>(
                  <div key={t.name} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",background:"#0b1325",border:"1px solid rgba(255,255,255,.06)",borderRadius:20,fontSize:11,whiteSpace:"nowrap"}}>
                    <span style={{color:"#64748b"}}>{t.name}</span>
                    <span style={{fontWeight:600,color:"#e2e8f0",fontVariantNumeric:"tabular-nums"}}>{t.val}</span>
                    <i className="ti ti-trending-up" style={{fontSize:12,color:"#4ade80"}}/>
                  </div>
                ))}
              </div>
            )}
            {settings.showClock && <div style={S.tbTime}>{clock}</div>}
            <div style={S.tbBadge}>ONLINE</div>
          </div>
        </div>

        {/* content */}
        <div style={S.content}>
          {tab==="dashboard"  && renderDashboard()}
          {tab==="metrics"    && renderMetrics()}
          {tab==="funnel"     && renderFunnel()}
          {tab==="heatmap"    && renderHeatmap()}
          {tab==="anomalies"  && renderAnomalies()}
          {tab==="settings"   && <SettingsPanel settings={settings} onChange={changeSetting}/>}
        </div>
      </div>
    </div>
  );
}