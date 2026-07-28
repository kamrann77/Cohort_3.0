import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../Context/ThemeContext'

const ThemeToggle = ({ className = '' }) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className={`flex items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 transition-colors duration-150 hover:bg-neutral-50 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white ${className}`}
        >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
    )
}

export default ThemeToggle
