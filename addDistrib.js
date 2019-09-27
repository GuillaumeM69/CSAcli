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
const CSASerialNumber = process.env.CSA_SERIAL_NUMBER
const CSAdminDistribPATH =  process.env.CSA_DISTRIB_PATH
const CSAdminDistrib =  process.argv[2];
var url = 'http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/webserv/cli?wsdl'

if(CSAdminDistrib){
    file = CSAdminDistrib;

    console.log(file);
}
else{
    process.exit(5)
}

soap.createClient(url,function(err,client){
 client.setSecurity(new soap.BasicAuthSecurity(CSAdminLogin, CSAdminPassword));

 client.addDistrib({Dfile:file},function(err, result, envelope, soapHeader){
    if (err){
        throw err
        process.exit(5);
    }
    console.log(new Date().toString() +  'chargement de :'+file);
   
    });
 });


