import { useState, useEffect } from 'react'

export default function Nav({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40)
    onS()
    window.addEventListener('scroll', onS, { passive: true })
    return () => window.removeEventListener('scroll', onS)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="nav-mark">
        Toldos Venecianos<sup>*</sup>
      </a>
      <div className="nav-links">
        <a href="#catalogo">{t.nav.catalogue}</a>
        <a href="#materiales">{t.nav.materials}</a>
        <a href="#estudio">{t.nav.studio}</a>
        <a href="#contacto">{t.nav.contact}</a>
      </div>
      <div className="lang-toggle">
        <button
          onClick={() => setLang('es')}
          className={lang === 'es' ? 'active' : ''}
          aria-pressed={lang === 'es'}
        >
          ES
        </button>
        <span aria-hidden="true" style={{ opacity: 0.4 }}>/</span>
        <button
          onClick={() => setLang('en')}
          className={lang === 'en' ? 'active' : ''}
          aria-pressed={lang === 'en'}
        >
          EN
        </button>
      </div>
    </nav>
  )
}
