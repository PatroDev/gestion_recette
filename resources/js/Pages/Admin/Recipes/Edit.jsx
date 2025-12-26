import AdminLayout from '@/Layouts/AdminLayout';
import RecipeForm from '@/Components/Recipes/RecipeForm';

export default function Edit({ recipe }) {
    return (
        <AdminLayout>
            <h4 className="fw-bold mb-4">✏️ Modifier la recette</h4>

            <div className="card shadow-sm">
                <div className="card-body">
                    <RecipeForm
                        recipe={recipe}
                        submitUrl={`/recipes/${recipe.id}`}
                        method="put"
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
