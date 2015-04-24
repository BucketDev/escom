<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class SeguimientoDAO extends ESCOM_Model{

    var $table  = 'tb_seguimientos';
    var $id     = 'seguimiento_k';

    /**
     * Método que obtiene los registros de seguimiento para un usuario
     * @param $usuario_k    int identificador de la tabla de usuarios, usuario responsable de las solicitudes
     * @param $start        int valor de paginación de inicio, por defecto 0
     * @param $limit        int valor de paginación de fin, por defecto 20
     * @param null $params  array con parámetros de filtrado, por defecto NULL
     *
     * @return bool
     */
    function getSeguimientos($usuario_k, $start, $limit, $params = NULL)
    {
        $seguimientos = array();
        $where  = array(
            'seg.activo'                => 1,
            'seg.usuario_responsable_k' => $usuario_k
        );
        if(!empty($params)){
            $this->getWhereToSeguimientos($params);
        }

        #inicializar los valores para la fecha de entrega
        $this->db->query('SET @delivery = ""');
        #realizar la consulta
        $this->db->select('SQL_CALC_FOUND_ROWS *', false)
            ->select('doc.documento_k, doc.nombre AS documento, seg.seguimiento_k, doc.tiempo_minimo,
            seg.timestamp_creacion AS fecha_solicitud, e.estatus_k, e.nombre AS estatus,
            concat_ws(" ", us.nombre, us.apellido_paterno) AS nombre, us.foto,
            @delivery := DATE( DATE_ADD( seg.timestamp_creacion, INTERVAL doc.tiempo_minimo DAY ) )', false)
            ->join('cat_documentos AS doc', 'doc.documento_k = seg.documento_k AND doc.activo = 1')
            ->join('cat_estatus AS e',      'e.estatus_k = seg.estatus_k')
            ->join('tb_usuarios AS us',     'us.usuario_k = seg.usuario_creacion_k AND us.activo = 1')
            ->where($where);

        $resultado = $this->db->get("{$this->table} AS seg", $limit, $start);

        $seguimientos['data'] = $resultado->result_array();
        $seguimientos['total'] = $this->getFoundRecords();

        return $seguimientos;
    }

    function getWhereToSeguimientos($params){
        $where = '';
        foreach($params as $param){
            switch($param->category){
                case 'date':
                    if(!empty($param->keys)){
                        if($param->keys[0] === 0/*Today*/){
                            $where .= ' @delivery <= curdate() ';
                        } else if ($param->keys[0] === 1/*Week*/){
                            $where .= ' @delivery > curdate() AND @delivery < DATE_ADD(seg.timestamp_creacion, INTERVAL 7 DAY ) ';
                        } else {
                            break;
                        }
                        $this->db->where($where, NULL, false);
                    }
                    break;
                case 'status':
                    if(!empty($param->keys)){
                        $where = '(e.estatus_k = ' . implode(' OR e.estatus_k = ', $param->keys) . ')';
                        $this->db->where($where, NULL, false);
                    }
                    break;
                case 'document':
                    if(!empty($param->keys)){
                        $where = '(doc.documento_k = ' . implode(' OR doc.documento_k = ', $param->keys) . ')';
                        $this->db->where($where, NULL, false);
                    }
                    break;
            }
        }
    }


    function getByTime($usuario_k)
    {
        $where  = array(
            'seg.activo'                => 1,
            'seg.usuario_responsable_k' => $usuario_k
        );

        $this->db->select('DATE( DATE_ADD(seg.timestamp_creacion, INTERVAL doc.tiempo_minimo DAY) ) AS delivery', false)
            ->join('cat_documentos AS doc', 'doc.documento_k = seg.documento_k AND doc.activo = 1')
            ->where($where);

        $result = $this->db->get("{$this->table} AS seg");

        return $result->num_rows() > 0 ? $result->result_array() : FALSE;
    }

    function getByStatus($usuario_k){

        $where  = array(
            'seg.activo'                => 1,
            'seg.usuario_responsable_k' => $usuario_k
        );

        $this->db->select('e.estatus_k AS llave_k, e.nombre, COUNT(e.estatus_k) AS valor', false)
            ->join('cat_documentos AS doc', 'doc.documento_k = seg.documento_k AND doc.activo = 1')
            ->join('cat_estatus AS e', 'e.estatus_k = seg.estatus_k')
            ->where($where)
            ->group_by('e.estatus_k');

        $result = $this->db->get("{$this->table} AS seg");

        return $result->num_rows() > 0 ? $result->result_array() : FALSE;
    }

    function getByDocuments($usuario_k){

        $where  = array(
            'seg.activo'                => 1,
            'seg.usuario_responsable_k' => $usuario_k
        );

        $this->db->select('doc.documento_k AS llave_k, doc.nombre, COUNT(doc.documento_k) AS valor', false)
            ->join('cat_documentos AS doc', 'doc.documento_k = seg.documento_k AND doc.activo = 1')
            ->where($where)
            ->group_by('doc.documento_k');

        $result = $this->db->get("{$this->table} AS seg");

        return $result->num_rows() > 0 ? $result->result_array() : FALSE;
    }

    /**
     * Método que obtiene el historico de cambio de estatus para un seguimiento dado
     * @param $seguimiento_k int identificador del registro de seguimiento
     *
     * @return bool
     */
    function getHistoricoSeguimientos($seguimiento_k){
        $where = array(
            'seguimiento_k' => $seguimiento_k
        );

        $this->db->select('his.historial_seguimiento_k, his.seguimiento_k, his.estatus_anterior_k,
        old_e.nombre AS estatus_anterior, his.estatus_actual_k,
        new_e.nombre AS estatus_actual, his.usuario_modificacion_k, us.foto,
		concat_ws(" ", us.nombre, us.apellido_paterno) AS usuario_modificacion, his.timestamp_modificacion', false)
            ->join('cat_estatus AS old_e', 'old_e.estatus_k = his.estatus_anterior_k')
            ->join('cat_estatus AS new_e', 'new_e.estatus_k = his.estatus_actual_k')
            ->join('tb_usuarios AS us', 'us.usuario_k = his.usuario_modificacion_k')
            ->where($where);

        $result = $this->db->get('tb_historial_seguimientos as his');

        return $result->num_rows() > 0 ? $result->result_array() : FALSE;

    }

}

?>