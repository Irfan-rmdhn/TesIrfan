<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\PageSection;
use App\Models\SectFIelds;
use Illuminate\Http\Request;

class SectFIeldsController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SectFIelds $sectFIelds)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SectFIelds $sectFIelds)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $slug, string $id)
    {
        $page = Page::where('slug', $slug)->firstOrFail();

        $pageSec = PageSection::where('page_id', $page->id)->where('id', $id)->first();
        $val = $request->validate([
            'fields' => 'required|array',
            'fields.*.field_id' => 'required|integer',
            'fields.*.value' => 'required',
        ]);

        foreach ($val['fields'] as $field) {
            SectFIelds::where('page_section_id', $pageSec->id)
                ->where('template_field_id', $field['field_id'])
                ->first()
                ->update(['value' => $field['value']]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Section fields updated successful',
            'data' => SectFIelds::where('page_section_id', $pageSec->id)->get(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SectFIelds $sectFIelds)
    {
        //
    }
}
