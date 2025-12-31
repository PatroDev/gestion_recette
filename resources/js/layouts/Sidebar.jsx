import { Link } from '@inertiajs/react';
import { Eye, LayoutDashboard, Tags, Utensils } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside
            className="
                fixed left-0 top-0 z-40
                w-64 h-screen
                bg-slate-900 text-slate-100
                flex flex-col
            "
        >
            {/* Logo / Title */}
            <div className="px-6 py-5 border-b border-slate-800">
                <h1 className="text-lg font-semibold tracking-wide">
                    Admin Panel
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <SidebarLink href={route('admin.dashboard')} icon={LayoutDashboard}>
                    Dashboard
                </SidebarLink>

                <SidebarLink href={route('admin.recipes.index')} icon={Utensils}>
                    Recettes
                </SidebarLink>

                <SidebarLink href={route('admin.categories.index')} icon={Tags}>
                    Catégories
                </SidebarLink>

                <SidebarLink href={route('home')} icon={Eye}>
                    Voir le site
                </SidebarLink>
            </nav>
        </aside>
    );
}

function SidebarLink({ href, icon: Icon, children }) {
    return (
        <Link
            href={href}
            className="
                flex items-center gap-3 rounded-lg px-4 py-2
                text-sm font-medium text-slate-300
                hover:bg-slate-800 hover:text-white
                transition
            "
        >
            <Icon size={18} />
            {children}
        </Link>
    );
}


// import { Link } from '@inertiajs/react';
// import { Eye, LayoutDashboard, User } from 'lucide-react';

// export default function Sidebar() {
//     return (
//         <aside className="w-64 min-h-screen bg-slate-900 text-slate-100 flex flex-col">
//             {/* Logo / Title */}
//             <div className="px-6 py-5 border-b border-slate-800">
//                 <h1 className="text-lg font-semibold tracking-wide">
//                     Admin Panel
//                 </h1>
//             </div>

//             {/* Navigation */}
//             <nav className="flex-1 px-3 py-4 space-y-1">
//                 <SidebarLink href="/dashboard" icon={LayoutDashboard}>
//                     Dashboard
//                 </SidebarLink>

//                 <SidebarLink href="#" icon={User}>
//                     Utilisateurs
//                 </SidebarLink>

//                 <SidebarLink href={route('home')} icon={Eye}>
//                     Voir le site
//                 </SidebarLink>
//             </nav>
//         </aside>
//     );
// }

// function SidebarLink({ href, icon: Icon, children }) {
//     return (
//         <Link
//             href={href}
//             className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-slate-300
//                        hover:bg-slate-800 hover:text-white transition"
//         >
//             <Icon size={18} />
//             {children}
//         </Link>
//     );
// }
