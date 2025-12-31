import { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Search, Plus, Pencil, Trash2, Filter, PlusSquare, PlusSquareIcon, LucideSatelliteDish, Utensils, UtensilsCrossed } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import List from "./Recipes/List";
import Categories from "./Categories/List";
import {toast} from "sonner";

export default function AdminDashboard({recipes, categories}) {
    const { flash } = usePage().props;

    // Afficher les messages flash
    useEffect(() => {
        if (flash?.success) {
        toast.success(flash.success);
        }
        if (flash?.error) {
        toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AdminLayout>
            {/* Listing des recettes */}
            <List
                recipes={recipes}
                categories={categories}
            />

            {/* Categories */}
            {/* <Categories
                categories={categories}
            /> */}
        </AdminLayout>
    );
}
