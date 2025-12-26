<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
                            // || !Auth::user()->isAdmin()
        if (!Auth::check() || Auth::user()->role !== 'admin') {

            return redirect()->route('login')->with('error', 'Accès non autorisé');
        }

        return $next($request);
    }
}


// use Symfony\Component\HttpFoundation\Response;

// class AdminMiddleware
// {
//     /**
//      * Handle an incoming request.
//      *
//      * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
//      */
//     public function handle(Request $request, Closure $next): Response
//     {
//         return $next($request);
//     }
// }
