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
var url = 'http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/webserv/cli?wsdl'

soap.createClientAsync(url)
.then((client) => {
    client.setSecurity(new soap.BasicAuthSecurity(CSAdminLogin, CSAdminPassword))

    client.addLicenseAsync({licenseId:CSASerialNumber,name:CSASerialNumber})
    .catch((err)=>{
        console.log(new Date().toString() + ': err to create Licence');
    })
    .then((result) => {
        console.log(new Date().toString() + ': Licence ' + JSON.stringify(result, null, 2)) 
         
    });

});
