var express = require('express');
var app = express();

var soap = require('soap');
var url = 'https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL';

var args = {ubiNum: 55};

soap.createClient(url, function(err, client) {
    client.NumberToWords(args, function(err, result) {
        console.log(result);
    });
});