const EmptyState = ({ icon, title, message, actionLabel, onAction, className = '' }) => {
    const Icon = icon
    return (
        <div className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-300 py-16 text-center dark:border-neutral-700 ${className}`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Icon size={24} className="text-neutral-400 dark:text-neutral-500" />
            </div>
            <div>
                <p className="text-base font-medium text-neutral-900 dark:text-white">{title}</p>
                {message && <p className="mt-1 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">{message}</p>}
            </div>
            {actionLabel && onAction && (
                <button
                    type="button"
                    onClick={onAction}
                    className="mt-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-500"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    )
}

export default EmptyState
