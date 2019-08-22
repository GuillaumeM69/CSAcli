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
//const CSAEQUIP = process.env.CSA_EQUIP
const CSAEQUIP = 'upgrade-420-mssql'
const CSABackupDAT = process.env.CSA_BACKUP_DAT
const CSAPathDocs = process.env.CSA_PATH_DOCS
var url = 'http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/webserv/cli?wsdl';

var SoapClient = soap.createClient(url, function(err, client) {
  if(err)
  {throw err}  
    client.setSecurity(new soap.BasicAuthSecurity(CSAdminLogin, CSAdminPassword))

    client.execAction({ '_xml':restore_xml(CSAEQUIP)},function(err,result){
        if(err){
            {throw err}  
        }
    console.log(result);
        
        
    });
});



function restore_xml(equip,addDistribs)
{

    //Génération d'un code XML compatible avec les types "string" attendus par le WS

    
    return '<ns1:execAction xmlns:ns1="http://ifc.cli.ws.admin.carl.com/"><args>'+ 
    '<entry> \
    <key>equip</key> \
    <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  \
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+equip+'</value> \
    </entry>'
+
    '<entry>\
    <key>action</key>\
    <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">restore</value>\
    </entry>'
+
'<entry>\
<key>backupFile</key>\
<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+CSABackupDAT+'</value> \
</entry>'
+
'<entry>\
<key>restoreAppli</key>\
<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">true</value>\
</entry>'
+
'<entry>\
<key>baseDir</key>\
<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+CSAPathDocs+'</value>\
</entry>'
+
'<entry>\
<key>backupBefore</key>\
<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">false</value>\
</entry>'
+
'</args></ns1:execAction>';


}
