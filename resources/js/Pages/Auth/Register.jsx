import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null,
        role: 'admin',
    });

    const [preview, setPreview] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setData('avatar', file);

        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            forceFormData: true,
            onFinish: () => reset('password', 'password_confirmation', 'avatar'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            {/* Bouton retour */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                    ← Retour
                </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Création d’un compte Admin
            </h1>

            <form onSubmit={submit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                {/* Nom & Prénom */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <InputLabel htmlFor="first_name" value="Nom" />
                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.first_name} className="mt-2" />
                    </div>

                    <div className="w-1/2">
                        <InputLabel htmlFor="last_name" value="Prénom" />
                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="given-name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>
                </div>

                {/* Username */}
                <div>
                    <InputLabel htmlFor="username" value="Nom d’utilisateur (facultatif)" />
                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('username', e.target.value)}
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div>
                    <InputLabel htmlFor="password" value="Mot de passe" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm password */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Avatar Upload */}
                <div>
                    <InputLabel htmlFor="avatar" value="Avatar de profil" />

                    <input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        className="block w-full mt-1 text-sm text-gray-600
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:bg-indigo-50 file:text-indigo-600
                            hover:file:bg-indigo-100 cursor-pointer"
                        onChange={handleAvatarChange}
                    />

                    <InputError message={errors.avatar} className="mt-2" />

                    {preview && (
                        <div className="mt-3">
                            <img
                                src={preview}
                                className="w-20 h-20 object-cover rounded-full border shadow-sm"
                                alt="Preview"
                            />
                        </div>
                    )}
                </div>

                {/* Footer form */}
                <div className="flex justify-between items-center">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Déjà inscrit ?
                    </Link>

                    <PrimaryButton disabled={processing}>
                        S'inscrire
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
