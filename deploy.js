//Chargement du fichier .env
require('dotenv').config()
//Import du client SOAP
var soap = require('soap');

//Définition des variables
const CSAdminHost = process.env.CSA_Host
const CSAdminPort = process.env.CSA_Port
const CSAdminLogin = process.env.CSA_Login
const CSAdminPassword = process.env.CSA_Password
const CSAEQUIP = process.env.CSA_EQUIP
const CSADeployDistribs = process.env.CSA_DEPLOY_DISTRIBS
var url = 'http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/webserv/cli?wsdl'

soap.createClientAsync(url)
.then((client) => {
    client.setSecurity(new soap.BasicAuthSecurity(CSAdminLogin, CSAdminPassword))
    console.log(new Date().toString() + ': Starting DEPLOY on '+CSAEQUIP)
    client.execActionAsync({ '_xml':xml(CSAEQUIP,CSADeployDistribs)})
    .then((result) => {
        console.log(new Date().toString() + ': ' + JSON.stringify(result[0], null, 2));    
        CheckAction(client,result[0].execResult);
    })
    .catch((err)=>{
        console.log("-----------------------------ERROR------------------------------")
        console.log(JSON.stringify(err.cause.body, null, 2));
        process.exit(5);
    });


});

function CheckAction(client,Id){
    console.log(new Date().toString() + ': Check State of DEPLOY on '+CSAEQUIP)
    client.getActionStatusAsync({actionId:Id})
    .then((result) => {
     
        
        if (result[0].getActionStatus == 'DONE')
        {    
        console.log(new Date().toString() + ': DEPLOY done on '+CSAEQUIP)
        process.exit(0);
        }
        
        if (result[0].getActionStatus == 'FAILED')
        {
            console.log(new Date().toString() + ': DEPLOY FAILED on '+CSAEQUIP)
            process.exit(5);
        }
       
       setTimeout(() => {CheckAction(client,Id)}, 60000);

    })
    .catch((err)=>{
        console.log("-----------------------------ERROR CHECK TASK------------------------------")
        console.log(JSON.stringify(err, null, 2));
        setTimeout(() => {CheckAction(client,Id)}, 60000);
    });
}

function xml(equip,addDistribs)
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
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">deploy</value>\
    </entry>'
+
'<entry>\
<key>addDistribs</key>\
<value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+addDistribs+'</value> \
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
