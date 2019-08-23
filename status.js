//Chargement du fichier .env
require('dotenv').config()
//Import du client SOAP
var soap = require('soap');

//Définition des variables
const CSAdminHost = process.env.CSA_Host
const CSAdminPort = process.env.CSA_Port
const CSAdminWsdl = 'http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/webserv/cli?wsdl';
const CSAdminLogin = process.env.CSA_Login
const CSAdminPassword = process.env.CSA_Password

var url = 'http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/webserv/cli?wsdl';

var SoapClient = soap.createClient(url, function(err, client) {
  if(err)
  {throw err}  
    client.setSecurity(new soap.BasicAuthSecurity(CSAdminLogin, CSAdminPassword))
    ID = "20190821101136151_3" ;
    client.getActionStatus({actionId:ID },function(err,result){
        if(err){
            throw (err);
        }
       
        process.stdout.write(JSON.stringify(result, null, 2));
    });


    client.getActionInfo( {actionId: ID }, function(err, result) {
        if(err){
            throw (err);
            process.exit(5);
        }

        if(result){

            ArrayToLoop = result.getActionInfo.entry
            ArrayOutput = [];
            for (let index = 0; index < ArrayToLoop.length; index++) {
                const e = ArrayToLoop[index];
               ArrayOutput[index] = {   [e.key] : e.value.$value} ;
            } 
            
            //console.log('{ logurl : "http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/system/displaylog.xhtml?executorId='+ID+'"}');

            process.stdout.write(JSON.stringify(ArrayOutput, null, 2));
        }
    

    });


});


