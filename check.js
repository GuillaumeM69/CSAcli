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
const ID = process.argv[2] 

var url = 'http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/webserv/cli?wsdl';

var SoapClient = soap.createClient(url, function(err, client) {
  if(err)
  {throw err}  
    client.setSecurity(new soap.BasicAuthSecurity(CSAdminLogin, CSAdminPassword))
    client.getActionStatus({actionId:ID },function(err,result){
        if(err){
            throw (err);
        }
       
        if(result.getActionStatus = "RUNNING"){
            console.error("RUNNING")
            
        }
        else if(result.getActionStatus = "DONE"){
            console.log("DONE")
         
        }


        process.stdout.write(JSON.stringify(result, null, 2));
    });




});


