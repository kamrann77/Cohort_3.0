import { Link } from 'react-router'

const SIZES = {
    sm: { badge: 'h-8 w-8 rounded-lg', mark: 'h-4 w-4', text: 'text-lg' },
    md: { badge: 'h-10 w-10 rounded-xl', mark: 'h-5 w-5', text: 'text-xl' },
    lg: { badge: 'h-12 w-12 rounded-2xl', mark: 'h-6 w-6', text: 'text-2xl' },
}

const LogoMark = ({ className }) => (
    <svg viewBox="0 0 512 512" className={className} fill="currentColor" aria-hidden="true">
        <polygon points="136,376 136,136 176,136 256,216 336,136 376,136 376,376 336,376 336,206 256,286 176,206 176,376" />
    </svg>
)

const Logo = ({ size = 'md', to, wordmark = true, className = '' }) => {
    const s = SIZES[size]
    const content = (
        <span className={`flex items-center gap-2.5 shrink-0 ${className}`}>
            <span className={`${s.badge} bg-indigo-600 flex items-center justify-center shrink-0`}>
                <LogoMark className={`${s.mark} text-white`} />
            </span>
            {wordmark && (
                <span className={`${s.text} font-display font-medium text-neutral-900 dark:text-white whitespace-nowrap`}>
                    Marque
                </span>
            )}
        </span>
    )

    return to ? (
        <Link to={to} className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg">
            {content}
        </Link>
    ) : content
}

export default Logo
