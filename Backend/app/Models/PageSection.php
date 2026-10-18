<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
    protected $guarded = [];
    public function templa(){
        return $this->belongsTo(Template::class,'template_id');
    }
    public function fiel(){
        return $this->hasMany(TemplateField::class,'template_id','template_id');
    }
    public $hidden = ['templa','fiel'];
    protected $appends = ['template','fields'];

    public function getFieldsAttribute(){
        return $this->fiel;
    }
    public function getTemplateAttribute(){
        return $this->templa;
    }
}