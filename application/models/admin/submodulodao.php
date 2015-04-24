<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class SubmoduloDAO extends ESCOM_Model{

    var $table  = 'cat_modulos';
    var $id     = 'modulo_k';

    function getSubmodules($rol_k, $modulo_k){
        $where  = array(
            'ra.rol_k'  => $rol_k,
            'ra.activo' => 1
        );

        if(empty($modulo_k)){
            //Obtener la consulta de los módulos por completo, dependiendo del rol de la persona
            $this->db->select('m.modulo_k, m.nombre, m.descripcion, m.icono')
                ->group_by('m.modulo_k');
        } else {
            //únicamente obtener los submódulos
            $where['m.modulo_k'] = $modulo_k;
            $this->db->select('s.submodulo_k, s.nombre, s.descripcion, s.controlador, s.icono, true as leaf', false)
                ->group_by('s.submodulo_k');
        }
        $this->db->from('tb_roles_acciones AS ra')
            ->join('cat_submodulos_acciones AS sa', 'sa.submodulo_accion_k = ra.submodulo_accion_k AND sa.activo = 1')
            ->join('cat_submodulos AS s',           's.submodulo_k = sa.submodulo_k AND s.activo = 1')
            ->join('cat_modulos AS m',              'm.modulo_k = s.modulo_k AND m.activo = 1')
            ->where($where);

        $result = $this->db->get();


        return $result->num_rows() > 0 ? $result->result_array() : FALSE;
    }

}

?>