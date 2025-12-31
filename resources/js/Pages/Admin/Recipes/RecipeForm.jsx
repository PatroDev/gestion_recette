import { useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, ImageDown, Plus, PlusCircle, Save, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function RecipeForm({ recipe, categories, ingredientsList, sectionsList, method, submitUrl }) {
    const { flash } = usePage().props;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: recipe?.title ?? "",
        description: recipe?.description ?? "",
        prep_time: recipe?.prep_time ?? "",
        cook_time: recipe?.cook_time ?? "",
        status: recipe?.status ?? 0,

        front_image: null,

        categories: recipe?.categories?.map(c => c.id) ?? [],

        ingredients: recipe?.ingredients?.map(ing => ({
            id: ing.id,
            quantity: ing.pivot.quantity || "",
            section_id: ing.pivot.section_ingredient_id,
            is_optional: ing.pivot.is_optional ? 1 : 0
        })) ?? [
            { id: "", quantity: "", section_id: "", is_optional: 0 }
        ],

        directions: recipe?.directions?.map(dir => ({
            step_title: dir.step_title || "",
            instruction: dir.instruction || "",
            direction_image: null
        })) ?? [
            { step_title: "", instruction: "", direction_image: null }
        ],

        nutrition: recipe?.nutrition ?? {
            calories: "",
            fat: "",
            protein: "",
            carbs: ""
        },
    });

    // Choix dynamique de la méthode HTTP Inertia
    const submitMethod = method === "put" ? put : post;

    const [frontPreview, setFrontPreview] = useState(
        recipe?.front_image ? `/storage/${recipe.front_image}` : null
    );

    const [directionPreviews, setDirectionPreviews] = useState(
        recipe?.directions?.map(dir => dir.direction_image ? `/storage/${dir.direction_image}` : null) ?? []
    );

    const handleFrontImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation de la taille et du type
        const maxSize = 4 * 1024 * 1024; // 4MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Format d'image non supporté. Utilisez JPG, PNG ou WebP.");
            e.target.value = '';
            return;
        }

        if (file.size > maxSize) {
            toast.error("L'image ne doit pas dépasser 4MB.");
            e.target.value = '';
            return;
        }

        setData("front_image", file);

        const previewUrl = URL.createObjectURL(file);
        setFrontPreview(previewUrl);
    };

    const handleDirectionImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation
        const maxSize = 4 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Format d'image non supporté. Utilisez JPG, PNG ou WebP.");
            e.target.value = '';
            return;
        }

        if (file.size > maxSize) {
            toast.error("L'image ne doit pas dépasser 4MB.");
            e.target.value = '';
            return;
        }

        const updated = [...data.directions];
        updated[index].direction_image = file;
        setData("directions", updated);

        const newPreviews = [...directionPreviews];
        const previewUrl = URL.createObjectURL(file);
        newPreviews[index] = previewUrl;
        setDirectionPreviews(newPreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation front supplémentaire
        if (!data.title.trim()) {
            toast.error("Le titre est obligatoire");
            document.querySelector('[name="title"]')?.focus();
            return;
        }

        if (!data.categories.length) {
            toast.error("Sélectionnez au moins une catégorie");
            return;
        }

        if (data.ingredients.some(ing => !ing.id && !ing.newIngredient)) {
            toast.error("Tous les ingrédients doivent être renseignés");
            return;
        }

        if (data.directions.some(dir => !dir.step_title.trim() || !dir.instruction.trim())) {
            toast.error("Toutes les étapes doivent avoir un titre et une instruction");
            return;
        }

        // Vérifier que cook_time est bien rempli
        if (!data.cook_time || parseInt(data.cook_time) < 1) {
            toast.error("Le temps de cuisson doit être d'au moins 1 minute");
            document.querySelector('[name="cook_time"]')?.focus();
            return;
        }

        submitMethod(submitUrl, {
            forceFormData: true,
            onSuccess: () => toast.success("Recette enregistrée avec succès !"),
            onError: (errors) => {
                if (errors.server) {
                    toast.error("Erreur serveur");
                } else {
                    toast.error("Veuillez corriger les erreurs dans le formulaire");
                }
            },
        });
    };

    const addIngredient = () =>
        setData("ingredients", [...data.ingredients, {
            id: "",
            quantity: "",
            section_id: "",
            is_optional: 0,
            newIngredient: "",
            newSection: ""
        }]);

    const removeIngredient = (i) => {
        if (data.ingredients.length <= 1) {
            toast.error("Au moins un ingrédient est requis");
            return;
        }
        setData("ingredients", data.ingredients.filter((_, idx) => idx !== i));
    };

    const addDirection = () =>
        setData("directions", [...data.directions, {
            step_title: "",
            instruction: "",
            direction_image: null
        }]);

    const removeDirection = (i) => {
        if (data.directions.length <= 1) {
            toast.error("Au moins une étape est requise");
            return;
        }
        setData("directions", data.directions.filter((_, idx) => idx !== i));

        // Mettre à jour les préviews
        const newPreviews = [...directionPreviews];
        newPreviews.splice(i, 1);
        setDirectionPreviews(newPreviews);
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast.error("Veuillez corriger les erreurs ci-dessous");
            const firstError = document.querySelector("[data-error]");
            firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [errors]);

    // Nettoyer les URLs d'objets lors du démontage
    useEffect(() => {
        return () => {
            if (frontPreview && frontPreview.startsWith('blob:')) {
                URL.revokeObjectURL(frontPreview);
            }
            directionPreviews.forEach(preview => {
                if (preview && preview.startsWith('blob:')) {
                    URL.revokeObjectURL(preview);
                }
            });
        };
    }, []);

    return (
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Bouton retour */}
            <div className="mb-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 font-bold bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                    <ArrowLeft size={20} /> Retour
                </button>
            </div>

            {/* TITLE & DESCRIPTION */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Informations Générales</h3>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Titre *</label>
                    <input
                        name="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        data-error={errors.title ? true : undefined}
                        className={`w-full border rounded px-3 py-2 ${
                            errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Ex: Gâteau au chocolat"
                    />
                    {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        rows="4"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        data-error={errors.description ? true : undefined}
                        className={`w-full border rounded px-3 py-2 ${
                            errors.description ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Décrivez brièvement votre recette..."
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                    )}
                </div>
            </div>

            {/* TIMES + STATUS */}
            <div className="grid sm:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow">
                <div>
                    <label className="block mb-1">Temps de préparation (minutes) *</label>
                    <input
                        type="number"
                        name="prep_time"
                        min="0"
                        value={data.prep_time}
                        onChange={e => setData("prep_time", e.target.value)}
                        data-error={errors.prep_time ? true : undefined}
                        className={`w-full border rounded px-3 py-2 ${
                            errors.prep_time ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0"
                    />
                    {errors.prep_time && <p className="text-red-600 text-sm mt-1">{errors.prep_time}</p>}
                </div>

                <div>
                    <label className="block mb-1">Temps de cuisson (minutes) *</label>
                    <input
                        type="number"
                        name="cook_time"
                        min="1"
                        value={data.cook_time}
                        onChange={e => setData("cook_time", e.target.value)}
                        data-error={errors.cook_time ? true : undefined}
                        className={`w-full border rounded px-3 py-2 ${
                            errors.cook_time ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Ex: 30"
                        required
                    />
                    {errors.cook_time && <p className="text-red-600 text-sm mt-1">{errors.cook_time}</p>}
                </div>

                <div>
                    <label className="block mb-1">Statut *</label>
                    <select
                        data-error={errors.status ? true : undefined}
                        className={`w-full border rounded px-3 py-2 ${
                            errors.status ? "border-red-500" : "border-gray-300"
                        }`}
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                    >
                        <option value="1">Publié</option>
                        <option value="0">Brouillon</option>
                    </select>
                    {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
                </div>
            </div>

            {/* CATEGORIES */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Catégories *</h3>
                {errors.categories && <p className="text-red-600 text-sm mb-2">{errors.categories}</p>}
                {errors['categories.0'] && <p className="text-red-600 text-sm mb-2">{errors['categories.0']}</p>}

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories?.map(cat => (
                        <label key={cat.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                            <input
                                type="checkbox"
                                checked={data.categories.includes(cat.id)}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setData("categories",
                                        checked
                                            ? [...data.categories, cat.id]
                                            : data.categories.filter(id => id !== cat.id)
                                    );
                                }}
                                className="rounded"
                            />
                            <span>{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* INGREDIENTS */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Ingrédients *</h3>
                </div>

                {errors.ingredients && <p className="text-red-600 text-sm mb-3">{errors.ingredients}</p>}

                {data.ingredients?.map((ing, i) => {
                    const hasIngredientError = errors[`ingredients.${i}.id`] || errors[`ingredients.${i}.newIngredient`];
                    const hasSectionError = errors[`ingredients.${i}.section_id`] || errors[`ingredients.${i}.newSection`];

                    return (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 p-3 border rounded-lg">

                            {/* Ingredient select + new input */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-600">Ingrédient *</label>
                                <select
                                    className={`border rounded px-2 py-2 ${hasIngredientError ? 'border-red-500' : 'border-gray-300'}`}
                                    value={ing.id || ""}
                                    onChange={(e) => {
                                        const updated = [...data.ingredients];
                                        updated[i].id = e.target.value;
                                        updated[i].newIngredient = "";
                                        setData("ingredients", updated);
                                    }}
                                >
                                    <option value="">Sélectionner un ingrédient</option>
                                    {ingredientsList?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                    <option value="new" className="text-orange-500 font-bold">+ Nouvel ingrédient</option>
                                </select>

                                {ing.id === "new" && (
                                    <input
                                        className={`border rounded px-2 py-2 mt-1 ${hasIngredientError ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Saisir le nouvel ingrédient"
                                        value={ing.newIngredient || ""}
                                        onChange={(e) => {
                                            const updated = [...data.ingredients];
                                            updated[i].newIngredient = e.target.value;
                                            setData("ingredients", updated);
                                        }}
                                    />
                                )}
                                {hasIngredientError && (
                                    <p className="text-red-600 text-sm">{errors[`ingredients.${i}.id`] || errors[`ingredients.${i}.newIngredient`]}</p>
                                )}
                            </div>

                            {/* Quantity */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-600">Quantité</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded px-2 py-2"
                                    placeholder="Ex: 200g, 2 cuillères..."
                                    value={ing.quantity || ""}
                                    onChange={(e) => {
                                        const updated = [...data.ingredients];
                                        updated[i].quantity = e.target.value;
                                        setData("ingredients", updated);
                                    }}
                                />
                            </div>

                            {/* Section select + input si new */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-600">Section</label>
                                <select
                                    className={`border rounded px-2 py-2 ${hasSectionError ? 'border-red-500' : 'border-gray-300'}`}
                                    value={ing.section_id || ""}
                                    onChange={(e) => {
                                        const updated = [...data.ingredients];
                                        updated[i].section_id = e.target.value;
                                        updated[i].newSection = "";
                                        setData("ingredients", updated);
                                    }}
                                >
                                    <option value="">Sans section</option>
                                    {sectionsList?.map((sec) => (
                                        <option key={sec.id} value={sec.id}>
                                            {sec.nom_section}
                                        </option>
                                    ))}
                                    <option value="new" className="text-orange-500 font-bold">+ Nouvelle section</option>
                                </select>

                                {ing.section_id === "new" && (
                                    <input
                                        className={`border rounded px-2 py-2 mt-1 ${hasSectionError ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Nom de la section"
                                        value={ing.newSection || ""}
                                        onChange={(e) => {
                                            const updated = [...data.ingredients];
                                            updated[i].newSection = e.target.value;
                                            setData("ingredients", updated);
                                        }}
                                    />
                                )}
                                {hasSectionError && (
                                    <p className="text-red-600 text-sm">{errors[`ingredients.${i}.section_id`] || errors[`ingredients.${i}.newSection`]}</p>
                                )}
                            </div>

                            {/* Is_Optional et Actions */}
                            <div className="md:col-span-3 flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`optional-${i}`}
                                        checked={!!ing.is_optional}
                                        onChange={(e) => {
                                            const updated = [...data.ingredients];
                                            updated[i].is_optional = e.target.checked ? 1 : 0;
                                            setData("ingredients", updated);
                                        }}
                                        className="rounded"
                                    />
                                    <label
                                        htmlFor={`optional-${i}`}
                                        className={`text-sm cursor-pointer ${
                                            ing.is_optional
                                            ? "text-gray-500"
                                            : "text-gray-700"
                                        }`}
                                    >
                                        {ing.is_optional ? "Optionnel" : "Obligatoire"}
                                    </label>
                                </div>

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(i)}
                                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                                >
                                    <Trash2 size={16} />
                                    <span>Supprimer</span>
                                </button>
                            </div>
                        </div>
                    );
                })}

                <button
                    type="button"
                    onClick={addIngredient}
                    className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition"
                >
                    <PlusCircle size={20} /> Ajouter un ingrédient
                </button>
            </div>

            {/* FRONT IMAGE */}
            <div className="bg-white p-6 rounded-lg shadow">
                <label className="block text-lg font-semibold mb-4">
                    Image principale *
                </label>
                {errors.front_image && <p className="text-red-600 text-sm mb-2">{errors.front_image}</p>}

                <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 hover:border-indigo-500 transition cursor-pointer rounded-xl">
                    <ImageDown size={32} className="text-gray-400"/>

                    <div className="text-center">
                        <span className="text-gray-700 font-medium">
                            {frontPreview ? "Changer l'image" : "Ajouter une image"}
                        </span>
                        <p className="text-gray-500 text-sm mt-1">
                            PNG, JPG, WebP (max. 4MB)
                        </p>
                    </div>

                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFrontImageChange}
                        accept=".jpg,.jpeg,.png,.webp"
                    />
                </label>

                {frontPreview && (
                    <div className="mt-4 flex flex-col items-center">
                        <p className="text-sm text-gray-600 mb-2">Aperçu :</p>
                        <img
                            src={frontPreview}
                            className="w-48 h-48 object-cover rounded-lg border shadow-sm"
                            alt="Preview"
                        />
                    </div>
                )}
            </div>

            {/* DIRECTIONS */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between mb-4">
                    <h3 className="text-lg font-semibold">Étapes de préparation *</h3>
                </div>

                {errors.directions && <p className="text-red-600 text-sm mb-3">{errors.directions}</p>}

                {data.directions?.map((step, i) => {
                    const hasStepTitleError = errors[`directions.${i}.step_title`];
                    const hasInstructionError = errors[`directions.${i}.instruction`];

                    return (
                        <div key={i} className="space-y-4 mb-6 border p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-lg">Étape {i + 1}</h4>
                                {data.directions.length > 1 && (
                                    <button
                                        type="button"
                                        className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                                        onClick={() => removeDirection(i)}
                                    >
                                        <Trash2 size={16} /> Supprimer
                                    </button>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Titre de l'étape *</label>
                                <input
                                    type="text"
                                    className={`w-full border rounded px-3 py-2 ${hasStepTitleError ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder={`Ex: Préparation de la pâte`}
                                    value={step.step_title}
                                    onChange={(e) => {
                                        const updated = [...data.directions];
                                        updated[i].step_title = e.target.value;
                                        setData("directions", updated);
                                    }}
                                />
                                {hasStepTitleError && <p className="text-red-600 text-sm mt-1">{hasStepTitleError}</p>}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Instructions *</label>
                                <textarea
                                    rows="4"
                                    className={`w-full border rounded px-3 py-2 ${hasInstructionError ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder={`Décrivez cette étape en détail...`}
                                    value={step.instruction}
                                    onChange={(e) => {
                                        const updated = [...data.directions];
                                        updated[i].instruction = e.target.value;
                                        setData("directions", updated);
                                    }}
                                />
                                {hasInstructionError && <p className="text-red-600 text-sm mt-1">{hasInstructionError}</p>}
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Image de l'étape (optionnel)
                                </label>
                                <div className="flex items-center gap-4">
                                    <label className="cursor-pointer bg-gray-50 hover:bg-gray-100 border rounded px-4 py-2 transition">
                                        <span className="text-sm">Choisir une image</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => handleDirectionImageChange(e, i)}
                                            accept=".jpg,.jpeg,.png,.webp"
                                        />
                                    </label>
                                    {directionPreviews[i] && (
                                        <div className="relative">
                                            <img
                                                src={directionPreviews[i]}
                                                className="w-20 h-20 object-cover rounded border"
                                                alt={`Étape ${i + 1}`}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <button
                    type="button"
                    className="flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 transition"
                    onClick={addDirection}
                >
                    <PlusCircle size={20} /> Ajouter une étape
                </button>
            </div>

            {/* NUTRITION */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Informations Nutritionnelles</h3>

                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { field: "calories", label: "Calories (kcal)", placeholder: "250" },
                        { field: "protein", label: "Protéines (g)", placeholder: "15" },
                        { field: "carbs", label: "Glucides (g)", placeholder: "30" },
                        { field: "fat", label: "Lipides (g)", placeholder: "10" }
                    ].map(({ field, label, placeholder }) => (
                        <div key={field}>
                            <label className="block text-sm text-gray-600 mb-1">{label}</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder={placeholder}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={data.nutrition?.[field] ?? ""}
                                onChange={(e) =>
                                    setData("nutrition", {
                                        ...data.nutrition,
                                        [field]: e.target.value,
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* SUBMIT */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
                >
                    Annuler
                </button>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-bold px-6 py-3 gap-2 flex items-center rounded-lg shadow transition"
                >
                    {processing ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Enregistrement...
                        </>
                    ) : (
                        <>
                            <Save size={20}/> Enregistrer la recette
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}






// import { useForm, usePage } from "@inertiajs/react";
// import { ArrowLeft, ImageDown, Plus, PlusCircle, Save, Trash2, Upload } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// export default function RecipeForm({ recipe, categories, ingredientsList, sectionsList, method, submitUrl }) {
//     const { flash } = usePage().props;

//     const { data, setData, post, processing, errors, reset } = useForm({
//         title: recipe?.title ?? "",
//         description: recipe?.description ?? "",
//         prep_time: recipe?.prep_time ?? "",
//         cook_time: recipe?.cook_time ?? "",
//         status: recipe?.status ?? 0,

//         front_image: null,

//         categories: recipe?.categories?.map(c => c.id) ?? [],

//         ingredients: recipe?.ingredients?.map(ing => ({
//             id: ing.id,
//             quantity: ing.pivot.quantity,
//             section_id: ing.pivot.section_ingredient_id,
//             is_optional: ing.pivot.is_optional ? 1 : 0
//         })) ?? [
//             { id: "", quantity: "", section_id: "", is_optional: 0 }
//         ],

//         directions: recipe?.directions ?? [
//             { step_title: "", instruction: "", direction_image: null }
//         ],

//         nutrition: recipe?.nutrition ?? {
//             calories: "",
//             fat: "",
//             protein: "",
//             carbs: ""
//         },
//     });

//     const [frontPreview, setFrontPreview] = useState(
//         recipe?.front_image ? `/storage/${recipe.front_image}` : null
//     );

//     const handleFrontImageChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         setData("front_image", file); // Upload form data

//         const previewUrl = URL.createObjectURL(file);
//         setFrontPreview(previewUrl); // Immediate preview
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post(submitUrl, { method }, {
//             forceFormData: true,
//             onSuccess: () => toast.success("Traité avec succès"),
//             onError: () => toast.error("Erreur serveur"),
//         });
//     };

//     const addIngredient = () =>
//         setData("ingredients", [...data.ingredients, { id: "", quantity: "", section_id: "", is_optional: 0 }]);

//     const removeIngredient = (i) =>
//         setData("ingredients", data.ingredients.filter((_, idx) => idx !== i));

//     const addDirection = () =>
//         setData("directions", [...data.directions, { instruction: "", direction_image: null }]);

//     const removeDirection = (i) =>
//         setData("directions", data.directions.filter((_, idx) => idx !== i));

//     useEffect(() => {
//         if (Object.keys(errors).length > 0) {
//             toast.error("Merci de corriger les erreurs !");
//             const firstError = document.querySelector("[data-error]");
//             firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//     }, [errors]);

//     return (
//         <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Bouton retour */}
//             <div className="m">
//                 <button
//                     type="button"
//                     onClick={() => window.history.back()}
//                     className="flex font-bold bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
//                 >
//                     <ArrowLeft /> Retour
//                 </button>
//             </div>

//             {/* TITLE & DESCRIPTION */}
//             <div className="bg-white p-6 pt-1 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold mb-4">Informations Générales</h3>

//                 <div className="mb-4">
//                     <label className="block font-medium mb-1">Titre *</label>
//                     <input
//                         value={data.title}
//                         onChange={(e) => setData("title", e.target.value)}
//                         data-error={errors.title ? true : undefined}
//                         className={`w-full border rounded px-3 py-2 ${
//                             errors.title ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
//                 </div>

//                 <div>
//                     <label className="block font-medium mb-1">Description</label>
//                     <textarea
//                         rows="4"
//                         value={data.description}
//                         onChange={(e) => setData("description", e.target.value)}
//                         data-error={errors.description ? true : undefined}
//                         className={`w-full border rounded px-3 py-2 ${
//                             errors.description ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.description && (
//                         <p className="text-red-600 text-sm">{errors.description}</p>
//                     )}
//                 </div>
//             </div>

//             {/* TIMES + STATUS */}
//             <div className="grid sm:grid-cols-3 gap-4 bg-white p-6 pt-1 rounded-lg shadow">
//                 <div>
//                     <label className="block mb-1">Temps de préparation *</label>
//                     <input
//                         type="number"
//                         value={data.prep_time}
//                         onChange={e => setData("prep_time", e.target.value)}
//                         data-error={errors.prep_time ? true : undefined}
//                         className={`w-full border rounded px-3 py-2 ${
//                             errors.prep_time ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.prep_time && <p className="text-red-600 text-sm">{errors.prep_time}</p>}
//                 </div>

//                 <div>
//                     <label className="block mb-1">Temps de cuisson *</label>
//                     <input
//                         type="number"
//                         value={data.cook_time}
//                         onChange={e => setData("cook_time", e.target.value)}
//                         data-error={errors.cook_time ? true : undefined}
//                         className={`w-full border rounded px-3 py-2 ${
//                             errors.cook_time ? "border-red-500" : "border-gray-300"
//                         }`}
//                     />
//                     {errors.cook_time && <p className="text-red-600 text-sm">{errors.cook_time}</p>}
//                 </div>

//                 <div>
//                     <label className="block mb-1">Statut *</label>
//                     <select
//                         data-error={errors.status ? true : undefined}
//                         className={`w-full border rounded px-3 py-2 ${
//                             errors.status ? "border-red-500" : "border-gray-300"
//                         }`}
//                         value={data.status}
//                         onChange={(e) => setData("status", e.target.value)}
//                     >
//                         <option value="1">Publié</option>
//                         <option value="0">Brouillon</option>
//                     </select>
//                 </div>
//             </div>

//             {/* CATEGORIES */}
//             <div className="bg-white p-6 pt-1 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold mb-4">Catégories *</h3>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                     {categories?.map(cat => (
//                         <label key={cat.id} className="flex items-center gap-2">
//                             <input
//                                 type="checkbox"
//                                 checked={data.categories.includes(cat.id)}
//                                 onChange={(e) => {
//                                     const checked = e.target.checked;
//                                     setData("categories",
//                                         checked
//                                             ? [...data.categories, cat.id]
//                                             : data.categories.filter(id => id !== cat.id)
//                                     );
//                                 }}
//                             />
//                             {cat.name}
//                         </label>
//                     ))}
//                 </div>
//             </div>

//             {/* INGREDIENTS */}
//             <div className="bg-white p-6 rounded-lg shadow">
//                 <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold">Ingrédients *</h3>
//                 </div>

//                 {data.ingredients?.map((ing, i) => {
//                     // const selectedIngredient = ingredientsList?.find(x => x.id == ing.id);

//                     return (
//                         <div key={i} className="grid grid-cols-3 gap-3 mb-3">

//                             {/* Ingredient select + new input */}
//                             <div className="flex flex-col gap-1">
//                                 <select
//                                     className="border rounded px-2 py-2"
//                                     value={ing.id || ""}
//                                     onChange={(e) => {
//                                         const updated = [...data.ingredients];
//                                         updated[i].id = e.target.value;
//                                         updated[i].newIngredient = "";
//                                         setData("ingredients", updated);
//                                     }}
//                                 >
//                                     <option value="">Sélectionner</option>
//                                     {ingredientsList?.map((item) => (
//                                         <option key={item.id} value={item.id}>
//                                             {item.name}
//                                         </option>
//                                     ))}
//                                     <option value="new" className="text-orange-500 font-bold">+ Nouveau ingrédient</option>
//                                 </select>

//                                 {ing.id === "new" && (
//                                     <input
//                                         className="border rounded px-2 py-2"
//                                         placeholder="Saisir le nouvel ingrédient"
//                                         value={ing.newIngredient || ""}
//                                         onChange={(e) => {
//                                             const updated = [...data.ingredients];
//                                             updated[i].newIngredient = e.target.value;
//                                             setData("ingredients", updated);
//                                         }}
//                                     />
//                                 )}
//                             </div>

//                             {/* Section select + input si new */}
//                             <div className="flex flex-col gap-1">
//                                 <select
//                                     className="border rounded px-2 py-2"
//                                     value={ing.section_id || ""}
//                                     onChange={(e) => {
//                                         const updated = [...data.ingredients];
//                                         updated[i].section_id = e.target.value;
//                                         updated[i].newSection = "";
//                                         setData("ingredients", updated);
//                                     }}
//                                 >
//                                     <option value="">Sélectionner section</option>
//                                     {sectionsList?.map((sec) => (
//                                         <option key={sec.id} value={sec.id}>
//                                             {sec.nom_section}
//                                         </option>
//                                     ))}
//                                     <option value="new" className="text-orange-500 font-bold">+  Nouvelle section</option>
//                                 </select>

//                                 {ing.section_id === "new" && (
//                                     <input
//                                         className="border rounded px-2 py-2"
//                                         placeholder="Nom de la section"
//                                         value={ing.newSection || ""}
//                                         onChange={(e) => {
//                                             const updated = [...data.ingredients];
//                                             updated[i].newSection = e.target.value;
//                                             setData("ingredients", updated);
//                                         }}
//                                     />
//                                 )}
//                             </div>

//                             {/* Is_Optional */}
//                             <div className="flex items-center gap-2 justify-start">
//                                 <div>
//                                     <input
//                                         type="checkbox"
//                                         checked={!!ing.is_optional}
//                                         onChange={(e) => {
//                                             const updated = [...data.ingredients];
//                                             updated[i].is_optional = e.target.checked ? 1 : 0; // bool en DB
//                                             setData("ingredients", updated);
//                                         }}
//                                         className={`ml-2 text-xs ${
//                                             ing.is_optional
//                                             ? "text-gray-400 line-through"
//                                             : "bg-green-100 font-semibold"
//                                         }`}
//                                     />
//                                     <span
//                                         className={`ml-2 text-xs ${
//                                             ing.is_optional
//                                             ? "text-gray-400 line-through"
//                                             : "text-green-600 font-semibold"
//                                         }`}
//                                         >
//                                         {ing.is_optional ? "Optionnel" : "Obligatoire"}
//                                     </span>
//                                 </div>

//                                 {/* Remove Button */}
//                                 <div className="flex items-center">
//                                     {data.ingredients.length > 1 && (
//                                         <Trash2
//                                             size={18}
//                                             className="cursor-pointer text-red-600"
//                                             onClick={() => removeIngredient(i)}
//                                         />
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}

//                 <button
//                     type="button"
//                     onClick={addIngredient}
//                     className="flex items-center gap-2 text-blue-600 font-bold"
//                 >
//                     <PlusCircle size={32} /> Ajouter un ingrédient
//                 </button>
//             </div>

//             {/* FRONT IMAGE */}
//             <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
//                 <label className="block text-lg font-semibold mb-4">
//                     Image principale *
//                 </label>

//                 <label className="flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 hover:border-indigo-500 transition cursor-pointer rounded-xl">
//                     <ImageDown size={42}/>

//                     <span className="text-gray-600 text-sm">
//                         Cliquez ou déposez une image ici
//                     </span>

//                     <input
//                         type="file"
//                         className="hidden"
//                         onChange={handleFrontImageChange}
//                         // required
//                     />
//                 </label>

//                 {errors.front_image && (
//                     <p className="text-red-600 text-sm mt-2">{errors.front_image}</p>
//                 )}

//                 {frontPreview && (
//                     <div className="mt-4">
//                         <img
//                             src={frontPreview}
//                             className="w-40 h-40 object-cover rounded-xl border shadow-sm"
//                             alt="Preview"
//                         />
//                     </div>
//                 )}
//             </div>

//             {/* DIRECTIONS */}
//             <div className="bg-white p-6 rounded-lg shadow">
//                 <div className="flex justify-between mb-4">
//                     <h3 className="text-lg font-semibold">Étapes de cuisine *</h3>
//                 </div>

//                 {data.directions?.map((step, i) => (
//                     <div key={i} className="space-y-2 mb-2 border p-4 rounded-lg">
//                         <input
//                             type="text"
//                             className="mt-1"
//                             placeholder={`Etape_${i+1} ...`}
//                             onChange={(e) => {
//                                 const updated = [...data.directions];
//                                 updated[i].step_title = e.target.value;
//                                 setData("directions", updated);
//                             }}
//                         />
//                         <textarea
//                             rows="3"
//                             className="w-full border rounded px-2 py-2"
//                             placeholder={`Instruction_${i+1} ...`}
//                             value={step.instruction}
//                             onChange={(e) => {
//                                 const updated = [...data.directions];
//                                 updated[i].instruction = e.target.value;
//                                 setData("directions", updated);
//                             }}
//                         />
//                         <div className="flex justify-between">
//                             <input
//                                 type="file"
//                                 className="mt-1"
//                                 onChange={(e) => {
//                                     const updated = [...data.directions];
//                                     updated[i].direction_image = e.target.files[0];
//                                     setData("directions", updated);
//                                 }}
//                             />
//                             {data.directions.length > 1 && (
//                                 <button type="button" className="text-red-600 flex items-center"
//                                     onClick={() => removeDirection(i)}>
//                                     <Trash2 size={18} /> Supprimer
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}

//                 <div>
//                     <button className="flex items-center gap-1 font-bold text-blue-600" type="button" onClick={addDirection}>
//                         <PlusCircle size={32} />Ajouter une étape
//                     </button>
//                 </div>
//             </div>

//             {/* NUTRITION */}
//             <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-lg font-semibold mb-4">Information Nutritionnelle :</h3>

//                 <div className="grid sm:grid-cols-4 gap-3">
//                     {["calories", "fat", "protein", "carbs"].map((field) => (
//                         <input
//                             key={field}
//                             placeholder={field.toUpperCase()}
//                             className="border rounded px-2 py-2"
//                             value={data.nutrition?.[field] ?? ""}
//                             type="number"
//                             step="0.01"
//                             onChange={(e) =>
//                                 setData("nutrition", {
//                                     ...data.nutrition,
//                                     [field]: e.target.value,
//                                 })
//                             }
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* SUBMIT */}
//             <div className="text-end flex items-center justify-center">
//                 <button
//                     disabled={processing}
//                     className="bg-orange-600 hover:bg-blue-700 text-white font-bold px-5 py-3 gap-2 flex items-center rounded-lg shadow transition"
//                 >
//                     <Save size={24}/> Enregistrer la recette
//                 </button>
//             </div>
//         </form>
//     );
// }
