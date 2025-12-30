import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, Eye } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <div className="max-w-md mx-auto mt- bg-white p-8 pt-0 rounded-2xl shadow-lg">
                {/* Boutons retour & Site */}
                <div className="mb-4 flex justify-between">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex font-bold bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                    >
                        <ArrowLeft /> Retour
                    </button>
                    <button
                        type="button"
                        onClick={() => router.visit(route('home'))}
                        className="flex font-bold bg-blue-200 text-blue-700 px-4 py-2 rounded hover:bg-blue-300 transition"
                    >
                        <Eye /> Aller au Site
                    </button>
                </div>
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Connexion à votre compte
                </h1>

                {flash?.error && (
                    <p className="text-red-500 text-sm mb-3">{flash.error}</p>
                )}

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Adresse email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Mot de passe" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Remember */}
                    <div className="mt-4 flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-700">
                            Se souvenir de moi
                        </span>
                    </div>

                    {/* Footer actions */}
                    <div className="mt-6 flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-indigo-600 hover:text-indigo-800 underline font-medium"
                            >
                                Mot de passe oublié ?
                            </Link>
                        )}

                        <PrimaryButton
                            className="px-5 py-2"
                            disabled={processing}
                        >
                            Se connecter
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
