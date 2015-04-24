<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends ESCOM_Controller {

    function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        //Loading the login views
        $arr_config = array(
            'default_controller' => 'EscomApp.controller.login.Login'
        );
        $this->lang->load('login');
        $this->load->view('login/login.php', $arr_config);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */