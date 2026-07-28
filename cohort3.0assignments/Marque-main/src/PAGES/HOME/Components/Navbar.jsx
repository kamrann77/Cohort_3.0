import React, { useContext, useState } from 'react'
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react'
import { MyStore } from '../../../Context/MyContext'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import Logo from '../../../components/Logo'
import ThemeToggle from '../../../components/ThemeToggle'

const NAV_LINKS = [
    { to: '/home', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
]

const iconButtonClass = 'flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors duration-150 hover:bg-neutral-50 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'

const Navbar = () => {
    const navigate = useNavigate()
    const { profile, setProfile, setCartToggle, cartData } = useContext(MyStore)
    const [mobileOpen, setMobileOpen] = useState(false)

    const navLinkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors duration-150 ${isActive
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
        }`

    const mobileNavLinkClass = ({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${isActive
            ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
            : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900'
        }`

    function handleLogout() {
        toast.error('Signed out')
        navigate('/')
        setProfile(null)
        localStorage.setItem('userProfile', null)
    }

    return (
        <header className="fixed top-0 z-20 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-950/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <Logo to="/home" size="sm" />

                <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
                    {NAV_LINKS.map((link) => (
                        <NavLink key={link.to} to={link.to} className={navLinkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle className="hidden h-9 w-9 sm:flex" />

                    {profile && (
                        <div className="hidden items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 sm:flex dark:border-neutral-800 dark:bg-neutral-900">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-600 text-xs font-semibold text-white">
                                {profile.name?.[0]?.toUpperCase()}
                            </span>
                            <span className="max-w-25 truncate text-sm text-neutral-600 dark:text-neutral-300">
                                {profile.name}
                            </span>
                        </div>
                    )}

                    <button
                        type="button"
                        aria-label="Open cart"
                        onClick={() => setCartToggle(true)}
                        className={`relative ${iconButtonClass}`}
                    >
                        <ShoppingCart size={16} />
                        {cartData.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-semibold text-white">
                                {cartData.length}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        aria-label="Log out"
                        onClick={handleLogout}
                        className={`hidden sm:flex ${iconButtonClass} hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-400`}
                    >
                        <LogOut size={16} />
                    </button>

                    <button
                        type="button"
                        aria-label="Toggle menu"
                        onClick={() => setMobileOpen((o) => !o)}
                        className={`md:hidden ${iconButtonClass}`}
                    >
                        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="border-t border-neutral-200 bg-white px-4 py-3 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
                    <nav className="flex flex-col gap-1" aria-label="Mobile">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setMobileOpen(false)}
                                className={mobileNavLinkClass}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="mt-3 flex items-center justify-between border-t border-neutral-200 pt-3 dark:border-neutral-800">
                        {profile && (
                            <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-600 text-xs font-semibold text-white">
                                    {profile.name?.[0]?.toUpperCase()}
                                </span>
                                <span className="text-sm text-neutral-600 dark:text-neutral-300">{profile.name}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <ThemeToggle className="h-9 w-9" />
                            <button type="button" aria-label="Log out" onClick={handleLogout} className={iconButtonClass}>
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar
