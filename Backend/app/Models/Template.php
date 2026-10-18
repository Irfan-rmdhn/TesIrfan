<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    public function fields(){
        return $this->hasMany(TemplateField::class,'template_id');
    }
}
