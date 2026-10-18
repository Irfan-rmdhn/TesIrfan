<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $guarded = [];
    public $hidden = ['sectio'];
    protected $appends = ['sections'];
    public function getSectionsAttribute(){
        return $this->sectio;
    }
    public function sectio(){
        return $this->hasMany(PageSection::class);
    }

}