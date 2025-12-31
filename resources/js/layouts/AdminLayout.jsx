import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Head } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <Head title='Dashboard'/>

            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="ml-64 flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}



// export default function AdminLayout({ children }) {
//     return (
//         <div className="flex min-h-screen bg-slate-100">
//             {/* Sidebar */}
//             <Sidebar />

//             {/* Main content */}
//             {/* <div className="flex flex-col flex-1">
//                 <Navbar />

//                 <main className="flex-1 p-6">
//                     {children}
//                 </main>
//             </div> */}
//         </div>
//     );
// }
