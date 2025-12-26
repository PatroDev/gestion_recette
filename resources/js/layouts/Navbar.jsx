import { usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav className="navbar navbar-light bg-white border-bottom px-4">
            <span className="navbar-brand fw-bold">
                Dashboard
            </span>

            <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                    {auth.user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="/profile">Profil</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-danger" href="/logout">Déconnexion</a></li>
                </ul>
            </div>
        </nav>
    );
}
