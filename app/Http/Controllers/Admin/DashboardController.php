<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Recipes list.
     */
    public function index(Request $request)
    {
        $query = Recipe::with('author', 'categories')->latest();

        if ($request->filled('search')) {
            $query->where(function ($sub) use ($request) {
                $sub->where('title', 'LIKE', "%{$request->search}%")
                    ->orWhere('description', 'LIKE', "%{$request->search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('category_id')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('categories.id', $request->category_id);
            });
        }

        return Inertia::render('Admin/AdminDashboard', [
            'recipes' => $query->paginate(20)->withQueryString(),
            'categories'  => Category::select('id','name')->get(),
        ]);
    }

}
