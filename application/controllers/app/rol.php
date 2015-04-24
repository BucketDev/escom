<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Class Usuario
 * Clase encargada de controlar las acciones para el módulo de usuarios
 * @extends ESCOM_Controller
 * @author  ISC Rodrigo Loyola Jaramillo
 *          México, 04 Febrero 2014
 */
class Rol extends ESCOM_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('admin/roldao', 'dao');
    }

    function getroles()
    {
        $roles = $this->dao->getRoles();

        $this->getSuccess(array('data' => $roles));
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */