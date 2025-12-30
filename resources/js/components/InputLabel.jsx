export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            // className={
            //     `block text-sm font-medium text-gray-700 dark:text-gray-300 ` +
            //     className
            // }
            className={`rounded-md border-gray-300 shadow-sm
                focus:border-indigo-500 focus:ring-indigo-500
                dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300
                dark:focus:border-indigo-600 dark:focus:ring-indigo-600
            ${className}`}
        >
            {value ? value : children}
        </label>
    );
}
