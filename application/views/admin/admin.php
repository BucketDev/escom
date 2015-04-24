<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="UTF-8">

        <title><?php echo lang('admin_title'); ?></title>

        <!-- Cargado de las hojas de estilo -->
        <!--link rel="stylesheet" href="assets/js/extjs/resources/css/ext-all.css"-->
        <link rel="stylesheet" href="assets/js/extjs/resources/ext-theme-neptune/ext-theme-neptune-all-debug.css">
        <link rel="stylesheet" href="assets/js/extjs/ux/statusbar/css/statusbar.css">
        <link rel="stylesheet" href="assets/css/iconos.css">
        <link rel="stylesheet" href="assets/css/escom.css">
        <link rel="icon" href="assets/img/16/user_student.png">
        <link rel="stylesheet" href="assets/css/dots.css">
    </head>
    <body>
    <!-- Bloque de cargando -->
    <div id="loading" class="loading-escomapp">
        <div class="dots">
            Loading...
        </div>
        <div class="loading-text">
            Cargando...
        </div>
    </div>
    <?php if(ENVIRONMENT == 'development'){?>
        <script src="assets/js/extjs/ext-all-debug.js"></script>
        <script src="assets/js/override/Connection.js"></script>
        <script src="assets/js/override/SubmitFix.js"></script>
        <script src="assets/js/escomapp/escom.js"></script>
        <script src="assets/js/sha1.js"></script>
    <?php } else {?>
        <script src="assets/js/extjs/ext-all.js"></script>
        <script src="assets/js/override/Connection.js"></script>
        <script src="assets/js/override/SubmitFix.js"></script>
        <script src="assets/js/escomapp/escom.js"></script>
        <script src="assets/js/sha1.js"></script>

    <?php }?>

    <!-- Librerías de idioma para la aplicación -->
    <?php if($this->config->item('language') == 'spanish'){ ?>
        <script src="assets/js/extjs/locale/ext-lang-es.js"></script>
        <script src="assets/js/escomapp/lang/spanish.js"></script>
    <?php } else { ?>
        <script src="assets/js/escomapp/lang/english.js"></script>
    <?php } ?>


    <script>
        Ext.Loader.setPath('Ext.ux', 'assets/js/extjs/ux');
        Ext.application({
            name        : 'EscomApp',
            appFolder   : 'assets/js/escomapp',
            controllers : ['EscomApp.controller.admin.Main'],
            launch      : function(){
                Ext.fly('loading').destroy();
                EscomApp.datos = <?php echo($datos); ?>;
            }
        });

    </script>

    </body>
</html>