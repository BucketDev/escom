<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="UTF-8">

        <title><?php echo lang('login_title'); ?></title>

        <!-- Cargado de las hojas de estilo -->
        <!--link rel="stylesheet" href="assets/js/extjs/resources/css/ext-all.css"-->
        <link rel="stylesheet" href="assets/js/extjs/resources/ext-theme-neptune/ext-theme-neptune-all-debug.css">
        <link rel="icon" href="assets/img/16/user_student.png">
        <link rel="stylesheet" href="assets/css/escom.css">
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

    <!-- Dependiendo del ambiente cargar los archivos compresos o sin comprimir -->
    <?php if(ENVIRONMENT == 'development'){?>
        <script src="assets/js/extjs/ext-all-debug.js"></script>
        <script src="assets/js/escomapp/escom.js"></script>
        <script src="assets/js/sha1.js"></script>
    <?php } else {?>
        <script src="assets/js/extjs/ext-all.js"></script>
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

        var defaultController = <?php echo '"' . $default_controller . '"'; ?>;

        Ext.application({
            name:       'EscomApp',
            appFolder:  'assets/js/escomapp',
            controllers:[defaultController],
            launch    : function(){
                Ext.fly('loading').destroy();
            }
        });

    </script>

    </body>
</html>