# Toldos Venecianos — Landing Page

Landing page editorial para **Toldos Venecianos**, empresa de persianas venecianas y toldos a medida con talleres en Madrid y Sevilla.

Desarrollada como pieza de portfolio con identidad visual minimalista, animaciones scroll-driven y configurador interactivo de lamas.

**[Ver en vivo →](https://dunlag.github.io/toldos-venecianos-landing/)**

---

## Stack

- **React 18** + **Vite 5**
- **CSS Modules** — estilos encapsulados por componente
- **GitHub Pages** — deploy automático vía GitHub Actions

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173/toldos-venecianos-landing/](http://localhost:5173/toldos-venecianos-landing/)

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` se ejecuta automáticamente en cada push a `main`.

Pasos iniciales (solo una vez):
1. Crea el repositorio en GitHub como `toldos-venecianos-landing`
2. Ve a **Settings → Pages → Source** y selecciona **GitHub Actions**
3. `git push origin main` — el primer deploy se lanza solo

## Estructura del proyecto

```
src/
├── components/         # Un componente por sección + su CSS Module
│   ├── Nav.jsx / Nav.module.css
│   ├── Hero.jsx / Hero.module.css
│   ├── Marquee.jsx / Marquee.module.css
│   ├── Catalogo.jsx / Catalogo.module.css
│   ├── Materiales.jsx / Materiales.module.css
│   ├── Atelier.jsx / Atelier.module.css   ← configurador interactivo
│   ├── Estudio.jsx / Estudio.module.css
│   ├── Contacto.jsx / Contacto.module.css
│   ├── Footer.jsx / Footer.module.css
│   ├── WordsPullUp.jsx                    ← animación de palabras
│   └── ProgressiveText.jsx                ← texto que se ilumina al scroll
├── data/
│   └── copy.js         # Textos ES / EN
├── hooks/
│   └── useReveal.js    # IntersectionObserver hook
├── App.jsx
├── main.jsx
└── index.css           # Tokens CSS globales, resets, animaciones
```

## Funcionalidades

- **Bilingüe ES/EN** — toggle en el nav
- **Scroll-driven** — lamas de persiana que se abren al hacer scroll
- **Reflejos solares** animados en el hero
- **Atelier** — configurador interactivo: material (cedro, teca, aluminio, bronce), ancho de lama (25/35/50 mm) e inclinación (−80° a +80°)
- **Revelar al scroll** — pull-up de palabras y texto progresivo carácter a carácter
