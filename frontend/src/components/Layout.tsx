import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SceneBackground } from '@/components/SceneBackground'
import { FallingPetals } from '@/components/FallingPetals'

const nav = [
    { to: '/', label: 'Home' },
    { to: '/clubs', label: 'Student Groups' },
    { to: '/map', label: 'Campus Map' },
    // { to: '/classes', label: 'Classes' },        // Data not ready — hidden for now.
    { to: '/workjobs', label: 'Workjobs' },
    // { to: '/cocurriculars', label: 'Cocurriculars' },  // Data not ready — hidden for now.
    { to: '/resources', label: 'Resources' },
]

export function Layout() {
    const [navOpen, setNavOpen] = useState(false)
    const location = useLocation()

    // Auto-close the mobile sidebar on route change.
    useEffect(() => {
        setNavOpen(false)
    }, [location.pathname])

    // Lock body scroll while the mobile sidebar is open.
    useEffect(() => {
        if (!navOpen) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [navOpen])

    return (
        <div className="relative min-h-screen">
            <SceneBackground />
            <FallingPetals />

            {/* Header — height + padding match the Flask site (68px min, 10px vertical,
                horizontal clamp(16, 3vw, 40)). */}
            <header
                className="header-bg sticky top-0 z-50 flex items-center gap-3 border-b border-black/10 backdrop-blur-xl sm:gap-6"
                style={{
                    minHeight: 68,
                    padding: '10px clamp(12px, 3vw, 40px)',
                }}
            >
                {/* Mobile-only hamburger. Hidden from md up where the inline nav takes over. */}
                <button
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={navOpen}
                    onClick={() => setNavOpen(true)}
                    className="-ml-1 inline-flex h-10 w-10 shrink-0 items-center justify-center text-navy transition-colors hover:text-crimson md:hidden"
                >
                    <Menu className="h-6 w-6" />
                </button>

                <NavLink to="/" className="flex items-center gap-2 shrink-0 no-underline sm:gap-2.5">
                    <img src="/static/images/pig.png" alt="" className="h-9 w-auto sm:h-11" />
                    <span className="text-[0.95rem] font-semibold tracking-tight text-navy sm:text-[1.1rem]">
                        <span className="sm:hidden">Hogger News</span>
                        <span className="hidden sm:inline">Hogger News Wayfinder</span>
                    </span>
                </NavLink>

                {/* Desktop inline nav — hidden on phones; the hamburger opens a side panel instead. */}
                <nav className="ml-auto hidden min-w-0 items-center gap-1 md:flex">
                    {nav.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                cn(
                                    'relative whitespace-nowrap px-3 py-2 text-[0.92rem] font-medium text-muted-foreground transition-colors no-underline',
                                    'hover:text-navy',
                                    'after:absolute after:bottom-[2px] after:left-3 after:right-3 after:h-[1.5px] after:bg-navy after:origin-left after:scale-x-0',
                                    'after:transition-transform after:duration-[280ms] after:ease-[cubic-bezier(0.4,0,0.2,1)]',
                                    'hover:after:scale-x-100',
                                    isActive && 'text-foreground after:scale-x-100'
                                )
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </header>

            {/* Mobile slide-in sidebar — backdrop + left panel. */}
            <AnimatePresence>
                {navOpen && (
                    <>
                        <motion.div
                            key="nav-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setNavOpen(false)}
                            className="fixed inset-0 z-[70] bg-navy/25 backdrop-blur-sm md:hidden"
                            aria-hidden
                        />
                        <motion.aside
                            key="nav-panel"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.28 }}
                            className="fixed inset-y-0 left-0 z-[80] flex w-[62vw] max-w-[240px] flex-col border-r border-black/15 bg-white/55 shadow-lg backdrop-blur-xl backdrop-saturate-150 md:hidden"
                        >
                            <div className="flex items-center justify-between border-b border-black/10 px-4" style={{ minHeight: 56 }}>
                                <div className="flex items-center gap-2">
                                    <img src="/static/images/pig.png" alt="" className="h-7 w-auto" />
                                    <span className="text-[0.9rem] font-semibold tracking-tight text-navy">
                                        Hogger News
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Close menu"
                                    onClick={() => setNavOpen(false)}
                                    className="inline-flex h-8 w-8 items-center justify-center text-navy/80 transition-colors hover:text-crimson"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                            <nav className="flex flex-1 flex-col px-4 py-4">
                                {nav.map(({ to, label }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        end={to === '/'}
                                        className={({ isActive }) =>
                                            cn(
                                                'relative inline-flex w-fit py-2.5 text-[0.95rem] font-medium text-foreground no-underline transition-colors',
                                                'hover:text-navy',
                                                'after:absolute after:bottom-[6px] after:left-0 after:right-0 after:h-[1.5px] after:bg-navy after:origin-left after:scale-x-0',
                                                'after:transition-transform after:duration-[280ms] after:ease-[cubic-bezier(0.4,0,0.2,1)]',
                                                'hover:after:scale-x-100',
                                                isActive && 'text-navy after:scale-x-100'
                                            )
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <main>
                <Outlet />
            </main>

            <footer aria-hidden className="byline">
                built by joelle '27, lorcan '26, and Hogger News staff <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem' }}>&lt;3</span>
            </footer>
        </div>
    )
}
