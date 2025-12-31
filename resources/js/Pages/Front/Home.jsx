import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router } from '@inertiajs/react';
import {CirclePause, Facebook, Instagram, PlayCircle, Timer, Twitter, Utensils } from "lucide-react";
import { useState } from 'react';

export default function Home({ auth, recipes, categories, selectedCategory }) {
    const [categoryFilter, setCategoryFilter] = useState("");

    const applyFilters = () => {
        router.get(route("home"),
            { category_id: categoryFilter },
            { preserveState: true, replace: true }
        );
    };

    return (
        <>
            <Head title="Foodieland" />

            <h1 className='text-center text-xl font-lobster py-8'>Foodieland<span className='text-orange-500'>.</span></h1>
            {/* Separator */}
            <div className="border bg-black/30 dark:bg-gray-600" />

            {/* MAIN PAGE WRAPPER */}
            <div className="bg-white text-gray-900 dark:bg-black dark:text-white">

                {/* ================= HERO SECTION ================= */}
                <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 relative rounded">
                    <div className="flex flex-col justify-center bg-lightBlue p-12 rounded-l-3xl h-640">
                        <div className="flex items-center justify-center gap-3 p-2 w-40 bg-white rounded-3xl shadow-lg">
                            <img src="/images/scroll.png" className="w-6 h-6" />
                            <span className="text-sm font-bold text-black tracking-wide">
                                Hot Recipes
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-5xl font-bold leading-tight mt-3">
                            Spicy delicious<br />chicken wings
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 mt-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.
                        </p>

                        <div className="flex space-x-4 mt-8">
                            <span className="flex items-center gap-2 text-sm p-2 rounded-3xl bg-gray-200 text-gray-600 dark:text-gray-400">
                                 <Timer size={24} className="text-black"/> 30 Minutes
                            </span>
                            <span className="flex items-center gap-2 text-sm px-2 py-2 rounded-3xl bg-gray-200 text-gray-600 dark:text-gray-400">
                                <Utensils size={24} className="text-black"/> Chicken
                            </span>
                        </div>

                        <div className="flex justify-between mt-28">
                            <div className="flex items-center gap-3">
                                <img src="/images/avatar.png" className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-medium">John Smith</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        15 March 2022
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="#recipes"
                                className="flex items-center gap-1 mt-8 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg text-sm font-semibold hover:opacity-80 transition"
                            >
                                View Recipes <PlayCircle />
                            </Link>
                        </div>
                    </div>

                    {/* Image centrée en haut */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 flex justify-center">
                        <img
                            src="/images/hand-pouce2.png"
                            alt="hand pouce"
                            className="w-36 h-36 object-contain bg-white rounded-full"
                        />
                    </div>

                    <div className="flex justify-center right-10">
                        <img
                            src="/images/chicken-wings.png"
                            alt="Chicken Wings"
                            className="rounded-r-3xl object-cover"
                        />
                    </div>
                </section>

            {/* ================= CATEGORIES ================= */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-5xl font-bold">Categories</h2>

                    <Link
                        href={route("home")}
                        preserveScroll
                        className={`px-5 py-2 rounded-xl font-bold text-sm
                        ${!selectedCategory ? 'bg-lightBlue' : 'bg-lightBlue opacity-90 dark:bg-gray-900'}
                        hover:shadow-lg transition cursor-pointer`}
                    >
                        View All Categories
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className="px-0 pb-4 rounded-2xl hover:shadow-lg transition cursor-pointer cat-default"
                            onClick={() => {
                                setCategoryFilter(cat.id);
                                router.get(route("home"), { category_id: cat.id }, {
                                    preserveState: true,
                                    replace: true,
                                    onFinish: () => {
                                        const el = document.getElementById('recipes');
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    },
                                });
                            }}
                            style={{
                                background:
                                    selectedCategory === cat.name
                                        ? ""
                                        : `linear-gradient(to top, color-mix(in srgb, ${cat.dominant_color} 50%, white 50%) 1%, #fffffffa 99%)`,
                                border: selectedCategory === cat.name
                                    ? `5px solid ${cat.dominant_color}`
                                    : "",
                                color: selectedCategory === cat.name ? "#111" : "inherit",
                            }}
                        >
                            <img
                                src={`/storage/${cat.category_image}`}
                                className="mx-auto h-16 mb-10 rounded-full shadow-sm"
                            />

                            <p className="text-sm font-bold">{cat.name}</p>
                        </button>
                    ))}
                </div>
            </section>

            {/* ================= RECIPES LISTING ================= */}
            <section id="recipes" className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-5xl font-bold text-center mb-4">
                    {selectedCategory ? `Recipes: ${selectedCategory}` : "Simple and tasty recipes"}
                </h2>
                <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                {/* CARDS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

                    {recipes.data.map((recipe) => (
                        <Link key={recipe.id} href={route('home.recipes.show', recipe.alias)}
                            className="bg-lightBlue dark:bg-gray-900 rounded-3xl shadow hover:shadow-xl transition overflow-hidden"
                        >
                            <div className='py-2 px-3'>
                                <img
                                    src={`/storage/${recipe.front_image}`}
                                    className="h-56 w-full object-cover rounded-3xl"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg">{recipe.title}</h3>
                                <div className="flex gap-4 justify-start text-sm text-gray-500 mt-3">
                                    <span className="flex gap-2 items-center"><Timer size={18}/> {recipe.total_time} min</span>
                                    <span className="flex gap-2 items-center"><Utensils size={18}/>
                                        {recipe.categories[0]?.name ?? 'Category'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

                 {/* ================= FOOTER ================= */}
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


// export default function Welcome({ auth, recipes, featured }) {
//     return (
//         <>
//             <Head title="Foodieland" />

//             <h1 className='text-center text-xl font-lobster py-8'>Foodieland<span className='text-orange-500'>.</span></h1>
//             {/* Separator */}
//             <div className="border bg-black/30 dark:bg-gray-600" />

//             {/* MAIN PAGE WRAPPER */}
//             <div className="bg-white text-gray-900 dark:bg-black dark:text-white">

//                 {/* ================= HERO SECTION ================= */}
//                 <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 relative rounded">
//                     <div className="flex flex-col justify-center bg-lightBlue p-12 rounded-l-3xl h-640">

//                         <div className="flex items-center justify-center gap-3 p-2 w-40 bg-white rounded-3xl shadow-lg">
//                             <img src="/images/scroll.png" className="w-6 h-6" />
//                             <span className="text-sm font-bold text-black tracking-wide">
//                                 Hot Recipes
//                             </span>
//                         </div>

//                         <h1 className="text-5xl md:text-5xl font-bold leading-tight mt-3">
//                             Spicy delicious<br />chicken wings
//                         </h1>

//                         <p className="text-gray-500 dark:text-gray-400 mt-8">
//                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                             eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.
//                         </p>

//                         <div className="flex space-x-4 mt-8">
//                             <span className="flex items-center gap-2 text-sm p-2 rounded-3xl bg-gray-200 text-gray-600 dark:text-gray-400">
//                                  <Timer size={24} className="text-black"/> 30 Minutes
//                             </span>
//                             <span className="flex items-center gap-2 text-sm px-2 py-2 rounded-3xl bg-gray-200 text-gray-600 dark:text-gray-400">
//                                 <Utensils size={24} className="text-black"/> Chicken
//                             </span>
//                         </div>

//                         <div className="flex justify-between mt-28">
//                             <div className="flex items-center gap-3">
//                                 <img src="/images/avatar.png" className="w-10 h-10 rounded-full" />
//                                 <div>
//                                     <p className="font-medium">John Smith</p>
//                                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                                         15 March 2022
//                                     </p>
//                                 </div>
//                             </div>

//                             <Link
//                                 href="#recipes"
//                                 className="flex items-center gap-1 mt-8 px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg text-sm font-semibold hover:opacity-80 transition"
//                             >
//                                 View Recipes <PlayCircle />
//                             </Link>
//                         </div>
//                     </div>

//                     {/* Image centrée en haut */}
//                     <div className="absolute top-20 left-1/2 -translate-x-1/2 flex justify-center">
//                         <img
//                             src="/images/hand-pouce2.png"
//                             alt="hand pouce"
//                             className="w-36 h-36 object-contain bg-white rounded-full"
//                         />
//                     </div>

//                     <div className="flex justify-center right-10">
//                         <img
//                             src="/images/chicken-wings.png"
//                             alt="Chicken Wings"
//                             className="rounded-r-3xl object-cover"
//                         />
//                     </div>
//                 </section>

//                 {/* ================= CATEGORIES ================= */}
//                 <section className="max-w-7xl mx-auto px-6 py-24">
//                     <div className="flex justify-between items-center mb-10">
//                         <h2 className="text-5xl font-bold">Categories</h2>

//                         <Link
//                             href="#"
//                             className="px-5 py-2 rounded-xl text-sm bg-lightBlue font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                         >
//                             View All Categories
//                         </Link>
//                     </div>

//                     <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
//                         {[
//                             { name: "Breakfast", icon: "/images/cat-breakfast.png", gradientStyle:"oliveA" },
//                             { name: "Vegan", icon: "/images/cat-vegan.png", gradientStyle:"greenA" },
//                             { name: "Meat", icon: "/images/cat-meat.png", gradientStyle:"redB" },
//                             { name: "Dessert", icon: "/images/cat-dessert.png", gradientStyle:"orangeB" },
//                             { name: "Lunch", icon: "/images/cat-lunch.png", gradientStyle:"blackA" },
//                             { name: "Chocolate", icon: "/images/cat-choco.png", gradientStyle:"blackA" },
//                         ].map((cat, index) => (
//                             <div key={index} className={`px-0 pb-4 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition cursor-pointer bg-${cat.gradientStyle}`}>
//                                 <img src={cat.icon} className="mx-auto h-16 mb-9 shadow-sm bg-transparent" />
//                                 <p className="text-sm font-bold">{cat.name}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* ================= RECIPES LISTING ================= */}
//                 <section id="recipes" className="max-w-7xl mx-auto px-6 py-16">
//                     <h2 className="text-5xl font-bold text-center mb-4">
//                         Simple and tasty recipes
//                     </h2>
//                     <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
//                         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                     </p>

//                     {/* CARDS */}
//                     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
//                         {[1,2,3,4,5,6,7,8].map((i) => (
//                             <div key={i} className="bg-lightBlue dark:bg-gray-900 rounded-3xl shadow hover:shadow-xl transition overflow-hidden">
//                                 <div className='py-2 px-3'>
//                                     <img
//                                         src={`/images/recipe${i}.png`}
//                                         className="h-56 w-full object-cover rounded-3xl"
//                                     />
//                                 </div>
//                                 <div className="p-5">
//                                     <h3 className="font-bold text-lg">
//                                         Fresh Lime Roasted Salmon with Ginger Sauce
//                                     </h3>
//                                     <div className="flex gap-4 justify-start text-sm text-gray-500 dark:text-gray-400 mt-3">
//                                         <span className="flex gap-2 items-center justify-center"><Timer size={18} className="text-black"/> 30 Minutes</span>
//                                         <span className="flex gap-2 items-center justify-center"><Utensils size={18} className="text-black"/> Category</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* ================= FOOTER ================= */}
//                 <footer className="grid grid-cols-12 items-center gap-y-6 py-10 border-t dark:border-gray-800 text-gray-500 dark:text-gray-400 text-lg">
//                     {/* Center (Copyright) */}
//                     <div className="col-span-12 lg:col-start-4 lg:col-span-6 text-center">
//                         © 2025 Flowbase. Powered by <span className="text-red-400">Webflow</span>
//                     </div>

//                     {/* Right (icons) */}
//                     <div className="text-end flex gap-6 text-black">
//                         <Facebook className="cursor-pointer hover:scale-110 transition" />
//                         <Twitter className="cursor-pointer hover:scale-110 transition" />
//                         <Instagram className="cursor-pointer hover:scale-110 transition" />
//                     </div>
//                 </footer>
//             </div>
//         </>
//     );
// }
