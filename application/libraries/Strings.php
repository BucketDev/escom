<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Strings {

    public function set_null($value = '', $force_null = FALSE)
    {
        if ($force_null == TRUE)
        {
            return NULL;
        }
        return $value == '' ? NULL : $value;
    }

}