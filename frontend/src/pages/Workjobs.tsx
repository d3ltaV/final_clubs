import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ViewToggle, useViewMode } from '@/components/ViewToggle'
import { RichText } from '@/components/RichText'

type SortKey = 'name' | 'location'

type WorkjobRow = {
    name: string | null
    location: string | null
    supervisor: string | null
    supervisor_email: string | null
    spots: string | null
    blocks: string | null
    selected_or_assigned: string | null
    description: string | null
    notes: string | null
}

export default function Workjobs() {
    const [rows, setRows] = useState<WorkjobRow[]>([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const [view, setView] = useViewMode('workjobsView')
    const [expanded, setExpanded] = useState<number | null>(null)
    const [sort, setSort] = useState<SortKey>('name')
    const [descending, setDescending] = useState(false)
    const hasFetchedOnce = useRef(false)

    const sorted = useMemo(() => {
        const list = [...rows].sort((a, b) => {
            if (sort === 'name') return (a.name || '').localeCompare(b.name || '')
            return (a.location || '').localeCompare(b.location || '')
        })
        if (descending) list.reverse()
        return list
    }, [rows, sort, descending])

    // First load — total count baseline.
    useEffect(() => {
        fetch('/api/search?s=workjobs')
            .then((r) => r.json())
            .then((data: WorkjobRow[]) => setTotal(data.length))
    }, [])

    // Debounce the search input.
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(query), 200)
        return () => clearTimeout(t)
    }, [query])

    // Search / filter fetch.
    useEffect(() => {
        setLoading(true)
        const q = debouncedQuery.trim()
        const url = q
            ? `/api/search?q=${encodeURIComponent(q)}&s=workjobs`
            : '/api/search?s=workjobs'
        fetch(url)
            .then((r) => r.json())
            .then((data: WorkjobRow[]) => {
                setRows(data)
                setLoading(false)
                hasFetchedOnce.current = true
            })
    }, [debouncedQuery])

    return (
        <div
            className="mx-auto"
            style={{
                maxWidth: 1120,
                padding: 'clamp(24px, 5vh, 48px) clamp(16px, 3vw, 32px) 64px',
            }}
        >
            {/* Frosted header block. */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="dir-header"
            >
                <h1>Workjobs Directory</h1>

                <div className="relative mb-3">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name, location, or description..."
                        className="h-[46px] rounded-none border-black/25 bg-white/80 pl-11 text-base font-medium focus-visible:border-black/35 focus-visible:ring-[3px] focus-visible:ring-sky/50"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <ChipSelect
                        label="Sort"
                        value={sort}
                        onChange={(v) => setSort(v as SortKey)}
                        options={[
                            { value: 'name', label: 'Workjob Name' },
                            { value: 'location', label: 'Workjob Location' },
                        ]}
                    />
                    <label className="ml-1 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                        <Checkbox
                            checked={descending}
                            onCheckedChange={(v) => setDescending(v === true)}
                            className="rounded-none border-black/40 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
                        />
                        Descending
                    </label>
                </div>

                <div className="results-info-row">
                    <p className="text-[0.88rem] font-normal text-muted-foreground">
                        {loading
                            ? 'Loading workjobs...'
                            : sorted.length === total
                            ? 'Showing all workjobs!'
                            : `Showing ${sorted.length} of ${total} workjob${total !== 1 ? 's' : ''}`}
                    </p>
                    <ViewToggle mode={view} onChange={setView} />
                </div>
            </motion.div>

            {/* Advisory notice — matches the Flask disclaimer. */}
            <div className="mb-4 flex items-baseline gap-3 border border-black/10 bg-white/70 p-4 text-[0.88rem] leading-relaxed text-muted-foreground backdrop-blur-md">
                <span className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy opacity-85">
                    Note
                </span>
                <span>This is for informational purposes only. Please do not excessively request workjobs.</span>
            </div>

            {view === 'list' ? (
                <div className="dir-list">
                    {sorted.map((j, i) => {
                        const isOpen = expanded === i
                        const hasDetail = Boolean(j.description || j.notes)
                        return (
                            <div key={(j.name || '') + i} className="dir-list-item">
                                <button
                                    type="button"
                                    className="dir-list-row"
                                    aria-expanded={hasDetail ? isOpen : undefined}
                                    disabled={!hasDetail}
                                    onClick={hasDetail ? () => setExpanded(isOpen ? null : i) : undefined}
                                >
                                    <span className="dir-list-title">{j.name || 'Untitled Position'}</span>
                                    <span className="dir-list-meta">
                                        {j.location && <span className="pill">{j.location}</span>}
                                    </span>
                                    {hasDetail && <span className="dir-list-arrow" aria-hidden>→</span>}
                                </button>
                                {isOpen && hasDetail && (
                                    <div className="dir-list-detail">
                                        {j.description && (
                                            <div className="mt-1 border-t border-black/15 pt-2.5 text-[0.9rem] leading-relaxed text-muted-foreground">
                                                <span className="font-semibold text-foreground">Description: </span>
                                                <RichText text={j.description} />
                                            </div>
                                        )}
                                        {j.notes && (
                                            <div className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                                                <span className="font-semibold text-foreground">Note: </span>
                                                {j.notes}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            ) : (
            <div className="dir-grid">
                {loading && !hasFetchedOnce.current &&
                    Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-56 w-full rounded-none" />
                    ))}
                {(!loading || hasFetchedOnce.current) &&
                    sorted.map((j, i) => (
                        <motion.div
                            key={(j.name || '') + i}
                            initial={hasFetchedOnce.current ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.4) }}
                            className="dir-card"
                        >
                                <h3 className="mb-2.5 text-[1.15rem] font-bold leading-tight text-foreground">
                                    {j.name || 'Untitled Position'}
                                </h3>

                                <span className="mb-3 inline-block self-start bg-white/70 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.09em] text-navy">
                                    {j.location || 'Location TBD'}
                                </span>

                                {j.description && (
                                    <div className="mt-2.5 border-t border-black/15 pt-2.5 text-[0.9rem] leading-relaxed text-muted-foreground">
                                        <span className="font-semibold text-foreground">Description: </span>
                                        <RichText text={j.description} />
                                    </div>
                                )}

                                {j.notes && (
                                    <div className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                                        <span className="font-semibold text-foreground">Note: </span>
                                        {j.notes}
                                    </div>
                                )}
                        </motion.div>
                    ))}
            </div>
            )}

            {!loading && sorted.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-14 border border-dashed border-black/28 bg-white/50 p-14 text-center backdrop-blur-sm"
                >
                    <h2 className="text-lg font-medium text-foreground">No workjobs found</h2>
                    <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search.</p>
                </motion.div>
            )}
        </div>
    )
}

function ChipSelect({
    label,
    value,
    onChange,
    options,
}: {
    label: string
    value: string
    onChange: (v: string) => void
    options: { value: string; label: string }[]
}) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="h-9 w-auto min-w-0 gap-2 rounded-none border-navy/25 bg-white/72 px-3 text-[0.85rem] font-medium text-navy focus:ring-0 focus-visible:ring-2 focus-visible:ring-sky/40 [&>span:last-child]:hidden">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                </span>
                <Separator orientation="vertical" className="h-4 bg-navy/20" />
                <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none border-black/18 bg-white/92 backdrop-blur-xl">
                {options.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="rounded-none">
                        {o.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
