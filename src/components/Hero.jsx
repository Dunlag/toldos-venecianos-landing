import WordsPullUp from './WordsPullUp.jsx'

export default function Hero({ t }) {
  return (
    <header className="hero" id="top">
      <div className="sun" aria-hidden="true" />
      <div className="sun sun-2" aria-hidden="true" />
      <div className="slat-drift" aria-hidden="true" />

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
                <span className="dot" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a href="#catalogo" className="btn-ghost">
                {t.hero.cta2}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-meta">
            <div className="col">
              <strong>{t.hero.met1.t}</strong>
              {t.hero.met1.s}
            </div>
            <div className="col">
              <strong>{t.hero.met2.t}</strong>
              {t.hero.met2.s}
            </div>
            <div className="col">
              <strong>{t.hero.met3.t}</strong>
              {t.hero.met3.s}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
