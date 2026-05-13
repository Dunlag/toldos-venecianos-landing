/* === Toldo Venecianos — content sections === */
/* exposes: Nav, Hero, Marquee, Catalogo, Materiales, Estudio, Contacto, Footer */

const { useEffect, useRef, useState, useMemo } = React;

/* tiny scroll-reveal hook */
function useReveal(opts = { threshold: 0.2, once: true }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisible(true);
          if (opts.once) io.disconnect();
        } else if (!opts.once) setVisible(false);
      });
    }, { threshold: opts.threshold, rootMargin: opts.rootMargin || "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/* Words pull-up — splits a string by spaces */
function WordsPullUp({ text, className = "", as: Tag = "span", delay = 0 }) {
  const [ref, vis] = useReveal();
  const words = String(text).split(/\s+/);
  return (
    <Tag ref={ref} className={`reveal-words ${vis ? "in" : ""} ${className}`}>
      {words.map((w, i) => (
        <span className="w" key={i}>
          <span style={{ transitionDelay: `${delay + i * 60}ms` }}>{w}{i < words.length - 1 ? "\u00A0" : ""}</span>
        </span>
      ))}
    </Tag>
  );
}

/* progressively-lit characters as user scrolls */
function ProgressiveText({ text, className = "" }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const start = wh * 0.85;
      const end   = wh * 0.2;
      const traveled = (start - r.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, traveled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  const chars = useMemo(() => Array.from(text), [text]);
  const total = chars.length;
  return (
    <p ref={ref} className={`scroll-reveal-text ${className}`}>
      {chars.map((c, i) => {
        const t = i / total;
        const lit = progress >= t - 0.02;
        return <span key={i} className={`reveal-char ${lit ? "lit" : ""}`}>{c}</span>;
      })}
    </p>
  );
}

/* ====== Nav ====== */
function Nav({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    onS(); window.addEventListener("scroll", onS, { passive: true });
    return () => window.removeEventListener("scroll", onS);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href="#top" className="nav-mark">Toldos Venecianos<sup>*</sup></a>
      <div className="nav-links">
        <a href="#catalogo">{t.nav.catalogue}</a>
        <a href="#materiales">{t.nav.materials}</a>
        <a href="#estudio">{t.nav.studio}</a>
        <a href="#contacto">{t.nav.contact}</a>
      </div>
      <div className="lang-toggle">
        <button onClick={() => setLang("es")} className={lang === "es" ? "active" : ""}>ES</button>
        <span style={{ opacity: 0.4 }}>/</span>
        <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>EN</button>
      </div>
    </nav>
  );
}

/* ====== Hero ====== */
function Hero({ t }) {
  return (
    <header className="hero" id="top">
      <div className="sun"></div>
      <div className="sun sun-2"></div>
      <div className="slat-drift"></div>

      <div className="shell hero-inner">
        <div className="hero-tag reveal in" style={{ paddingTop: 32 }}>
          <span>{t.hero.eyebrow}</span>
        </div>

        <div>
          <h1 className="hero-title">
            <WordsPullUp as="span" text="Toldos" className="word" />
            <WordsPullUp as="span" text={t.hero.titleB} className="word word-2" delay={200} />
          </h1>

          <div className="hero-row">
            <p className="lede">
              {t.hero.lede1} <em>{t.hero.lede2}</em> {t.hero.lede3}
            </p>
            <div className="actions">
              <a href="#contacto" className="btn">
                {t.hero.cta}
                <span className="dot" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </a>
              <a href="#catalogo" className="btn-ghost">{t.hero.cta2}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 9l6 6 6-6"/></svg>
              </a>
            </div>
          </div>

          <div className="hero-meta">
            <div className="col"><strong>{t.hero.met1.t}</strong>{t.hero.met1.s}</div>
            <div className="col"><strong>{t.hero.met2.t}</strong>{t.hero.met2.s}</div>
            <div className="col"><strong>{t.hero.met3.t}</strong>{t.hero.met3.s}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ====== Marquee strip ====== */
function Marquee({ t }) {
  const items = t.marquee;
  const all = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((it, i) => <span key={i}>{it}</span>)}
      </div>
    </div>
  );
}

/* ====== Catálogo ====== */
function Catalogo({ t }) {
  return (
    <section className="section" id="catalogo">
      <div className="shell">
        <div className="section-head">
          <span className="num">01 — {t.cat.eyebrow}</span>
          <h2><WordsPullUp text={t.cat.titleA} /> <em><WordsPullUp text={t.cat.titleB} delay={200} /></em></h2>
          <span className="meta">{t.cat.meta}</span>
        </div>

        {t.cat.items.map((p, i) => {
          const [ref, vis] = useReveal();
          return (
            <article key={i} className={`product reveal ${vis ? "in" : ""}`} ref={ref}>
              <div className="product-media">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <div className="product-body">
                <span className="product-index">{`0${i + 1}  /  ${String(t.cat.items.length).padStart(2, "0")}`}</span>
                <h3 className="nm">{p.name} <em>{p.nameItalic}</em></h3>
                <p className="copy">{p.copy}</p>
                <div className="specs">
                  {p.specs.map((s, j) => <span className="spec" key={j}>{s}</span>)}
                </div>
                <a className="btn-ghost" href="#contacto" style={{ marginTop: 8 }}>
                  {t.cat.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ====== Materiales ====== */
function Materiales({ t }) {
  const swatches = [
    { bg: "linear-gradient(125deg, #c5996a 0%, #8b5a2b 60%, #5e3a1c 100%)", dark: true,  name: t.mat.s1.n, sub: t.mat.s1.s },
    { bg: "linear-gradient(115deg, #d4b483 0%, #a47148 70%, #6b4423 100%)", dark: true,  name: t.mat.s2.n, sub: t.mat.s2.s },
    { bg: "linear-gradient(135deg, #e6e1d6 0%, #a8a39a 50%, #6f6a60 100%)", dark: false, name: t.mat.s3.n, sub: t.mat.s3.s },
    { bg: "linear-gradient(120deg, #8a7150 0%, #5e4a30 60%, #2c2418 100%)", dark: true,  name: t.mat.s4.n, sub: t.mat.s4.s },
    { bg: "linear-gradient(130deg, #f0e8d6 0%, #cdbf9d 60%, #9a8b66 100%)", dark: false, name: t.mat.s5.n, sub: t.mat.s5.s },
    { bg: "linear-gradient(140deg, #2a2a26 0%, #46453d 50%, #6b685c 100%)", dark: true,  name: t.mat.s6.n, sub: t.mat.s6.s },
  ];
  return (
    <section className="section" id="materiales">
      <div className="shell">
        <div className="section-head">
          <span className="num">02 — {t.mat.eyebrow}</span>
          <h2><WordsPullUp text={t.mat.titleA} /> <em><WordsPullUp text={t.mat.titleB} delay={200} /></em></h2>
          <span className="meta">{t.mat.meta}</span>
        </div>

        <div className="materials-grid">
          {swatches.map((s, i) => {
            const [ref, vis] = useReveal();
            return (
              <div
                key={i}
                ref={ref}
                className={`swatch ${s.dark ? "dark" : ""} reveal ${vis ? "in" : ""}`}
                style={{ ["--swatch-bg"]: s.bg, transitionDelay: `${i * 80}ms` }}
              >
                <div className="swatch-content">
                  <span className="sub">{`0${i + 1} · ${s.sub}`}</span>
                  <span className="label">{s.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ====== Estudio ====== */
function Estudio({ t }) {
  return (
    <section className="section" id="estudio">
      <div className="shell">
        <div className="section-head">
          <span className="num">04 — {t.est.eyebrow}</span>
          <h2><WordsPullUp text={t.est.titleA} /> <em><WordsPullUp text={t.est.titleB} delay={200} /></em></h2>
          <span className="meta">{t.est.meta}</span>
        </div>

        <div className="estudio">
          <div>
            <figure className="estudio-figure">
              <img src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&q=80&auto=format&fit=crop" alt="Taller" loading="lazy" />
            </figure>
            <figcaption className="estudio-figcaption">{t.est.figcap}</figcaption>
          </div>

          <div className="estudio-prose">
            <ProgressiveText text={t.est.p1} />
            <p style={{ marginTop: 24 }}><em>{t.est.p2}</em></p>

            <div className="stats">
              <div className="stat"><div className="num-big">26</div><div className="lab">{t.est.s1}</div></div>
              <div className="stat"><div className="num-big">1.400</div><div className="lab">{t.est.s2}</div></div>
              <div className="stat"><div className="num-big">60</div><div className="lab">{t.est.s3}</div></div>
              <div className="stat"><div className="num-big">2</div><div className="lab">{t.est.s4}</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== Contacto ====== */
function Contacto({ t }) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className="section contact" id="contacto">
      <div className="shell">
        <div className="section-head">
          <span className="num" style={{ color: "var(--cream)" }}>05 — {t.con.eyebrow}</span>
          <h2 style={{ color: "var(--cream)" }}><WordsPullUp text={t.con.titleA} /> <em><WordsPullUp text={t.con.titleB} delay={200} /></em></h2>
          <span className="meta">{t.con.meta}</span>
        </div>

        <div className="contact-grid">
          <form onSubmit={onSubmit}>
            <div className="field-row">
              <div className="field">
                <label>{t.con.f.name}</label>
                <input required placeholder={t.con.f.namePh} />
              </div>
              <div className="field">
                <label>{t.con.f.email}</label>
                <input required type="email" placeholder="hola@ejemplo.com" />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>{t.con.f.loc}</label>
                <input placeholder={t.con.f.locPh} />
              </div>
              <div className="field">
                <label>{t.con.f.type}</label>
                <select defaultValue="">
                  <option value="" disabled>{t.con.f.typePh}</option>
                  <option>{t.con.f.opt1}</option>
                  <option>{t.con.f.opt2}</option>
                  <option>{t.con.f.opt3}</option>
                  <option>{t.con.f.opt4}</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label>{t.con.f.msg}</label>
              <textarea rows="3" placeholder={t.con.f.msgPh}></textarea>
            </div>
            <button type="submit" className="btn btn-light">
              {sent ? t.con.f.sent : t.con.f.send}
              <span className="dot">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </span>
            </button>
          </form>

          <aside className="contact-aside">
            <div className="item">
              <div className="lab">{t.con.a.show}</div>
              <div className="val">C/ Ribera de Curtidores 24<br/>Madrid · 28005</div>
              <div className="val" style={{ opacity: 0.7, marginTop: 8 }}>Pasaje del Aire 6<br/>Sevilla · 41010</div>
            </div>
            <div className="item">
              <div className="lab">{t.con.a.hours}</div>
              <div className="val">Lun — Vie · 09:30 — 19:00<br/>Sáb · 10:00 — 14:00</div>
            </div>
            <div className="item">
              <div className="lab">{t.con.a.direct}</div>
              <div className="val">+34 910 22 14 80<br/>hola@toldovenecianos.es</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ====== Footer ====== */
function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="shell row">
        <span style={{ fontFamily: "Italiana, serif", fontSize: 16, letterSpacing: "0.02em", opacity: 1 }}>
          Toldos Venecianos<sup style={{ fontSize: "0.55em", marginLeft: 2, opacity: 0.6 }}>*</sup>
        </span>
        <span>© 2026 · {t.foot.craft}</span>
        <span>{t.foot.note}</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Marquee, Catalogo, Materiales, Estudio, Contacto, Footer });
