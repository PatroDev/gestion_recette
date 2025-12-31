import AdminLayout from '@/Layouts/AdminLayout';
import RecipeForm from './RecipeForm';

export default function Edit({ recipe, categories, ingredientsList, sectionsList, }) {
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center p-4">
                    Modification de la recette : <span className='text-yellow-600'>{recipe.title}</span>
                </h1>

                <div className="bg-white shadow-md rounded-2xl p-6">
                    <RecipeForm
                        recipe={recipe}
                        submitUrl={route("admin.recipes.update", recipe.alias)} // `/admin/recipes/${recipe.alias}`
                        method="put"
                        categories={categories}
                        ingredientsList={ingredientsList}
                        sectionsList={sectionsList}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
