function withPeriod(s: string) {
    const trimmed = s.replace(/\s+$/, '')
    if (!trimmed) return trimmed
    return /[.!?]$/.test(trimmed) ? trimmed : trimmed + '.'
}

export function RichText({ text }: { text: string }) {
    const lines = text
        .replace(/\r/g, '')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => l.replace(/^[-•*]\s*/, ''))
        .filter(Boolean)
        .map(withPeriod)

    if (lines.length === 0) return null
    if (lines.length === 1) return <>{lines[0]}</>

    return (
        <div className="space-y-1.5">
            {lines.map((l, i) => (
                <p key={i}>{l}</p>
            ))}
        </div>
    )
}
