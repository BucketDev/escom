<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Class Submodules
 * Clase encargada de controlar las acciones para el módulo de submódulos
 * @extends ESCOM_Controller
 * @author  ISC Rodrigo Loyola Jaramillo
 *          México, 02 Febrero 2014
 */
class Submodulo extends ESCOM_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('admin/submodulodao', 'dao');
    }


    function getsubmodules()
    {
        $rol_k      = $this->session->getRol();
        $modulo_k   = $this->input->post('modulo_k');

        $submodules = $this->dao->getSubmodules($rol_k, $modulo_k);

        $this->getSuccess(array('data' => $submodules));
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */