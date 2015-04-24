<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class ESCOM_Controller extends CI_Controller {

    var $NUM_PAGINAS = 20;

    function __construct()
    {
        parent::__construct();

        $this->session->validate_logged();
        $this->lang->load('bitacora_bd');
    }

    public function getSuccess($data, $success = TRUE)
    {
        if(is_array($data)){
            if(!isset($data["success"])){
                $data["success"] = $success;
            }
        }

        //$data['total'] = 2;//count($data['data']);

        $this->output->set_output(
            json_encode($data)
        );
    }

}