<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $pages = Page::where('user_id', $user->id)->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Get all pages successful',
            'data' => $pages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $val = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:pages,slug|regex:/^[a-z0-9.-]+$/',
            'summary' => 'nullable|string',
        ]);
        $user = Auth::user();
        $page = Page::create([
            'title' => $val['title'],
            'slug' => $val['slug'],
            'summary' => $val['summary'],
            'user_id' => $user->id,
        ]);
        return response()->json(
            [
                'status' => 'success',
                'message' => 'Page created successful',
                'data' => [$page],
            ],
            201,
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $page = Page::where('slug', $id)->first();
        if (!$page) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Not found',
                ],
                404,
            );
        }
        $user = Auth::user();
        if ($user->id !== $page->user_id) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Forbidden access',
                ],
                403,
            );
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Get page successful',
            'data' => $page,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug)
    {
        $user = Auth::user();
        $page = Page::where('slug', $slug)->first();
        if (!$page) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Not found',
                ],
                404,
            );
        }
        if ($user->id !== $page->user_id) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Forbidden access',
                ],
                403,
            );
        }
        $val = $request->validate([
            'title' => 'nullable|string',
            'slug' => 'nullable|string|unique:pages,slug|regex:/^[a-z0-9.-]+$/',
            'summary' => 'nullable|string',
        ]);
        $page->update([
            'title' => $val['title'] ?? $page->title,
            'slug' => $val['slug'] ?? $page->slug,
            'summary' => $val['summary'] ?? $page->summary,
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Page updated successful',
            'data' => $page,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        $page = Page::where('slug', $slug)->first();
        $user = Auth::user();
        if (!$page) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Not found',
                ],
                404,
            );
        }
        if ($user->id !== $page->user_id) {
            return response()->json(
                [
                    'status' => 'error',
                    'message' => 'Forbidden access',
                ],
                403,
            );
        }
        $page->delete();
        return response()->json([
            'status' => 'success',
            'message' => 'Page deleted successful',
        ]);
    }
}
