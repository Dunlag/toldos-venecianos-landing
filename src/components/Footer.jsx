export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="shell row">
        <span style={{ fontFamily: 'Italiana, serif', fontSize: 16, letterSpacing: '0.02em', opacity: 1 }}>
          Toldos Venecianos
          <sup style={{ fontSize: '0.55em', marginLeft: 2, opacity: 0.6 }}>*</sup>
        </span>
        <span>© 2026 · {t.foot.craft}</span>
        <span>{t.foot.note}</span>
      </div>
    </footer>
  )
}
