import RecipeForm from './RecipeForm';
import { ArrowLeft } from "lucide-react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create({ categories, ingredientsList, sectionsList, }) {
    return (
        <AdminLayout>
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-center p-4">
                    Ajout d'une nouvelle recette
                </h1>

                <div className="bg-white shadow-md rounded-2xl p-6">
                    <RecipeForm
                        submitUrl={route("admin.recipes.store")} // "/admin/recipes"
                        method="post"
                        categories={categories}
                        ingredientsList={ingredientsList}
                        sectionsList={sectionsList}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
