<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class UsuarioDAO extends ESCOM_Model{

    var $table  = 'tb_usuarios';
    var $id     = 'usuario_k';
    var $modulo_k       = 1;
    var $submodulo_k    = 1;

    /**
     * Función que obtiene un usuario de la BD mediante su username
     * @param $user usuario de la plataforma
     *
     * @return bool si no encontró al usuario o el registro en otro caso
     */
    public function findByUser($user)
    {
        $arr_where = array(
            'usuario'   => $user
        );

        $result = $this->db->get_where($this->table, $arr_where);
        return $result->num_rows() > 0 ? $result->row_array() : FALSE;
    }

    /**
     * Método que obtiene los permisos de un submódulo para un rol dado
     * @param $rol_k        int identificador del rol de la persona
     * @param $submodulo_k  int identificador del submodulo
     *
     * @return array        con los permisos encontrados
     */
    public function getPermisos($rol_k, $submodulo_k)
    {

        $this->db->select('sub_acc.accion')
            ->from('tb_roles_acciones AS rol_acc')
            ->join('cat_submodulos_acciones AS sub_acc',
                'rol_acc.submodulo_accion_k = sub_acc.submodulo_accion_k AND sub_acc.activo = 1')
            ->where(array(
                'rol_acc.rol_k'         => $rol_k,
                'sub_acc.submodulo_k'   => $submodulo_k,
                'rol_acc.activo'        => 1
            ));

        $resultado = $this->db->get();

        return $resultado->result_array();
    }

    public function getUsuarios($start, $limit)
    {
        $usuarios = array();
        $where = array(
            'u.activo'    => 1
        );
        $this->db->select('SQL_CALC_FOUND_ROWS *', false)
            ->select('u.*, c.nombre AS carrera, r.nombre as rol, p.nombre as plan')
            ->join('cat_carreras AS c', 'c.carrera_k = u.carrera_k AND c.activo = 1', 'left')
            ->join('cat_roles AS r', 'r.rol_k = u.rol_k AND r.activo = 1')
            ->join('cat_planes AS p', 'p.plan_k = u.plan_k AND p.activo = 1', 'left')
            ->where($where);

        $resultado = $this->db->get("{$this->table} AS u", $limit, $start);

        $usuarios['data'] = $resultado->result_array();
        $usuarios['total'] = $this->getFoundRecords();

        return $usuarios;
    }

    public function getCarreras()
    {
        $where = array(
            'activo'    => 1
        );

        $resultado = $this->db->get_where('cat_carreras', $where);

        return $resultado->num_rows() > 0 ? $resultado->result_array() : FALSE;
    }

    public function getPlanes()
    {
        $where = array(
            'activo'    => 1
        );

        $resultado = $this->db->get_where('cat_planes', $where);

        return $resultado->num_rows() > 0 ? $resultado->result_array() : FALSE;
    }

    public function addUser($usuario){
        $this->db->insert($this->table, $usuario);

        if($this->db->_error_number()){
            $msgLog     = $this->db->_error_message();
            $msgFront   = $this->lang->line('failure_add_user');
            $this->logError(array(
                'mensaje_log' => $msgLog,
                'mensaje_usuario' => $msgFront,
                'clase' => __CLASS__,
                'metodo' => __FUNCTION__,
                'params' => json_encode($usuario)
            ));
        } else{
            $msgFront = $this->lang->line('success_add_user');
        }
        return $msgFront;
    }
}

?>