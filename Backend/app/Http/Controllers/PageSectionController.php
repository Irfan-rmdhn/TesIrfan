<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Http\Request;

class PageSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request, string $slug)
    {
        $val = $request->validate([
            'template_id' => 'required|integer|exists:templates,id',
            'position' => 'required|integer|min:1',
        ]);
        $page = Page::where('slug', $slug)->first();
        $pageSec = PageSection::create([
            'template_id' => $val['template_id'],
            'position' => $val['position'],
            'name' => $request->name,
            'page_id' => $page->id,
        ]);
        return response()->json(
            [
                'status' => 'success',
                'message' => 'Section added successful',
                'data' => $pageSec,
            ],
            201,
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $page = Page::where('slug',$slug)->first();
        $pageSec = PageSection::where('page_id',$page->id)->first();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PageSection $pageSection)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PageSection $pageSection)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PageSection $pageSection)
    {
        //
    }
}
