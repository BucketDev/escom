<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Class Submodules
 * Clase encargada de controlar las acciones para el módulo de submódulos
 * @extends ESCOM_Controller
 * @author  ISC Rodrigo Loyola Jaramillo
 *          México, 02 Febrero 2014
 */
class Seguimiento extends ESCOM_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('admin/seguimientodao', 'dao');
    }

    /**
     * Método que obtiene los registros de seguimiento para un usuario
     */
    function getseguimientos()
    {
        //TODO obtener todos los registros en caso de ser un rol superior, para poder reasignarlos
        $usuario_k  = $this->input->post('usuario_k') ? $this->input->post('usuario_k') : $this->session->getUserId();
        $params     = json_decode($this->input->post('params'));
        $start      = $this->input->post('start') ? $this->input->post('start') : 0;
        $limit      = $this->input->post('limit') ? $this->input->post('limit') : $this->NUM_PAGINAS;

        $seguimientos = $this->dao->getSeguimientos($usuario_k, $start, $limit, $params);

        $this->getSuccess($seguimientos);
    }

    /**
     * Metodo que obtiene los registros de seguimiento para un usuario categorizados por fecha de entrega
     */
    function getbytime()
    {
        //TODO obtener todos los registros en caso de ser un rol superior, para poder reasignarlos
        $usuario_k  = $this->input->post('usuario_k') ? $this->input->post('usuario_k') : $this->session->getUserId();

        $seguimientos = $this->dao->getByTime($usuario_k);

        $count_seg = $this->getCountSeguimientosByTime($seguimientos);

        $this->getSuccess(array('data' => $count_seg));
    }

    /**
     * Metodo que obtiene los registros de seguimiento para un usuario categorizados por estatus
     */
    function getbystatus()
    {
        //TODO obtener todos los registros en caso de ser un rol superior, para poder reasignarlos
        $usuario_k  = $this->input->post('usuario_k') ? $this->input->post('usuario_k') : $this->session->getUserId();

        $seguimientos = $this->dao->getByStatus($usuario_k);

        $this->getSuccess(array('data' => $seguimientos));
    }

    /**
     * Metodo que obtiene los registros de seguimiento para un usuario categorizados por estatus
     */
    function getbydocuments()
    {
        //TODO obtener todos los registros en caso de ser un rol superior, para poder reasignarlos
        $usuario_k  = $this->input->post('usuario_k') ? $this->input->post('usuario_k') : $this->session->getUserId();

        $seguimientos = $this->dao->getByDocuments($usuario_k);

        $this->getSuccess(array('data' => $seguimientos));
    }

    /**
     * Método que contabiliza los registros obtenidos por fechas, para la lista de filtros para las solicitudes
     * @param $seguimientos array   con los registros sin clasificar
     *
     * @return array registros clasificados y contabilizados
     */
    function getCountSeguimientosByTime($seguimientos){
        $count_seg = array(
            array(
                'llave_k'   => 0,
                'nombre'    => 'Hoy',
                'valor'     => 0
            ),
            array(
                'llave_k'    => 1,
                'nombre'    => 'Semana',
                'valor'     => 0
            ),
            array(
                'llave_k'    => 2,
                'nombre'    => 'Todos',
                'valor'     => 0
            )
        );
        $today = strtotime(date("Y-m-d"));
        $week = strtotime(date("Y-m-d") . '+ 7 days');

        if($seguimientos){
            foreach($seguimientos as $seguimiento){
                $delivery = strtotime($seguimiento['delivery']);

                if ($delivery <= $today) {
                    $count_seg[0]['valor']++;
                } else if($delivery > $today && $delivery <= $week){
                    $count_seg[1]['valor']++;
                }
            }
            $count_seg[2]['valor'] = count($seguimientos);
        }

        return $count_seg;
    }

    /**
     * Método que obtiene el historico de cambio de estatus para un seguimiento dado
     */
    function gethistoricoseguimientos(){
        $seguimiento_k  = $this->input->post('seguimiento_k');

        $historicos = $this->dao->getHistoricoSeguimientos($seguimiento_k);

        $this->getSuccess(array('data' => $historicos));
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */