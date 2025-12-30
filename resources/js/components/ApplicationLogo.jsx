
export default function ApplicationLogo(props) {
    return (
    <div className="text-center leading-tight">
        <img
            {...props}
            src="/FoodieLand-logo.png"
            alt="Logo Marjane"
            className="h-20"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400 block -mt-4">
            Application Recette de cuisine
        </span>
    </div>
    );
}
