<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class ESCOM_Session extends CI_Session {

    function __construct()
    {
        parent::__construct();
    }

    /**
     * Método que valida si un usuario está logueado en la plataforma, si lo está, valida el origen, es decir,
     * desde donde se está haciendo la petición y si le corresponde ese lugar, los orígenes posibles son admin o
     * seguimiento, si no está logueado, lo envía a la pantalla de login
     */
    function validate_logged()
    {
        if($this->is_logged()){
            if(!$this->validate_origin()){
                header('Location: ' . site_url($this->getController()));
            }
        } else {
            if($this->CI->uri->segment(2)){
                echo(
                    json_encode( array(
                            "fatal" => "Los datos de su sesi&oacute;n han caducado.
        					            <br>Para continuar, es necesario que vuelva a autenticarse.
        					            Lamentamos el inconveniente."
                        )
                    )
                );
                exit;
            } else if($this->CI->uri->segment(1)) {
                header('Location: ' . site_url());
            }
        }
    }

    /**
     * Método que valida el origen de donde se está haciendo la petición y retorna si el usuario está permitido
     * realizar las peticiones desde ese punto, los orígenes válidos son admin y seguimiento
     * @return bool
     */
    function validate_origin(){
        return $this->CI->uri->segment(1) === $this->getController() ||
        $this->CI->uri->segment(1) === $this->getOrigen();
    }

    /**
     * Método que valida si un usuario está logueado en la plataforma mediante la obtención de su usuario
     * @return string
     */
    function is_logged()
    {
        return $this->getUserName();
    }

    /**
     * Método que obtiene el usuario alojado en la sesión
     * @return string
     */
    function getUserName(){
        return $this->userdata('user');
    }

    /**
     * Método que obtiene el identificador del usuario alojado en la sesión
     * @return string
     */
    function getUserId(){
        return $this->userdata('usuario_k');
    }

    /**
     * Método que obtiene el controlador alojado en la sesión
     * @return string
     */
    function getController(){
        return $this->userdata('controller');
    }

    /**
     * Método que obtiene el controlador alojado en la sesión
     * @return string
     */
    function getOrigen(){
        return $this->userdata('origen');
    }

    /**
     * Método que obtiene el controlador alojado en la sesión
     * @return string
     */
    function getRol(){
        return $this->userdata('rol');
    }

    /**
     * Método encargado de crear la sesión del usuario, una vez validado su usuario y contraseña
     * @param $user array   datos del registro de la tabla de usuarios
     * @param $rol  array   datos del registro de la tabla de roles
     */
    function login_user($user, $rol)
    {
        $this->set_userdata('user', $user['usuario']);
        $this->set_userdata('usuario_k', $user['usuario_k']);
        $this->set_userdata('controller', $rol['controlador']);

        if($rol['controlador'] == 'admin'){
            $this->set_userdata('origen', 'app');
        } else {
            $this->set_userdata('origen', 'solicitud');
        }
        $this->set_userdata('rol', $rol['rol_k']);
    }

    function logout_user()
    {
        $this->sess_destroy();
    }
}