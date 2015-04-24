<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class ESCOM_Model extends CI_Model{

    var $bitacora_table = 'tb_bitacora_errores';
    var $modulo_k;
    var $submodulo_k;

    /**
     * Función que obtiene un registro mediante su identificador
     * @param $id int identificador del registro
     *
     * @return bool si no encontró un registro válido o el registro mismo
     */
    public function getRowById($id)
    {
        $arr_where = array(
            $this->id   => $id
        );

        $result = $this->db->get_where($this->table, $arr_where);
        return $result->num_rows() > 0 ? $result->row_array() : FALSE;
    }

    public function logError($params){
        $params['modulo_k'] = $this->modulo_k;
        $params['submodulo_k'] = $this->submodulo_k;

        $this->db->insert($this->bitacora_table, $params);

    }

    protected function getFoundRecords(){
        $this->db->select('FOUND_ROWS() AS total', false);

        $resultado = $this->db->get();
        $total = $resultado->row_array();

        return $total['total'] ? $total['total'] : 0;
    }

}