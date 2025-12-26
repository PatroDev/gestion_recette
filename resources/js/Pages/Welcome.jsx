import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <GuestLayout>
            <Head title="Dashboard Recettes" />
            <div className="bg-gray-50 text-black dark:bg-black dark:text-white min-h-screen">
                <div className="relative flex flex-col items-center justify-start py-10 px-6 lg:px-20">
                    <header className="w-full flex justify-between items-center mb-10">
                        <h1 className="text-3xl font-bold text-[#FF2D20]">Mes Recettes</h1>
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 rounded bg-[#FF2D20] text-white hover:bg-red-600 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="space-x-2">
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400 transition"
                                >
                                    Se connecter
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 rounded bg-[#FF2D20] text-white hover:bg-red-600 transition"
                                >
                                    S'inscrire
                                </Link>
                            </div>
                        )}
                    </header>

                    <main className="w-full max-w-5xl">
                        <div className="flex justify-end mb-6">
                            <Link
                                href={route('admin.recipes.create')}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                Ajouter une recette
                            </Link>
                        </div>
                    </main>

                    <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                        © 2025 Mon Application de Recettes
                    </footer>
                </div>
            </div>
        </GuestLayout>
    );
}
