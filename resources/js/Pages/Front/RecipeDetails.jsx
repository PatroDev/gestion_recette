import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Facebook, Instagram, Play, Share, Timer, Twitter, Utensils } from 'lucide-react';

export default function RecipeDetails({ recipe = null }) {
    return (
        <>
            <Head title={recipe?.title ?? "Recipe Details"}/>

            <h1 className='text-center text-xl font-lobster py-8'>Foodieland<span className='text-orange-500'>.</span></h1>
            {/* Separator */}
            <div className="border bg-black/30 dark:bg-gray-600" />

            <div className="bg-white text-gray-900 dark:bg-black dark:text-white min-h-screen">
                <section className="max-w-6xl mx-auto px-6 py-14">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {recipe?.title ?? "Health Japanese Fried Rice"}
                    </h1>

                    {/* Author + Meta */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className='flex-1 flex items-center gap-8 flex-wrap'>
                            <div className="flex items-center gap-3">
                                <img
                                    src={recipe?.authorImage ?? "/images/avatar.png"}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">{recipe?.author ?? "John Smith"}</p>
                                    <p className="text-xs text-gray-500">15 March 2022</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-black dark:text-gray-400">
                                {/* Separator */}
                                <div className="w-px h-6 bg-black/30 dark:bg-gray-600" />
                                {/* Item 1 */}
                                <div className="flex items-center gap-2">
                                    <Timer size={24}/>
                                    <p className="font-semibold leading-tight uppercase">
                                        Prep Time <br />
                                        <span className='text-md text-gray-500'>15 Minutes</span>
                                    </p>
                                </div>

                                {/* Separator */}
                                <div className="w-px h-6 bg-black/30 dark:bg-gray-600" />

                                {/* Item 2 */}
                                <div className="flex items-center gap-2">
                                    <Timer size={24}/>
                                    <p className="font-semibold leading-tight uppercase">
                                        Cook Time <br />
                                        <span className='text-md text-gray-500'>15 Minutes</span>
                                    </p>
                                </div>

                                {/* Separator */}
                                <div className="w-px h-6 bg-black/30 dark:bg-gray-600" />

                                {/* Item 3 */}
                                <div className="flex items-center gap-2">
                                    <Utensils size={24}/>
                                    <span className="text-gray-500 leading-tight">
                                    Chicken
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col items-center justify-center'>
                            <button className="ml-auto text-sm p-5 rounded-full bg-lightBlue hover:bg-gray-100 dark:hover:bg-gray-800 transition">
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
                                    src={recipe?.image ?? "/images/recipe-details.png"}
                                    className="rounded-3xl w-full object-cover"
                                />
                                <button className="absolute inset-0 m-auto w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-xl font-bold">
                                    <Play />
                                </button>
                            </div>

                            <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>

                        {/* Nutrition */}
                        <div className="bg-lightBlue dark:bg-gray-900 p-6 rounded-3xl h-fit">
                            <h3 className="font-bold mb-6">Nutrition Information</h3>

                            <div className="space-y-4 text-sm">
                                {[
                                    ["Calories", "219.9 kcal"],
                                    ["Total Fat", "10.7 g"],
                                    ["Protein", "7.9 g"],
                                    ["Carbohydrate", "22.3 g"],
                                    ["Cholesterol", "37.4 mg"]
                                ].map((item, index) => (
                                    <div key={index} className="flex justify-between border-b pb-2">
                                        <span>{item[0]}</span>
                                        <span className="font-medium">{item[1]}</span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-gray-400 mt-36">
                                Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6 mt-24'>
                        {/* ================= INGREDIENTS ================= */}
                        <div className="w-full lg:w-3/4">
                            <h2 className="text-2xl font-bold mb-10">Ingredients</h2>
                            {/* $recipeSections = $recipe->sections()->get();

                            foreach ($recipeSections as $section) {
                                echo $section->nom_section . "\n";

                                $ingredients = $section->ingredientsForRecipe($recipe->id)->get();

                                foreach ($ingredients as $ri) {
                                    echo "- " . $ri->ingredient->name . "\n";
                                }
                            } */}

                            <div className="grid gap-10">
                                {/* Main dish */}
                                <div>
                                    <h4 className="font-semibold mb-6">For main dish</h4>
                                    <ul className="space-y-4">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <li key={i} className="flex gap-3 items-center pb-4 border-b">
                                                <input type="checkbox" className="checkbox-rounded"/>
                                                {i === 1 ? (
                                                    <span className="text-gray-200 dark:text-gray-300 line-through">
                                                        Lorem ipsum dolor sit amet
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-600 dark:text-gray-400">
                                                        Lorem ipsum dolor sit amet
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Sauce */}
                                <div>
                                    <h4 className="font-semibold mb-6">For the sauce</h4>
                                    <ul className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <li key={i} className="flex gap-3 items-center pb-4 border-b">
                                                <input type="checkbox" className="checkbox-rounded"/>
                                                <span className="text-gray-600 dark:text-gray-400">
                                                    Lorem ipsum dolor sit amet
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* ================= OTHER RECIPES (SIDEBAR-LIKE BLOCK) ================= */}
                        <div className="w-full lg:w-1/4">
                            <h2 className="text-xl font-bold mb-8">Other Recipes</h2>
                            <div className="grid-cols-3 gap-x-4 gap-y-8">
                                {[1, 2, 3].map(id => (
                                    <Link href={`/recipes/${id}`} key={id}
                                        className="flex gap-4 items-center hover:opacity-80 p-2 transition">
                                        <img
                                            src={`/images/recipe${id}.png`}
                                            className="w-32 h-24 object-cover rounded-3xl"
                                        />
                                        <div>
                                            <p className="font-medium text-md">
                                                Other recipe #{id}
                                            </p>
                                            <span className="text-sm text-gray-400">
                                                By Andreas Paula
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ================= DIRECTIONS ================= */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold mb-10">Directions</h2>

                        {[1, 2, 3].map(step => (
                            <div key={step} className="mb-12">
                                <div className="flex gap-3 items-start">
                                    <input type="checkbox" className="checkbox-rounded mt-2" />
                                    <div>
                                        <h4 className="font-semibold mb-2">
                                            {step}. Lorem ipsum dolor sit amet
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...
                                        </p>
                                    </div>
                                </div>

                                {step === 1 && (
                                    <>

                                    <img
                                        src="/images/step1.png"
                                        className="rounded-3xl mt-6 w-3/4 h-2/4"
                                    />
                                <p className="text-gray-500 dark:text-gray-400">
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...
                                </p>
                                </>
                                )}
                            </div>
                        ))}
                    </div>

                </section>

                {/* FOOTER */}
                <footer className="grid grid-cols-12 items-center gap-y-6 py-10 border-t dark:border-gray-800 text-gray-500 dark:text-gray-400 text-lg">
                    {/* Center (Copyright) */}
                    <div className="col-span-12 lg:col-start-4 lg:col-span-6 text-center">
                        © 2025 Flowbase. Powered by <span className="text-red-400">Webflow</span>
                    </div>

                    {/* Right (icons) */}
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
