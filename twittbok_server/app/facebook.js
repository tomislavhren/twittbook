var configAuth = require('../config/auth');
 var https = require('https')

module.exports = {
   

    postToFacebook: function (str, userToken) {
       var fbreq = https.request({
            host: 'graph.facebook.com',
            path: '/me/feed',
            method: 'POST'
        }, function (fbres) {
            fbres.setEncoding('utf8');
            fbres.on('data', function (chunk) {
                console.log('got chunk ' + chunk);
                return chunk;
            });
            fbres.on('end', function () {
                console.log('response end with status ' + fbres.status);
            });
        });
        fbreq.end('message=' + "test test"
            + '&access_token=' + userToken);
        console.log('sent');
    },

   getFromFacebook: function (str, userToken) {
       var fbreq = https.request({
            host: 'graph.facebook.com',
            path: '/me/feed',
            method: 'GET'
        }, function (respone) {
            console.log(respone.statusCode)
            respone.on('data', function (chunk) {
                console.log('got chunk ' + chunk);
                return chunk;
            });
        });
         fbreq.end('access_token=' + userToken);
        console.log('sent');
    }
}