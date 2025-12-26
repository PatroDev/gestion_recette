import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: 260 }}>
            <h5 className="fw-bold mb-4">Admin Panel</h5>

            <ul className="nav nav-pills flex-column gap-2">
                <li className="nav-item">
                    <Link href="/dashboard" className="nav-link text-white">
                        📊 Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/users" className="nav-link text-white">
                        👤 Utilisateurs
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href="/settings" className="nav-link text-white">
                        ⚙️ Paramètres
                    </Link>
                </li>
            </ul>
        </div>
    );
}
