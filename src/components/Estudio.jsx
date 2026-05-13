import WordsPullUp from './WordsPullUp.jsx'
import ProgressiveText from './ProgressiveText.jsx'

export default function Estudio({ t }) {
  return (
    <section className="section" id="estudio">
      <div className="shell">
        <div className="section-head">
          <span className="num">04 — {t.est.eyebrow}</span>
          <h2>
            <WordsPullUp text={t.est.titleA} />
            {' '}<em><WordsPullUp text={t.est.titleB} delay={200} /></em>
          </h2>
          <span className="meta">{t.est.meta}</span>
        </div>

        <div className="estudio">
          <div>
            <figure className="estudio-figure">
              <img
                src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&q=80&auto=format&fit=crop"
                alt="Taller de fabricación de persianas venecianas de Toldos Venecianos en Madrid"
                loading="lazy"
                width="600"
                height="750"
              />
              <figcaption className="estudio-figcaption">{t.est.figcap}</figcaption>
            </figure>
          </div>

          <div className="estudio-prose">
            <ProgressiveText text={t.est.p1} />
            <p style={{ marginTop: 24 }}>
              <em>{t.est.p2}</em>
            </p>

            <div className="stats">
              <div className="stat">
                <div className="num-big">26</div>
                <div className="lab">{t.est.s1}</div>
              </div>
              <div className="stat">
                <div className="num-big">1.400</div>
                <div className="lab">{t.est.s2}</div>
              </div>
              <div className="stat">
                <div className="num-big">60</div>
                <div className="lab">{t.est.s3}</div>
              </div>
              <div className="stat">
                <div className="num-big">2</div>
                <div className="lab">{t.est.s4}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
