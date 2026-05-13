import WordsPullUp from './WordsPullUp.jsx'
import useReveal from '../hooks/useReveal.js'

function ProductItem({ p, index, total, cta }) {
  const [ref, vis] = useReveal()
  return (
    <article ref={ref} className={`product reveal ${vis ? 'in' : ''}`}>
      <div className="product-media">
        <img
          src={p.img}
          alt={`${p.name} ${p.nameItalic} — Toldos Venecianos`}
          loading="lazy"
          width="800"
          height="1000"
        />
      </div>
      <div className="product-body">
        <span className="product-index">
          {`0${index + 1}  /  ${String(total).padStart(2, '0')}`}
        </span>
        <h3 className="nm">
          {p.name} <em>{p.nameItalic}</em>
        </h3>
        <p className="copy">{p.copy}</p>
        <div className="specs">
          {p.specs.map((s, j) => (
            <span className="spec" key={j}>{s}</span>
          ))}
        </div>
        <a className="btn-ghost" href="#contacto" style={{ marginTop: 8 }}>
          {cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </article>
  )
}

export default function Catalogo({ t }) {
  return (
    <section className="section" id="catalogo">
      <div className="shell">
        <div className="section-head">
          <span className="num">01 — {t.cat.eyebrow}</span>
          <h2>
            <WordsPullUp text={t.cat.titleA} />
            {' '}<em><WordsPullUp text={t.cat.titleB} delay={200} /></em>
          </h2>
          <span className="meta">{t.cat.meta}</span>
        </div>

        {t.cat.items.map((p, i) => (
          <ProductItem
            key={i}
            p={p}
            index={i}
            total={t.cat.items.length}
            cta={t.cat.cta}
          />
        ))}
      </div>
    </section>
  )
}
