import { useState, useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Catalogo from './components/Catalogo.jsx'
import Materiales from './components/Materiales.jsx'
import Atelier from './components/Atelier.jsx'
import Estudio from './components/Estudio.jsx'
import Contacto from './components/Contacto.jsx'
import Footer from './components/Footer.jsx'
import COPY from './data/copy.js'

export default function App() {
  const [lang, setLang] = useState('es')
  const t = COPY[lang]

  useEffect(() => {
    const onScroll = () => {
      const wh = window.innerHeight
      const p = Math.min(1, Math.max(0, window.scrollY / (wh * 1.2)))
      document.documentElement.style.setProperty('--slat-open', String(p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="slats" aria-hidden="true" />
      <Nav t={t} lang={lang} setLang={setLang} />
      <main id="main">
        <Hero t={t} />
        <Marquee t={t} />
        <Catalogo t={t} />
        <Materiales t={t} />
        <Atelier lang={lang} />
        <Estudio t={t} />
        <Contacto t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
