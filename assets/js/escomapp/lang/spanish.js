Ext.ns('escom.lang');

escom.lang = {
    /**
     * Controlador del Login
     */
    login   : {
        form    :{
            title   : 'Formulario de ingreso',
            user    : 'Usuario',
            pasword : 'Contraseña',
            login   : 'Ingresar'
        },
        title   : 'Inicia Sesión',
        loging  : 'Ingresando',
        addpaneltitle   : 'Sistema de Gestión Escolar',
        addpanelbody    :
            '<div class="jumbotron"">' +
                //'<div class="container">' +
                    '<h1>¡Bienvenido! :)</h1>' +
                    '<p>Esta plataforma ha sido creada en apoyo a la <em>escomunidad</em>, para agilizar tus trámites' +
                    ' y conocer el punto exacto en el que se encuentran tus solicitudes.</p>' +
                    '<p>Si tienes alguna duda sobre el uso de esta plataforma o las acciones realizadas dentro ' +
                    'de gestión escolar, te invitamos a leer nuestra guia rápida</p>' +
                    '<a class="btn btn-primary btn-lg">FAQ</a>' +
                //'</div>' +
            '</div>',
        toolbar : 'Desarrollado por'
    },

    /**
     * Controlador del Admin
     */
    admin   : {
        myprofile   : 'Mi perfil',
        closesesion : 'Cerrar Sesión',
        weolcome    : '¡Has iniciado sesión como',
        logout      : 'Cerrando la sesión',
        panelactivities  : {
            title   : 'Panel administrativo'
        },
        panelsubmodules : {
            title   : 'Submódulos'
        },
        panelresumen  : {
            title   : 'Resumen'
        }
    },

    /**
     * Controlador de seguimiento
     */
    tracking   : {
        grid   : {
            checkcolumn : '¡Listo!',
            requester   : 'Alumno',
            status      : 'Estatus',
            delivery    : 'Fecha de Entrega',
            request     : 'Fecha de Solicitud',
            deliverytime: 'Periodo de Entrega'
        },
        requests    : {
            title   : 'Filtro de Solicitudes',
            periods : 'Por tiempo',
            status  : 'Por estatus',
            documents   : 'Por documento'
        },
        history : {
            title   : 'Historial de Actividades',
            grid    : {
                laststatus  : 'Estatus Anterior',
                newstatus   : 'Estatus Nuevo',
                dotime      : 'Fecha de Realización',
                responsible : 'Responsable'
            }
        }
    },

    /**
     * Controlador del Admin
     */
    user   : {
        grid    : {
            name    : 'Nombre',
            gender  : 'Género',
            semester: 'Semestre',
            career  : 'Carrera',
            shift   : 'Turno',
            enrollment  : 'Boleta',
            period      : 'Periodo',
            plan        : 'Plan',
            role        : 'Rol',
            photo       : 'Foto',
            age         : 'Edad',
            mail        : 'Correo'
        },
        form    : {
            addtitle    : 'Agregar Usuario',
            edittitle   : 'Editar Usuario',
            name        : 'Nombre',
            lastname    : 'Apellido Paterno',
            secondlastname  : 'Apellido Materno',
            age         : 'Edad',
            years       : 'años',
            personaldata: 'Datos Personales',
            academicdata: 'Datos Escolares',
            platformdata: 'Datos en la Plataforma',
            filldata    : 'Ingresa los datos del usuario...',
            semester    : 'Semestre',
            career      : 'Carrera',
            shift       : 'Turno',
            enrollment  : 'Boleta',
            period      : 'Periodo',
            plan        : 'Plan',
            user        : 'Usuario',
            password    : 'Contraseña',
            repassword  : 'Repetir',
            role        : 'Rol',
            photo       : 'Foto',
            mail        : 'Correo',
            gender      : 'Género',
            upload      : 'Subir',
            combo       : {
                morningshift    : 'Matutino',
                afternoonshift  : 'Vespertino',
                male            : 'Hombre',
                female          : 'Mujer'
            },
            tooltip     : {
                maxsize : '1,000kB máximo'
            }
        },
        toolbar : {
            adduser : 'Agregar Usuario',
            addfromfile : 'Desde Archivo'
        }
    },

    /**
     * Formularios en general
     */
    form    : {
        clear   : 'Limpiar',
        send    : 'Enviar',
        search  : 'Buscar...',
        cancel  : 'Cancelar',
        next    : 'Siguiente',
        previous: 'Anterior',
        save    : 'Guardar',
        saving  : 'Guardando...',
        validate: 'Valida los datos ingresados'
    },

    /**
     * Ventanas emergentes
     */
    window  :{
        waiting : 'Espera un momento...',
        failtitle   : 'Ocurrió un error'
    }
};