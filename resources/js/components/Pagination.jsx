import { router } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (!links || links.length <= 1) return null;

    return (
        <nav className="flex justify-center mt-6 gap-2 flex-wrap select-none">
            {links.map((link, index) => (
                <button
                    key={index}
                    disabled={!link.url}
                    onClick={() => router.visit(link.url, { preserveScroll: true })}
                    className={`
                        px-3 py-1 rounded-lg text-sm transition border
                        ${link.active
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }
                        ${!link.url ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    `}
                    dangerouslySetInnerHTML={{
                        __html:
                            link.label.includes("Previous")
                                ? "&laquo; Précédent"
                            : link.label.includes("Next")
                                ? "Suivant &raquo;"
                            : link.label
                    }}
                />
            ))}
        </nav>
    );
}
