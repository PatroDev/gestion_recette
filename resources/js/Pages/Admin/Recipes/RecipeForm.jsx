import { useForm } from '@inertiajs/react';

export default function RecipeForm({ recipe = null, submitUrl, method }) {
    const { data, setData, processing, errors, submit } = useForm({
        title: recipe?.title || '',
        description: recipe?.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(method, submitUrl);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Titre</label>
                <input
                    className={`form-control ${errors.title && 'is-invalid'}`}
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                    className={`form-control ${errors.description && 'is-invalid'}`}
                    rows="5"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <button className="btn btn-success" disabled={processing}>
                💾 Enregistrer
            </button>
        </form>
    );
}
