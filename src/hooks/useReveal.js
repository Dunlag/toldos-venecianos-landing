import { useRef, useState, useEffect } from 'react'

export default function useReveal(opts = {}) {
  const { threshold = 0.2, once = true, rootMargin = '0px 0px -10% 0px' } = opts
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            if (once) io.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, visible]
}
