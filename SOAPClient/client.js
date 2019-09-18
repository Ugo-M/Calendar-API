var express = require('express');
var app = express();

var soap = require('soap');
var url = 'http://localhost:8000/helloService?wsdl';

var args = {firstName: 'test'};

soap.createClient(url, function(err, client) {
    client.sayHello(args, function(err, result) {
        console.log(result.greeting);
    });
});