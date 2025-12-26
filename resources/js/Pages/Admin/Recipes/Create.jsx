import AdminLayout from '@/Layouts/AdminLayout';
import RecipeForm from '@/Components/Recipes/RecipeForm';

export default function Create() {
    return (
        <AdminLayout>
            <h4 className="fw-bold mb-4">➕ Ajouter une recette</h4>

            <div className="card shadow-sm">
                <div className="card-body">
                    <RecipeForm
                        submitUrl="/recipes"
                        method="post"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
