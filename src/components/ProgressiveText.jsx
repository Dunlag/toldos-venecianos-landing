import { useRef, useState, useEffect, useMemo } from 'react'

export default function ProgressiveText({ text, className = '' }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const wh = window.innerHeight
      const start = wh * 0.85
      const end = wh * 0.2
      const traveled = (start - r.top) / (start - end)
      setProgress(Math.max(0, Math.min(1, traveled)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const chars = useMemo(() => Array.from(text), [text])
  const total = chars.length

  return (
    <p ref={ref} className={`scroll-reveal-text ${className}`}>
      {chars.map((c, i) => {
        const t = i / total
        const lit = progress >= t - 0.02
        return (
          <span key={i} className={`reveal-char ${lit ? 'lit' : ''}`}>
            {c}
          </span>
        )
      })}
    </p>
  )
}
