Ext.override(Ext.data.Connection, {

    disableCaching : false,
    timeout: 1200000,
    // private
    onComplete : function(request, xdrResult) {
        var me = this,
            options = request.options,
            xhr,
            result,
            success,
            resFatal,
            response;

        try {
            xhr = request.xhr;
            result = me.parseStatus(xhr.status);
            if (result.success) {
                // This is quite difficult to reproduce, however if we abort a request just before
                // it returns from the server, occasionally the status will be returned correctly
                // but the request is still yet to be complete.
                result.success = xhr.readyState === 4;
            }
        } catch (e) {
            // in some browsers we can't access the status if the readyState is not 4, so the request has failed
            result = {
                success : false,
                isException : false
            };

        }
        success = me.isXdr ? xdrResult : result.success;

        if (success) {
            response = me.createResponse(request);

            //override para respuesta fatal del servidor
            resFatal = Ext.decode(response.responseText, true);
            if(!Ext.isEmpty(resFatal) && !Ext.isEmpty(resFatal.fatal)){
                //si se recibio un mensaje fatal, no queda de otra mas que sacarlo del sistema
                Ext.Msg.show({
                    title   : 'Lo sentimos, ha ocurrido un problema de conexi&oacute;n con el servidor',
                    msg     : resFatal.fatal,
                    buttons : Ext.Msg.OK,
                    icon    : Ext.MessageBox.WARNING,
                    fn      : function (){
                        window.location.reload();
                    }
                });
            } else {
                me.fireEvent('requestcomplete', me, response, options);
                Ext.callback(options.success, options.scope, [response, options]);
            }
        } else {
            if (result.isException || request.aborted || request.timedout) {
                response = me.createException(request);
            } else {
                response = me.createResponse(request);
            }
            me.fireEvent('requestexception', me, response, options);
            Ext.callback(options.failure, options.scope, [response, options]);
        }
        Ext.callback(options.callback, options.scope, [options, success, response]);
        delete me.requests[request.id];
        return response;
    }
});