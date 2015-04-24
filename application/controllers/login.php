<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Class Login
 * Esta clase está encargada de realizar el logueo del usuario
 * @extends ESCOM_Controller
 * @author  ISC Rodrigo Loyola Jaramillo
 *          México, 02 Febrero 2014
 */
class Login extends CI_Controller {

    function __construct()
    {
        parent::__construct();
    }

    /**
     * Método que es usado para loguear a un usuario a la plataforma, en caso de haber encontrado un registro válido
     */
    function authenticate()
    {
        $response = array();

        //Variables enviadas por post
        $user = $this->input->post('user');
        $pass = $this->input->post('password');

        //Obtener el registro del usuario, mediante el username/usuario
        $this->load->model('admin/usuariodao', 'usuario');
        $user = $this->usuario->findByUser($user);

        //Si no se obtuvo un registro, si este está inactivo o si la contraseña es diferente a la enviada
        if(!$user || $user['activo'] == 0 || $user['contrasena'] != $pass){
            //Enviar los mensajes de error, dependiendo del error producido
            $response['response'] = 'No existe, inactivo';
            $response['success'] = FALSE;
        } else {
            //Obtener el controlador principal alojado en la tabla de roles
            $this->load->model('admin/roldao', 'rol');
            $rol = $this->rol->getRowById($user['rol_k']);

            //Iniciar la sesión del usuario
            $this->session->login_user($user, $rol);
            $response['success'] = TRUE;
        }

        $this->output->set_output(
            json_encode($response)
        );
    }

    /**
     * Método que es usado para desloguear a un usuario de la plataforma
     */
    function logout()
    {
        $this->session->logout_user();
    }
}

?>