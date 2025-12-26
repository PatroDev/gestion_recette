import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

export default function List({ recipes }) {

    const deleteRecipe = (id) => {
        if (confirm('Supprimer cette recette ?')) {
            router.delete(`/recipes/${id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold">🍽️ Recettes</h4>

                <Link href="/recipes/create" className="btn btn-primary">
                    ➕ Nouvelle recette
                </Link>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Titre</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map((recipe, i) => (
                                <tr key={recipe.id}>
                                    <td>{i + 1}</td>
                                    <td>{recipe.title}</td>
                                    <td>
                                        <Link
                                            href={`/recipes/${recipe.id}/edit`}
                                            className="btn btn-sm btn-outline-secondary me-2"
                                        >
                                            ✏️
                                        </Link>

                                        <button
                                            onClick={() => deleteRecipe(recipe.id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {recipes.length === 0 && (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted py-4">
                                        Aucune recette enregistrée
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
