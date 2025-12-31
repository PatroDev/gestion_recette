import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Facebook, Instagram, Play, Share, Timer, Twitter, Utensils } from 'lucide-react';
import { useState } from 'react';

export default function RecipeDetails({ recipe, recipeFormatted = [], otherRecipes = [], shareLinks }) {

    const handleNativeShare = () => {
        if (navigator.share) {
            navigator.share({
                title: recipe.title,
                url: window.location.href
            });
        }
    };

    const units = {
        calories: 'kcal',
        total_fat: 'g',
        protein: 'g',
        carbohydrate: 'g',
        cholesterol: 'mg',
    };

    return (
        <>
            <Head title={recipe.title} />

            <h1 className='text-center text-xl font-lobster py-8'>
                Foodieland<span className='text-orange-500'>.</span>
            </h1>

            <div className="border bg-black/30 dark:bg-gray-600" />

            <div className="bg-white text-gray-900 dark:bg-black dark:text-white min-h-screen">
                <section className="max-w-6xl mx-auto px-6 py-14">
                    {/* TITLE */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{recipe.title}</h1>

                    {/* AUTHOR + META */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="flex-1 flex items-center gap-8 flex-wrap">

                            {/* Auteur */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={recipe?.author?.avatar_url ?? "/images/avatar.png"}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">{recipe?.author?.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {recipe?.created_at_formatted ?? ""}
                                    </p>
                                </div>
                            </div>

                            {/* METADATA */}
                            <div className="flex items-center gap-6 text-sm text-black dark:text-gray-400">
                                <div className="w-px h-6 bg-black/30 dark:bg-gray-600" />

                                <div className="flex items-center gap-2">
                                    <Timer size={24}/>
                                    <p className="font-semibold leading-tight uppercase">
                                        Prep Time <br />
                                        <span className="text-md text-gray-500">{recipe.prep_time} min</span>
                                    </p>
                                </div>

                                <div className="w-px h-6 bg-black/30 dark:bg-gray-600" />

                                <div className="flex items-center gap-2">
                                    <Timer size={24}/>
                                    <p className="font-semibold leading-tight uppercase">
                                        Cook Time <br />
                                        <span className="text-md text-gray-500">{recipe.cook_time} min</span>
                                    </p>
                                </div>

                                <div className="w-px h-6 bg-black/30 dark:bg-gray-600" />

                                <div className="flex items-center gap-2">
                                    <Utensils size={24}/>
                                    <span className="text-gray-500 leading-tight">
                                        {recipe.categories?.map(c => c.name).join(', ') ?? ""}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* SHARE BTN */}
                        <div className='flex flex-col items-center justify-center relative'>
                            <button
                                onClick={handleNativeShare}
                                className="ml-auto text-sm p-5 rounded-full bg-lightBlue hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <Share/>
                            </button>
                            <span>Share</span>
                        </div>
                    </div>

                    {/* IMAGE + NUTRITION */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <img
                                    src={recipe.front_image_url ?? "/images/recipe-details.png"}
                                    className="rounded-3xl w-full h-96 object-cover"
                                />
                                {/* {recipe.video_url && ( */}
                                    <button className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                                        <Play/>
                                    </button>
                                {/* )} */}
                            </div>

                            <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
                                {recipe.description}
                            </p>
                        </div>

                        {recipe.nutrition && (
                        <div className="bg-lightBlue dark:bg-gray-900 p-6 rounded-3xl h-fit">
                            <h3 className="font-bold mb-6">Nutrition Information</h3>

                            <div className="space-y-4 text-sm">
                                {Object.entries(recipe.nutrition)
                                    .filter(([key]) => !['id', 'recipe_id', 'created_at', 'updated_at'].includes(key))
                                    .map(([key, val], i) => (
                                        <div key={i} className="flex justify-between border-b pb-2 capitalize">
                                            <span>{key.replaceAll('_', ' ')}</span>
                                            <span className="font-medium">{val ?? 0} {units[key] ?? ''}</span>
                                        </div>
                                ))}

                                <p className="text-xs text-gray-400 pt-9">
                                    Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>
                        )}
                    </div>

                    {/* INGREDIENTS + OTHER */}
                    <div className='flex flex-col lg:flex-row gap-6 mt-24'>

                        {/* INGREDIENTS */}
                        <div className="w-full lg:w-3/4">
                            <h2 className="text-2xl font-bold mb-10">Ingredients</h2>

                            <div className="grid gap-10">
                                {recipeFormatted.map(section => (
                                    <div key={section.id}>
                                        <h4 className="font-semibold mb-6">
                                            {section.nom_section}
                                        </h4>

                                        <ul className="space-y-4">
                                            {section.ingredients_for_recipe?.map((ri,index) => (
                                                <li key={index} className="flex gap-3 items-center pb-4 border-b">
                                                    <input type="checkbox" className="checkbox-rounded"/>
                                                    <span className={
                                                        ri.is_optional
                                                            ? "line-through text-gray-400"
                                                            : "text-gray-600 dark:text-gray-300"
                                                    }>
                                                        {ri.ingredient?.name}
                                                        {ri.quantity ? ` — ${ri.quantity}` : ""}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* OTHER RECIPES */}
                        <div className="w-full lg:w-1/4">
                            <h2 className="text-xl font-bold mb-8">Other Recipes</h2>

                            {otherRecipes.map(r => (
                                <Link key={r.id} href={`/recipes/${r.alias}`}
                                      className="flex gap-4 items-center hover:opacity-80 p-2 transition">
                                    <img
                                        src={r.front_image_url}
                                        className="w-32 h-24 object-cover rounded-3xl"
                                    />
                                    <div>
                                        <p className="font-medium text-md">{r.title}</p>
                                        <span className="text-sm text-gray-400">
                                            By {r.author?.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* DIRECTIONS */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold mb-10">Directions</h2>

                        {recipe.directions?.map((step,i) => (
                            <div key={i} className="mb-12">
                                <div className="flex gap-3 items-start">
                                    <input type="checkbox" className="checkbox-rounded mt-2" />

                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            {step.step_number}. {step.step_title}
                                        </h4>

                                        <p className="text-gray-500 dark:text-gray-400">
                                            {step.instruction}
                                        </p>
                                    </div>
                                </div>

                                {step.direction_image && (
                                    <img
                                        src={step.direction_image_url}
                                        className="rounded-3xl mt-6 w-3/4"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                </section>

                {/* FOOTER */}
                <footer className="grid grid-cols-12 items-center gap-y-6 py-10 border-t dark:border-gray-800 text-gray-500 dark:text-gray-400 text-lg">
                    <div className="col-span-12 lg:col-start-4 lg:col-span-6 text-center">
                        © 2025 Foodieland. Powered by Laravel + Inertia
                    </div>

                    <div className="text-end flex gap-6 text-black">
                        <Facebook className="cursor-pointer hover:scale-110 transition" />
                        <Twitter className="cursor-pointer hover:scale-110 transition" />
                        <Instagram className="cursor-pointer hover:scale-110 transition" />
                    </div>
                </footer>
            </div>
        </>
    );
}
