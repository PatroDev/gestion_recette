import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { PlusSquare } from 'lucide-react';
import {toast} from "sonner";

export default function List({ categories }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (!confirm("Voulez-vous supprimer cette catégorie ?")) return;
        router.delete(route('admin.categories.destroy', id), {
            onSuccess: () => toast.success("catégorie supprimée"),
            onError: () => toast.error("Erreur lors de la suppression !")
        });
    }
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Catégories</h1>

                <Link
                    href={route('admin.categories.create')}
                    className="flex gap-2 px-4 py-2 bg-slate-900 text-white rounded"
                >
                    <PlusSquare /> Nouvelle catégorie
                </Link>
            </div>

            {flash.success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {flash.success}
                </div>
            )}

            <div className="bg-white shadow rounded">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 text-left">Image</th>
                            <th className="p-3 text-left">Nom</th>
                            <th className="p-3">Alias</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id} className="border-t">
                                <td className="px-4 py-3">
                                    <img
                                        src={
                                            cat.category_image
                                                ? `/storage/${cat.category_image}`
                                                : "/images/no-image.png"
                                        }
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                </td>
                                <td className="p-3">{cat.name}</td>
                                <td className="p-3 text-center">@{cat.alias}</td>
                                <td className="p-3 text-center space-x-2">
                                    <Link
                                        href={route('admin.categories.edit', cat.id)}
                                        className="text-blue-600 text-lg rounded-lg bg-blue-50 p-2 hover:bg-blue-100"
                                    >
                                        Modifier
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="text-red-600 text-lg rounded-lg bg-red-50 p-2 hover:bg-red-100"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
