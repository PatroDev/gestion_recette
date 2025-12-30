import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Search, PlusSquare, Pencil, Trash2, Filter, UtensilsCrossed,
    FilterX,
    X,
    Eye
} from "lucide-react";
import { toast } from "sonner";
import Pagination from "@/components/Pagination";

export default function List({ recipes, categories }) {
    const { flash } = usePage().props;

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const applyFilters = () => {
        router.get(route("admin.dashboard"),
            { search, status: statusFilter, category_id: categoryFilter },
            { preserveState: true, replace: true }
        );
    };

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("");
        setCategoryFilter("");

        router.get(route("admin.dashboard"), {}, {
            preserveState: false,
            replace: true
        });
    };

    const handleDelete = (alias) => {
        if (!confirm("Voulez-vous supprimer cette recette ?")) return;
        router.delete(route("admin.recipes.destroy", alias), {
            onSuccess: () => toast.success("Recette supprimée"),
            onError: () => toast.error("Erreur lors de la suppression !")
        });
    };

    return (
        <>
            <div className="pb-10">

                {/* Top section */}
                <div className="flex flex-col sm:flex-row justify-center mb-6 items-center gap-3">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <UtensilsCrossed className="text-orange-600" />
                        Gestion des Recettes
                    </h2>

                    <Link
                        href={route("admin.recipes.create")}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow transition"
                    >
                        <PlusSquare size={22} /> Nouvelle recette
                    </Link>
                </div>

                {/* Search + Filters */}
                <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher une recette..."
                            className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                            onChange={(e) => setSearch(e.target.value)}
                            title="Cliquer sur Entrée pour rechercher"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>

                    <select
                        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="" className="font-bold">Statut</option>
                        <option value="1">Publié</option>
                        <option value="0">Brouillon</option>
                    </select>

                    <select
                        className="border rounded-lg px-6 py-2 focus:ring-2 focus:ring-blue-500"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="" className="font-bold">Catégories</option>
                        {categories?.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={applyFilters}
                            className="flex items-center font-bold bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black transition"
                        >
                        <Filter />  Filtrer
                        </button>

                        {(categoryFilter || statusFilter || search) && <button
                            onClick={resetFilters}
                            className="flex items-center font-bold px-3 py-1 bg-gray-300 hover:bg-gray-400 text-sm rounded"
                        >
                           <X /> Réinitialiser
                        </button>}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <div className="text-center font-bold text-lg">
                        <h2>Total des recettes : <span>{recipes?.total}</span></h2>
                    </div>
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Titre</th>
                                <th className="px-4 py-3 hidden md:table-cell text-center">Catégories</th>
                                <th className="px-4 py-3 hidden md:table-cell">Auteur</th>
                                <th className="px-4 py-3">Statut</th>
                                <th className="px-4 py-3 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recipes?.data?.length ? (
                                recipes.data.map((recipe) => (
                                    <tr key={recipe.id} className="border-t hover:bg-gray-50 text-center">
                                        <td className="px-4 py-3">
                                            <img
                                                src={
                                                    recipe.front_image
                                                        ? `/storage/${recipe.front_image}`
                                                        : "/images/no-image.jpg"
                                                }
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                        </td>

                                        <td className="px-4 py-3 font-medium">
                                            {recipe.title}
                                        </td>

                                        <td className="px-4 py-3 hidden md:table-cell">
                                            {recipe.categories?.map((cat) => (
                                                <span
                                                    key={cat.id}
                                                    className="bg-gray-200 font-bold text-gray-700 text-xs px-2 py-0.5 rounded-md mr-1"
                                                >
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </td>

                                        <td className="px-4 py-3 hidden md:table-cell">
                                            {recipe.author?.first_name ?? "—"}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-lg font-medium ${
                                                    recipe.status == 1
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-orange-100 text-orange-700"
                                                }`}
                                            >
                                                {recipe.status == 1
                                                    ? "Publié"
                                                    : "Brouillon"}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => router.visit(route("home.recipes.show", recipe.alias))}
                                                    className="flex items-center gap-1 bg-yellow-600 text-gray-50 hover:text-gray-200 hover:bg-yellow-800 font-bold px-3 py-1 rounded-lg transition"
                                                >
                                                    <Eye size={18} /> Détails
                                                </button>

                                                <Link
                                                    href={route("admin.recipes.edit", recipe.alias)}
                                                    className="flex items-center gap-1 bg-blue-600 text-gray-100 px-3 py-1 rounded-lg hover:text-blue-100"
                                                >
                                                    <Pencil size={18} />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(recipe.alias)}
                                                    className="flex items-center gap-1 rounded-lg px-3 py-1 text-gray-50 bg-red-600 hover:text-red-100"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-6 text-center text-gray-500">
                                        Aucune recette trouvée
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination links={recipes?.links} />
            </div>
        </>
    );
}


