import useReveal from '../hooks/useReveal.js'

export default function WordsPullUp({ text, className = '', as: Tag = 'span', delay = 0 }) {
  const [ref, vis] = useReveal()
  const words = String(text).split(/\s+/)
  return (
    <Tag ref={ref} className={`reveal-words ${vis ? 'in' : ''} ${className}`}>
      {words.map((w, i) => (
        <span className="w" key={i}>
          <span style={{ transitionDelay: `${delay + i * 60}ms` }}>
            {w}{i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
