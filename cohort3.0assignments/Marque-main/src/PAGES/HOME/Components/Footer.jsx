import React from 'react'
import Logo from '../../../components/Logo'

const Footer = () => {
    return (
        <footer className="mt-12 border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6 lg:px-8">
                <Logo size="sm" wordmark={false} />
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    &copy; 2026 Marque · Built by ❤️ with React
                </p>
            </div>
        </footer>
    )
}

export default Footer
