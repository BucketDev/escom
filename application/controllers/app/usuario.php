<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Class Usuario
 * Clase encargada de controlar las acciones para el módulo de usuarios
 * @extends ESCOM_Controller
 * @author  ISC Rodrigo Loyola Jaramillo
 *          México, 04 Febrero 2014
 */
class Usuario extends ESCOM_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('admin/usuariodao', 'dao');
        $this->load->library('Strings');
    }


    function getpermisos()
    {
        $rol_k          = $this->session->getRol();
        $submodulo_k    = $this->input->post('submodulo_k');

        $permisos = $this->dao->getPermisos($rol_k, $submodulo_k);

        $this->getSuccess(array('data' => $permisos));
    }

    function getusuarios()
    {
        $start      = $this->input->post('start') ? $this->input->post('start') : 0;
        $limit      = $this->input->post('limit') ? $this->input->post('limit') : $this->NUM_PAGINAS;
        $usuarios   = $this->dao->getUsuarios($start, $limit);

        $this->getSuccess($usuarios);
    }

    function getcareers()
    {
        $carreras = $this->dao->getCarreras();

        $this->getSuccess(array('data' => $carreras));
    }

    function getplans()
    {
        $planes = $this->dao->getPlanes();

        $this->getSuccess(array('data' => $planes));
    }

    function adduser(){
        #Se inicializa mensaje de error al agregar un usuario
        $success = true;

        $usuario = $this->input->post(NULL, TRUE);
        $usuario['usuario_creacion_k'] = $this->session->getUserId();
        $hasFoto = $usuario['hasFoto'];
        unset($usuario['hasFoto']);

        $usuario = $this->cleanData($usuario);

        if($hasFoto == 'true'){
            #Se incluye la libreria upload para la carga de la foto de perfil
            $this->load->library('upload');

            $validUpload = $this->upload->do_upload('foto');

            if(!$validUpload){
                $msgLog = $this->upload->display_errors();
                $msgFront = $msgLog;
                $this->dao->logError(array(
                    'mensaje_log' => $msgLog,
                    'mensaje_usuario' => $msgLog,
                    'clase' => __CLASS__,
                    'metodo' => __FUNCTION__,
                    'params' => json_encode($usuario)
                ));
            } else {
                //Se carga archivo de configuracion: upload
                $this->config->load('upload', TRUE);
                //Se obtiene el path de carga de imagenes de usuarios
                $file_path = $this->config->item('upload_path', 'upload');
                //Se obtiene los datos de respuesta de la subida del archivo
                $response = $this->upload->data();

                $usuario['foto'] = $file_path . $response['orig_name'];

                $msgFront = $this->dao->addUser($usuario);
            }
            $success = $validUpload;
        } else {
            $msgFront = $this->dao->addUser($usuario);
        }

        $this->getSuccess(array('msg' => $msgFront), $success);
    }

    private function cleanData($arrUsuario){
        $arrUsuario['carrera_k'] = $this->strings->set_null($arrUsuario['carrera_k']);
        $arrUsuario['plan_k'] = $this->strings->set_null($arrUsuario['plan_k']);
        $arrUsuario['periodo_ingreso'] = $this->strings->set_null($arrUsuario['periodo_ingreso']);
        $arrUsuario['semestre'] = $this->strings->set_null($arrUsuario['plan_k']);
        $arrUsuario['turno'] = $this->strings->set_null($arrUsuario['turno']);
        $arrUsuario['boleta'] = $this->strings->set_null($arrUsuario['boleta']);
        return $arrUsuario;
    }

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */