import WordsPullUp from './WordsPullUp.jsx'
import useReveal from '../hooks/useReveal.js'

const SWATCH_BG = [
  'linear-gradient(125deg, #c5996a 0%, #8b5a2b 60%, #5e3a1c 100%)',
  'linear-gradient(115deg, #d4b483 0%, #a47148 70%, #6b4423 100%)',
  'linear-gradient(135deg, #e6e1d6 0%, #a8a39a 50%, #6f6a60 100%)',
  'linear-gradient(120deg, #8a7150 0%, #5e4a30 60%, #2c2418 100%)',
  'linear-gradient(130deg, #f0e8d6 0%, #cdbf9d 60%, #9a8b66 100%)',
  'linear-gradient(140deg, #2a2a26 0%, #46453d 50%, #6b685c 100%)',
]

const SWATCH_DARK = [true, true, false, true, false, true]

function SwatchItem({ bg, dark, name, sub, delay }) {
  const [ref, vis] = useReveal()
  return (
    <div
      ref={ref}
      className={`swatch ${dark ? 'dark' : ''} reveal ${vis ? 'in' : ''}`}
      style={{ '--swatch-bg': bg, transitionDelay: `${delay}ms` }}
    >
      <div className="swatch-content">
        <span className="sub">{sub}</span>
        <span className="label">{name}</span>
      </div>
    </div>
  )
}

export default function Materiales({ t }) {
  const keys = ['s1', 's2', 's3', 's4', 's5', 's6']
  return (
    <section className="section" id="materiales">
      <div className="shell">
        <div className="section-head">
          <span className="num">02 — {t.mat.eyebrow}</span>
          <h2>
            <WordsPullUp text={t.mat.titleA} />
            {' '}<em><WordsPullUp text={t.mat.titleB} delay={200} /></em>
          </h2>
          <span className="meta">{t.mat.meta}</span>
        </div>

        <div className="materials-grid">
          {keys.map((k, i) => (
            <SwatchItem
              key={k}
              bg={SWATCH_BG[i]}
              dark={SWATCH_DARK[i]}
              name={t.mat[k].n}
              sub={`0${i + 1} · ${t.mat[k].s}`}
              delay={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
