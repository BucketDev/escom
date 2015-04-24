<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class RolDAO extends ESCOM_Model{

    var $table  = 'cat_roles';
    var $id     = 'rol_k';

    function getPermisosByRol($rol_k){
        $where  = array(
            $this->id   => $rol_k
        );

        $result = $this->db->get_where('tb_roles_acciones', $where);
        return $result->num_rows() > 0 ? $result->result_array() : FALSE;
    }

    function getRoles()
    {
        $where = array(
            'activo'    => 1,
            'rol_k !='     => '1'
        );

        $resultado = $this->db->get_where('cat_roles', $where);

        return $resultado->num_rows() > 0 ? $resultado->result_array() : FALSE;
    }

}

?>