import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AdminLayout({ children }) {
    return (
        <div className="d-flex">
            <Sidebar />

            <div className="flex-grow-1">
                <Navbar />

                <main className="container-fluid p-4 bg-light min-vh-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
