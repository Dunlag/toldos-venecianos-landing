import { useState } from 'react'
import WordsPullUp from './WordsPullUp.jsx'

export default function Contacto({ t }) {
  const [sent, setSent] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact" id="contacto">
      <div className="shell">
        <div className="section-head">
          <span className="num" style={{ color: 'var(--cream)' }}>05 — {t.con.eyebrow}</span>
          <h2 style={{ color: 'var(--cream)' }}>
            <WordsPullUp text={t.con.titleA} />
            {' '}<em><WordsPullUp text={t.con.titleB} delay={200} /></em>
          </h2>
          <span className="meta">{t.con.meta}</span>
        </div>

        <div className="contact-grid">
          <form onSubmit={onSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="contact-name">{t.con.f.name}</label>
                <input
                  id="contact-name"
                  required
                  placeholder={t.con.f.namePh}
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor="contact-email">{t.con.f.email}</label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  placeholder="hola@ejemplo.com"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="contact-loc">{t.con.f.loc}</label>
                <input
                  id="contact-loc"
                  placeholder={t.con.f.locPh}
                  autoComplete="postal-code"
                />
              </div>
              <div className="field">
                <label htmlFor="contact-type">{t.con.f.type}</label>
                <select id="contact-type" defaultValue="">
                  <option value="" disabled>{t.con.f.typePh}</option>
                  <option>{t.con.f.opt1}</option>
                  <option>{t.con.f.opt2}</option>
                  <option>{t.con.f.opt3}</option>
                  <option>{t.con.f.opt4}</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="contact-msg">{t.con.f.msg}</label>
              <textarea
                id="contact-msg"
                rows="3"
                placeholder={t.con.f.msgPh}
              />
            </div>
            <button type="submit" className="btn btn-light" disabled={sent}>
              {sent ? t.con.f.sent : t.con.f.send}
              <span className="dot" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </form>

          <aside className="contact-aside">
            <div className="item">
              <div className="lab">{t.con.a.show}</div>
              <div className="val">
                C/ Ribera de Curtidores 24<br />Madrid · 28005
              </div>
              <div className="val" style={{ opacity: 0.7, marginTop: 8 }}>
                Pasaje del Aire 6<br />Sevilla · 41010
              </div>
            </div>
            <div className="item">
              <div className="lab">{t.con.a.hours}</div>
              <div className="val">Lun — Vie · 09:30 — 19:00<br />Sáb · 10:00 — 14:00</div>
            </div>
            <div className="item">
              <div className="lab">{t.con.a.direct}</div>
              <div className="val">
                <a href="tel:+34910221480">+34 910 22 14 80</a><br />
                <a href="mailto:hola@toldosvenecianos.es">hola@toldosvenecianos.es</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
