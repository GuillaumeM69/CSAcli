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


const CSAEQUIP =  process.argv[2];
const CSAEQUIPDS =  process.argv[3];


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

              console.log(new Date().toString() + ': ' + JSON.stringify(result[0].getEquipmentInfo.entry, null, 2))

        entrys = [];
        for (let index = 0; index < result[0].getEquipmentInfo.entry.length; index++) {
            const element = result[0].getEquipmentInfo.entry[index];
       

        if(element.key == 'appli.datasource' && !element.value.$value){
            element.value.$value = 'NoDS';
            if(!CSAEQUIPDS){
                console.log("Argument No DS")
                process.exit(5);
            }
           
        }
       
       
       if(element.value.$value){

            switch (element.key) {

                case 'prototype':
                   // entrys.push(xmlValue(element.key,CSASerialNumber+' : '+CSASerialNumber))
                    break;
                case '':
                console.log('value NUll:'+element.value.$value)
                    break;
                case 'deploy.customer':
                    newSerial = CSASerialNumber+' : '+CSASerialNumber;
                    if(newSerial == element.value.$value && !CSAEQUIPDS){
                        console.log('It\'s the same Serial')
                        process.exit(0);
                    }
                    entrys.push(xmlValue(element.key,newSerial))
                    break;
                case 'eqptName':
                entrys.push(xmlValue(element.key,element.value.$value+'_new'))
                    break;
                case 'appli.datasource':
                entrys.push(xmlValue(element.key,'DATASOURCE'+' '+CSAEQUIPDS))
                    break;
                default:
                entrys.push(xmlValue(element.key,element.value.$value))
                    break;
            }
        }
  
              //console.log( element.key+'value => '+element.value.$value )
        }
       // console.log(getXml(entrys));

           console.log("AddEquipment")
        client.addEquipmentAsync({ '_xml':getXml(entrys)})
        .then((result) => {
            console.log(new Date().toString() + ': ' + JSON.stringify(result[0], null, 2));    

            client.removeEquipmentAsync({EquipmentName:CSAEQUIP})
            .then((result) => {
                console.log(new Date().toString() + ': ' + JSON.stringify(result, null, 2)); 

            // mise à jour de l'équipement instance et lien avec le datasource
            client.updateEquipmentAsync({'_xml':ChangeEquipmentName(CSAEQUIP+'_new',CSAEQUIP)})
            .then((result)=>{
            console.log(new Date().toString() + ': ' + JSON.stringify(result[0], null, 2))
            })
            .catch(err=>{
            console.log(JSON.stringify(err.cause.body, null, 2));;
            process.exit(5);
            })
            
            })
            .catch((err)=>{
                console.log("-----------------------------ERROR- removeEquipmentAsync-----------------------------")
                console.log(JSON.stringify(err.cause.body, null, 2));
                process.exit(5);
            });


         
        })
        .catch((err)=>{
            console.log("-----------------------------ERROR- addEquipmentAsync-----------------------------")
            console.log(JSON.stringify(err.cause.body, null, 2));
            process.exit(5);
  

        });


       
         })
        .catch(err=>{
            console.log("-----------------------------ERROR- getEquipmentInfoAsync-----------------------------")
            console.log(JSON.stringify(err.cause.body, null, 2));
            process.exit(5);
        })
      
})
.catch(err=>{
    console.log("-----------------------------ERROR- createClientAsync-----------------------------")
    console.log(JSON.stringify(err.cause.body, null, 2));
    process.exit(5);
})
;


function xmlValue(key,value){
    //console.log(key+ ' => '+value+'\r');
    data =
    '<entry>\
    <key>'+key+'</key>\
    <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+value+'</value>\
    </entry>';
  
    return data;
}


function getXml(entrys)
{

    //Génération d'un code XML compatible avec les types "string" attendus par le WS

    data = '<ns2:addEquipment xmlns:ns2="http://ifc.cli.ws.admin.carl.com/"><args>';

    for (let i = 0; i < entrys.length; i++) {
        const e = entrys[i];
        data += e;
    }
 
    data += '</args></ns2:addEquipment>';
    
 
    return data;

}


function ChangeEquipmentName(Name,NewName)
{

    //Génération d'un code XML compatible avec les types "string" attendus par le WS

    data = '<ns2:updateEquipment xmlns:ns2="http://ifc.cli.ws.admin.carl.com/"><args>'+ 
    '<entry> \
    <key>equip</key> \
    <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  \
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+Name+'</value> \
    </entry>';

    data += 
    '<entry>\
    <key>eqptName</key>\
    <value xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
        xmlns:xs="http://www.w3.org/2001/XMLSchema" xsi:type="xs:string">'+NewName+'</value>\
    </entry>';
   
    data += 
    '</args></ns2:updateEquipment>';
    
    return data;

}