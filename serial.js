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
const CSAEQUIP = process.env.CSA_EQUIP
var url = 'http://'+CSAdminHost+':'+CSAdminPort+'/CSAdmin/webserv/cli?wsdl'


const CSAEQUIP =  process.argv[2];


if(!CSAEQUIP){
    process.exit(5);
    console.log("any argument")
}


soap.createClientAsync(url)
.then((client) => {
    client.setSecurity(new soap.BasicAuthSecurity(CSAdminLogin, CSAdminPassword))
    console.log(new Date().toString() + ': Starting action on '+CSAEQUIP)
 



    client.getEquipmentInfoAsync({EquipmentName:CSAEQUIP})
    .then((result)=>{
        for (let index = 0; index < result[0].getEquipmentInfo.entry.length; index++) {
            const element = result[0].getEquipmentInfo.entry[index];
             // recherche de la datasource de l'équipement instance
            if (element.key == 'appli.datasource') {
                CSAdatasource = element.value.$value.substring(11)
                
            }
        }


            // mise à jour de l'équipement instance et lien avec le datasource
            client.updateEquipmentAsync({'_xml':getXml(CSAEQUIP,CSASerialNumber,CSAdatasource)})
            .then((result)=>{
            console.log(new Date().toString() + ': ' + JSON.stringify(result[0], null, 2))
            })
            .catch(err=>{
            console.log(JSON.stringify(err.cause.body, null, 2));;
            process.exit(5);
            });        


                
            // mise à jour de la licence de l'équipement datasource
            client.updateEquipmentAsync({'_xml':getXml(CSAdatasource,CSASerialNumber,CSAdatasource)})
            .then((result) => {
                console.log(new Date().toString() + ': ' + JSON.stringify(result[0], null, 2))
                // mise à jour de l'équipement instance et lien avec le datasour
            })
            .catch(err=>{
                
                console.log(JSON.stringify(err.cause.body, null, 2));
                process.exit(5);
            });
                    

        })
        .catch(err=>{
            console.log(JSON.stringify(err.cause.body, null, 2));
            process.exit(5);
        })
      
});

function getXml(equip,licence,datasource = false)
{

    //Génération d'un code XML compatible avec les types "string" attendus par le WS

    data = '<ns2:updateEquipment xmlns:ns2="http://ifc.cli.ws.admin.carl.com/"><args>'+ 
    '<entry> \
    <key>equip</key> \
    <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  \
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+equip+'</value> \
    </entry>';

    data += 
    '<entry>\
    <key>deploy.customer</key>\
    <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+licence+' : '+licence+'</value>\
    </entry>';
   
    if(datasource){
    data += 
    '<entry>\
    <key>appli.datasource</key>\
    <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">DATASOURCE '+datasource+'</value>\
    </entry>'
    ;}
    data += 
    '</args></ns2:updateEquipment>';
    
    return data;

}