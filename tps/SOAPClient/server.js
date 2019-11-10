const express = require('express');
const soap = require('soap');
const app = express();

var helloService = {
    HelloService: {
        HelloPort: {
            sayHello: function(args) {
                return {
                    greeting: "hello "+args.firstName
                };
            }
        }
    }
};

const xml = require('fs').readFileSync('HelloService.wsdl', 'utf8');

app.listen(8000, function(){
    soap.listen(app, '/helloService', helloService, xml, function(){
        console.log('server initialized');
    });
});