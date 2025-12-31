import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        alias: category.alias,
        category_image: null,
    });

    const submit = e => {
        e.preventDefault();
        put(route('admin.categories.update', category.id));
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Modifier catégorie</h1>

            <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
                <div>
                    <label>Nom</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label>Alias</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        value={data.alias}
                        onChange={e => setData('alias', e.target.value)}
                    />
                </div>

                <div>
                    <label>Nouvelle image: </label>
                    <input
                        type="file"
                        onChange={e => setData('category_image', e.target.files[0])}
                    />
                </div>

                <button
                    disabled={processing}
                    className="px-4 py-2 bg-slate-900 text-white rounded"
                >
                    Mettre à jour
                </button>
            </form>
        </AdminLayout>
    );
}
