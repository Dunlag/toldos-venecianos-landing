/* === Toldo Venecianos — Atelier (configurador editorial) === */
/* Opción A: ventana viva + tres controles minimalistas (material, lama, inclinación) */

const { useEffect, useRef, useState } = React;

const ATELIER_MATERIALS = [
  {
    id: "cedar",
    name: { es: "Cedro rojo", en: "Red cedar" },
    family: { es: "Madera", en: "Wood" },
    swatch: "linear-gradient(135deg, #d4a373 0%, #8b5a2b 100%)",
    grad: "linear-gradient(180deg, #d4a373 0%, #b5733f 35%, #7a4c22 70%, #4d2e15 100%)",
    edge: "#3b2410",
    sheen: "rgba(255, 220, 170, 0.55)",
  },
  {
    id: "teak",
    name: { es: "Teca birmana", en: "Burmese teak" },
    family: { es: "Madera", en: "Wood" },
    swatch: "linear-gradient(135deg, #e2c190 0%, #6b4423 100%)",
    grad: "linear-gradient(180deg, #e2c190 0%, #b6884e 40%, #7a532a 75%, #4a3017 100%)",
    edge: "#3a230d",
    sheen: "rgba(255, 230, 180, 0.5)",
  },
  {
    id: "alum",
    name: { es: "Aluminio mate", en: "Matte aluminium" },
    family: { es: "Metal", en: "Metal" },
    swatch: "linear-gradient(135deg, #ece8df 0%, #6f6a60 100%)",
    grad: "linear-gradient(180deg, #ece8df 0%, #c2bdb1 40%, #8a8478 75%, #4d4a42 100%)",
    edge: "#37352f",
    sheen: "rgba(255, 250, 240, 0.7)",
  },
  {
    id: "bronze",
    name: { es: "Bronce", en: "Bronze" },
    family: { es: "Metal", en: "Metal" },
    swatch: "linear-gradient(135deg, #9c7d54 0%, #1e1408 100%)",
    grad: "linear-gradient(180deg, #9c7d54 0%, #6e5132 45%, #3e2c18 80%, #1e1408 100%)",
    edge: "#150d05",
    sheen: "rgba(255, 200, 140, 0.55)",
  },
];

/* slat-width preset → number of slats in the stack */
const SLAT_WIDTHS = [
  { mm: 25, N: 30 },
  { mm: 35, N: 22 },
  { mm: 50, N: 15 },
];

const ATELIER_COPY = {
  es: {
    eyebrow: "Atelier",
    titleA: "Vístela",
    titleB: "antes de pedirla.",
    meta: "Tres decisiones bastan. Selecciona acabado, ancho de lama e inclinación; la ventana responde en tiempo real.",
    lMat: "Acabado",
    lWidth: "Ancho de lama",
    lTilt: "Inclinación",
    rOpen: "Apertura",
    summary: "Configuración actual",
    note: "Esta combinación está disponible. Inspección, medición e instalación incluidas en el presupuesto.",
    cta: "Pedir esta configuración",
    closed: "cerrada",
    open: "abierta",
  },
  en: {
    eyebrow: "Atelier",
    titleA: "Dress it",
    titleB: "before you order.",
    meta: "Three decisions are enough. Choose finish, slat width and tilt; the window responds in real time.",
    lMat: "Finish",
    lWidth: "Slat width",
    lTilt: "Tilt",
    rOpen: "Openness",
    summary: "Current setup",
    note: "This combination is available. Site visit, measurement and installation included in the estimate.",
    cta: "Request this setup",
    closed: "closed",
    open: "open",
  },
};

function Atelier({ lang }) {
  const t = ATELIER_COPY[lang] || ATELIER_COPY.es;

  const [tilt, setTilt] = useState(18);    // -80..80
  const [matIdx, setMatIdx] = useState(0);
  const [widthIdx, setWidthIdx] = useState(1); // default 35 mm

  const mat = ATELIER_MATERIALS[matIdx];
  const width = SLAT_WIDTHS[widthIdx];
  const N = width.N;

  const FRAME_H = 540;
  const stackedBandH = 0; // no lift in option A
  const visSpacing = FRAME_H / N;

  const rad = (tilt * Math.PI) / 180;
  const cos = Math.cos(rad);
  const absSin = Math.abs(Math.sin(rad));
  const showingBack = tilt < 0;
  const openness = Math.round(absSin * 100);

  // slat body thickness scales with slat width preset (in px space) and cos(tilt)
  const baseSlot = visSpacing;
  const slatBodyH = Math.max(2.5, baseSlot * 0.86 * Math.abs(cos));

  return (
    <section className="section atelier-section" id="atelier">
      <div className="shell">
        <div className="section-head">
          <span className="num">03 — {t.eyebrow}</span>
          <h2>{t.titleA} <em>{t.titleB}</em></h2>
          <span className="meta">{t.meta}</span>
        </div>

        {/* ===== Stage ===== */}
        <div
          className="atelier-stage atelier-stage-a"
          style={{ "--frame-h": `${FRAME_H}px` }}
        >
          {/* outside-the-window scene */}
          <div className="atelier-scene" aria-hidden="true">
            <img
              className="scene-photo"
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80&auto=format&fit=crop"
              alt=""
            />
            <div className="scene-tint"></div>
            <div className="scene-sunbeam"></div>
          </div>

          {/* venetian assembly */}
          <div className="atelier-slats">
            {Array.from({ length: N }).map((_, i) => {
              const y = stackedBandH + i * visSpacing;
              return (
                <div
                  key={i}
                  className="slat-slot"
                  style={{ top: `${y}px`, height: `${visSpacing}px` }}
                >
                  <div
                    className="slat-body"
                    style={{
                      height: `${slatBodyH}px`,
                      background: mat.grad,
                      boxShadow: `0 ${1 + absSin * 2}px ${2 + absSin * 6}px rgba(0,0,0,${0.18 + absSin * 0.25}), inset 0 1px 0 ${mat.sheen}`,
                      filter: showingBack ? "brightness(0.55) saturate(0.85)" : "none",
                      transform: `translateY(${(visSpacing - slatBodyH) / 2}px)`,
                    }}
                  />
                </div>
              );
            })}

            {/* light streaks between slats */}
            <div
              className="light-streaks"
              aria-hidden="true"
              style={{
                opacity: Math.min(0.65, absSin * 0.9),
                backgroundImage: `repeating-linear-gradient(
                  180deg,
                  transparent 0,
                  transparent ${Math.max(0, visSpacing - 1)}px,
                  rgba(255, 220, 160, ${0.35 + absSin * 0.35}) ${Math.max(0, visSpacing - 1)}px,
                  rgba(255, 220, 160, ${0.35 + absSin * 0.35}) ${visSpacing}px
                )`,
                top: 0,
                bottom: 0,
              }}
            />
          </div>

          {/* headrail */}
          <div className="atelier-headrail-a" style={{ background: mat.grad }}></div>

          {/* mini live readout in the upper-right of the frame */}
          <div className="stage-readout">
            <span className="sr-line">{mat.name[lang] || mat.name.es}</span>
            <span className="sr-line">{width.mm} mm</span>
            <span className="sr-line num">{Math.round(tilt)}° · {openness}% {openness < 8 ? t.closed : openness > 75 ? t.open : ""}</span>
          </div>
        </div>

        {/* ===== Controls strip ===== */}
        <div className="atelier-controls">
          {/* Material */}
          <div className="ctrl">
            <div className="ctrl-head">
              <span className="ctrl-lab">{t.lMat}</span>
              <span className="ctrl-val">{mat.name[lang] || mat.name.es}</span>
            </div>
            <div className="ctrl-body">
              <div className="mat-row" role="radiogroup" aria-label={t.lMat}>
                {ATELIER_MATERIALS.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    role="radio"
                    aria-checked={i === matIdx}
                    aria-label={m.name[lang] || m.name.es}
                    className={`mat-chip ${i === matIdx ? "is-active" : ""}`}
                    onClick={() => setMatIdx(i)}
                    style={{ "--swatch": m.swatch }}
                  >
                    <span className="mat-swatch"></span>
                    <span className="mat-name">{m.name[lang] || m.name.es}</span>
                    <span className="mat-fam">{m.family[lang] || m.family.es}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ctrl-sep" aria-hidden="true"></div>

          {/* Width */}
          <div className="ctrl">
            <div className="ctrl-head">
              <span className="ctrl-lab">{t.lWidth}</span>
              <span className="ctrl-val num">{width.mm} mm</span>
            </div>
            <div className="ctrl-body">
              <div className="width-row" role="radiogroup" aria-label={t.lWidth}>
                {SLAT_WIDTHS.map((w, i) => (
                  <button
                    key={w.mm}
                    type="button"
                    role="radio"
                    aria-checked={i === widthIdx}
                    className={`width-pill ${i === widthIdx ? "is-active" : ""}`}
                    onClick={() => setWidthIdx(i)}
                  >
                    <span className="width-num num">{w.mm}</span>
                    <span className="width-unit">mm</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ctrl-sep" aria-hidden="true"></div>

          {/* Tilt */}
          <div className="ctrl">
            <div className="ctrl-head">
              <span className="ctrl-lab">{t.lTilt}</span>
              <span className="ctrl-val num">{Math.round(tilt)}°</span>
            </div>
            <div className="ctrl-body">
              <div className="tilt-wrap">
                <input
                  type="range"
                  min="-80"
                  max="80"
                  step="1"
                  value={tilt}
                  onChange={(e) => setTilt(parseInt(e.target.value, 10))}
                  aria-label={t.lTilt}
                  className="tilt-range"
                />
                <div className="tilt-ticks" aria-hidden="true">
                  <span style={{ left: "0%" }}>−80°</span>
                  <span style={{ left: "50%" }}>0°</span>
                  <span style={{ left: "100%" }}>+80°</span>
                </div>
              </div>
              <div className="tilt-state">
                <span className="ctrl-sub">{t.rOpen}</span>
                <span className="ctrl-sub num">{openness}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Bottom footer line ===== */}
        <div className="atelier-foot">
          <p className="atelier-note">{t.note}</p>
          <a className="btn" href="#contacto">
            {t.cta}
            <span className="dot" aria-hidden>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Atelier });
