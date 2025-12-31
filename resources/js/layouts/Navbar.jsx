import { usePage, Link, } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
    // const { auth } = usePage().props;
    const user = usePage().props.auth.user;

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            {/* Title */}
            <h2 className="text-lg font-semibold text-slate-800">
                Dashboard
            </h2>

            {/* User menu */}
            <div className="relative group">
                <div className='flex gap-2'>
                    {/* Avatar */}
                    {user?.avatar && (
                        <div className="flex justify-center">
                            <img
                                src={`/storage/${user.avatar}`}
                                className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
                                alt="Photo de profil"
                            />
                        </div>
                    )}
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900">
                        {user.first_name}{" "}{user.last_name}
                        <ChevronDown size={16} />
                    </button>
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 w-44 rounded-lg bg-white border border-slate-200 shadow-lg
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                        Profil
                    </Link>

                    <div className="border-t border-slate-200" />

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        Déconnexion
                    </Link>
                </div>
            </div>
        </header>
    );
}
