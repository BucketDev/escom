<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Class Admin
 * Esta clase está encargada de controlar las acciones realizadas dentro del administrador de la aplicación,
 * sin embargo, para tareas mas detalladas, existe la división del trabajo para cada uno de los módulos del sistema.
 * @extends ESCOM_Controller
 * @author  ISC Rodrigo Loyola Jaramillo
 *          México, 02 Febrero 2014
 */
class Admin extends ESCOM_Controller {

    public function index()
    {
        $user = $this->session->getUserName();

        //Cargar el idioma para el administrador
        $this->lang->load('admin');

        //cargar el modelo de usuarios para obtener los permisos del usuario
        $this->load->model('admin/usuariodao', 'usuario');
        $usuario = $this->usuario->findByUser($user);

        $arr_config = array(
            'datos' => json_encode(
                array(
                    'nombre'            => $usuario['nombre'],
                    'apellido_paterno'  => $usuario['apellido_paterno']
                )
            )
        );

        $this->load->view('admin/admin.php', $arr_config);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */