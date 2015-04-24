/**
 *
 */

Ext.ns('escom');

escom = {
    /**
     * URL principal hacia donde se direccionan todas las peticiones
     */
    URL:"",

    /**
     * URL principal de la instancia actual
     */
    suiteurl: 'https://www.talentocompartamos.com/suite/',

    /**
     * Numero de registros a desplegar de registros por pagina en grids y combos
     */
    NUM_PAGINAS: 20,

    /**
     * Definicion de la etiqueta img de html para mostrar un gif de cargando
     */
    imgCargando: '<img src="img/loading.gif" >',

    version : {
        major           : 1,
        minor           : 0,
        patch           : 0,
        shortVersion    : "100",
        version         : "1.0.0"
    }
};

/**
 * Hace una peticion al servidor por POST con el controlador y metodo definido
 * @method post
 * @param {String} clase
 * @param {String} metodo
 * @param {Object} objeto de configuracion
 */

escom.post = function (clas, method, obj){
    obj.params = Ext.isEmpty(obj.params) ? {_dc:""} : obj.params;

    Ext.Ajax.request({
        url     : clas + "/" + method,
        scope   : obj.scope,
        success : obj.success,
        failure : obj.failure,
        params  : obj.params
    });
}


/**
 * Envia un mensaje de alerta al usuario
 * @method alert
 * @param {String} Mensaje
 * @param {String} tipo (Optional) Define el icono. Hay de tres sopas, error, warning, question y por defecto muestra INFO
 */
escom.alert = function (titulo, msg,tipo,callback,scopee){
    switch(tipo){
        case "error": tipo=Ext.MessageBox.ERROR;break;
        case "warning": tipo=Ext.MessageBox.WARNING ;break;
        case "question": tipo=Ext.MessageBox.QUESTION ;break;
        default: tipo=Ext.MessageBox.INFO; break;
    }

    Ext.Msg.show({
        title: titulo || 'Mensaje del sistema',
        msg: msg,
        buttons: Ext.Msg.OK,
        icon: tipo,
        fn:callback || Ext.emptyFn,
        scope:scopee
    });
}

escom.datePatterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ShortDate: "d \\de F Y",
    ShortenDate: "d/m/y",
    LongDate: "l, d \\de F Y",
    FullDateTime: "l, d F, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};

/*Definición de vtypes para formularios*/
Ext.apply(Ext.form.field.VTypes, {
    curp:  function(v) {
        return /^[a-zA-Z]{4}[0-9]{6}[a-zA-Z]{6}[0-9]{2}$/.test(v);
    },
    curpText: 'Debe contener el siguiente formato {AAAA999999AAAAAA99}',
    curpMask: /[\w]/i,
    enrollment: function(v){
        return /^[0-9]{10}$/.test(v)
    },
    enrollmentText: 'El número de boleta está compuesto de año + código + clave [1999630001]',
    enrollmentMask: /[0-9]/i,
    period: function(){
        return /^[0-9]{5}$/;
    },
    periodText: 'El periodo està compuesto de año + código [19990]',
    periodMask: /[0-9]/i
});