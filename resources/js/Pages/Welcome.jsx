// import GuestLayout from '@/layouts/GuestLayout';
// import { Head, Link } from '@inertiajs/react';

// export default function Welcome({ auth }) {
//     return (
//         <GuestLayout>
//             <Head title="Dashboard Recettes" />
//             <div className="bg-gray-50 text-black dark:bg-black dark:text-white min-h-screen">
//                 <div className="relative flex flex-col items-center justify-start py-10 px-6 lg:px-20">
//                     <header className="w-full flex justify-between items-center mb-10">
//                         <h1 className="text-3xl font-bold text-[#FF2D20]">Mes Recettes</h1>
//                         {auth.user ? (
//                             <Link
//                                 href={route('admin.dashboard')}
//                                 className="px-4 py-2 rounded bg-[#FF2D20] text-white hover:bg-red-600 transition"
//                             >
//                                 Dashboard
//                             </Link>
//                         ) : (
//                             <div className="space-x-2">
//                                 <Link
//                                     href={route('login')}
//                                     className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
//                                 >
//                                     Se connecter
//                                 </Link>
//                                 <Link
//                                     href={route('register')}
//                                     className="px-4 py-2 rounded bg-[#FF2D20] text-white hover:bg-red-600 transition"
//                                 >
//                                     S'inscrire
//                                 </Link>
//                             </div>
//                         )}
//                     </header>

//                     <main className="w-full max-w-5xl">
//                         <div className="flex justify-end mb-6">
//                             <Link
//                                 href={route('admin.recipes.create')}
//                                 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//                             >
//                                 Ajouter une recette
//                             </Link>
//                         </div>
//                     </main>

//                     <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
//                         © 2025 Mon Application de Recettes
//                     </footer>
//                 </div>
//             </div>
//         </GuestLayout>
//     );
// }

import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Foodieland" />

            {/* MAIN PAGE WRAPPER */}
            <div className="bg-white text-gray-900 dark:bg-black dark:text-white">

                {/* ================= HERO SECTION ================= */}
                <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-semibold text-red-500 uppercase tracking-wide">
                            Hot Recipes
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-3">
                            Spicy delicious<br />chicken wings
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 mt-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.
                        </p>

                        <div className="flex space-x-4 mt-6">
                            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                ⏱️ 30 Minutes
                            </span>
                            <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                🍗 Chicken
                            </span>
                        </div>

                        <Link
                            href="#recipes"
                            className="mt-8 inline-block px-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-semibold hover:opacity-80 transition"
                        >
                            View Recipes →
                        </Link>

                        <div className="flex items-center gap-3 mt-8">
                            <img src="/images/avatar.png" className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-medium">John Smith</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    15 March 2022
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="/images/chicken-wings.png"
                            alt="Chicken Wings"
                            className="rounded-3xl shadow-lg"
                        />
                    </div>
                </section>

                {/* ================= CATEGORIES ================= */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-3xl font-bold">Categories</h2>

                        <Link
                            href="#"
                            className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            View All Categories
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
                        {[
                            { name: "Breakfast", icon: "/images/cat-breakfast.png" },
                            { name: "Vegan", icon: "/images/cat-vegan.png" },
                            { name: "Meat", icon: "/images/cat-meat.png" },
                            { name: "Dessert", icon: "/images/cat-dessert.png" },
                            { name: "Lunch", icon: "/images/cat-sandwich.png" },
                            { name: "Chocolate", icon: "/images/cat-choco.png" }
                        ].map((cat, index) => (
                            <div key={index} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:shadow-lg transition cursor-pointer">
                                <img src={cat.icon} className="mx-auto h-16 mb-3" />
                                <p className="text-sm font-medium">{cat.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= RECIPES LISTING ================= */}
                <section id="recipes" className="max-w-7xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center mb-4">
                        Simple and tasty recipes
                    </h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    {/* CARDS */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                        {[1,2,3,4,5,6].map((i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 rounded-3xl shadow hover:shadow-xl transition overflow-hidden">
                                <img
                                    src={`/images/recipe${i}.jpg`}
                                    className="h-56 w-full object-cover"
                                />
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg">
                                        Delicious Recipe #{i}
                                    </h3>
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
                                        <span>⏱️ 30 Minutes</span>
                                        <span>🍽️ Category</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= FOOTER ================= */}
                <footer className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm border-t dark:border-gray-800">
                    © 2025 Flowbase. Powered by Webflow 😄
                </footer>

            </div>
        </>
    );
}

