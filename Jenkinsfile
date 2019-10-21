pipeline {
 agent any
     environment {
        CSA_Host = 'upgrade01'
        CSA_Port = '8177'
        CSA_Login = 'root'
        CSA_Password = '123456'
        CSA_DEPLOY_TO = '501'
        CSA_DEPLOY_FROM = '401'
        CSA_DEPLOY_SPE = 'OFF'
        CSA_MANUAL_RESTORE = 'ON'
        CSA_BACKUP = 'OFF'
        CSA_DB = 'ds_mssql_2014'
        CSA_SERIAL_NUMBER = 'S1300385'
    }
    stages {    

        stage('After Manual Restore') {
         when{
            expression { env.CSA_MANUAL_RESTORE == 'ON'}
         }  
         environment{
             CSA_Host = 'upgrade01'
             CSA_Port = '8177'
             CSA_EQUIP = 'upgrade-420-mssql'
         }
            steps {
                echo 'Starting Stage RESTORE' 
                bat 'npm install'
                bat 'node addlicence.js'
                bat 'node SerialChange.js ds_mssql_2014'
                bat 'node SerialChange.js upgrade-420-mssql ds_mssql_2014'
                bat 'node addDistrib.js "C:\\Distribs\\v4.0.1\\carlsource_S1300385_fr_v4.0.1-I3-L1_c.zip"'
                bat 'node addDistrib.js "C:\\Distribs\\v4.0.1\\carlsource_S1300385_v4.0.1-I3_c.zip"'
               
              }
            
        }
        stage('312') {
         when{
            expression { env.CSA_DEPLOY_FROM < '312' && env.CSA_DEPLOY_TO >= '312' }
         }
            steps {
                echo 'Starting Stage 312'  
                bat 'npm install'            
            }
        }
        stage('Upgrade 4.0.2') {
        when{
            expression { env.CSA_DEPLOY_FROM < '402' && env.CSA_DEPLOY_TO >= '402' }
         }
        environment { 
        CSA_Host = 'upgrade01'
        CSA_Port = '8177'
        CSA_EQUIP = 'upgrade-402-mssql'
        CSA_DEPLOY_DISTRIBS = 'carlsource_v4.0.2'

        }
            steps {
                
                echo 'Starting Stage 402'
                bat 'npm install'
                bat 'node addlicence.js'
                bat 'node SerialChange.js ds_mssql_2014'
                bat 'node SerialChange.js upgrade-402-mssql ds_mssql_2014'
               // bat 'setx -m JAVA_HOME "C:\\Program Files\\Java\\jdk1.8.0_201\\"'
                bat 'node addDistrib.js "C:\\Distribs\\v4.0.2\\I3\\carlsource_S1300385_v4.0.2-I3_b.zip"'
                bat 'node addDistrib.js "C:\\Distribs\\v4.0.2\\I3\\carlsource_S1300385_fr_v4.0.2-I3-L1_b.zip"'
                bat 'node scan.js'
                bat 'node deploy.js'
                bat 'node stop.js'
                bat 'node clean.js'
            }
             
        }
        stage('Upgrade 4.2.0') {

        when{
            expression { env.CSA_DEPLOY_FROM < '420' && env.CSA_DEPLOY_TO >= '420' }
         }
        environment { 
        CSA_Host = 'upgrade01'
        CSA_Port = '8177'
        CSA_EQUIP = 'upgrade-420-mssql'
        CSA_DEPLOY_DISTRIBS = 'carlsource_v4.2.0'
        }
         steps {
                echo 'Starting Stage 420'  
                bat 'npm install'
                bat 'node addlicence.js'
                bat 'node SerialChange.js ds_mssql_2014'
                bat 'node SerialChange.js upgrade-420-mssql ds_mssql_2014'

                bat 'node addDistrib.js "C:\\Distribs\\v4.2.0\\I1\\carlsource_S1300385_fr_v4.2.0-I1-L1_b.zip"'
                bat 'node addDistrib.js "C:\\Distribs\\v4.2.0\\I1\\carlsource_S1300385_v4.2.0-I1_b.zip"'
               
                bat 'node scan.js'
                bat 'node deploy.js'
                 // bat 'setx -m JAVA_HOME "C:\\Program Files\\Java\\jdk1.8.0_201\\"'
                 //def msg = bat(returnStdout: true, script: 'node test.js')
                bat 'node stop.js'
                bat 'node clean.js'           
            }
        }
        stage('Upgrade 5.0.1') {
        when{
            expression { env.CSA_DEPLOY_FROM < '501' && env.CSA_DEPLOY_TO >= '501' }
         }
        environment { 
        CSA_Host = 'upgrade01'
        CSA_Port = '8178'
        CSA_EQUIP = 'upgrade-501-mssql-jboss'
        CSA_DEPLOY_DISTRIBS = 'carlsource_v5.0.1'
        }
            steps {
                echo 'Starting Stage 501'  

                 script {
                    bat 'npm install'
                    bat 'node addlicence.js'
                    bat 'node SerialChange.js ds_mssql_2014'
                    bat 'node SerialChange.js upgrade-501-mssql-jboss ds_mssql_2014'
                    bat 'node SerialChange.js upgrade-501-mssql-tomcat ds_mssql_2014'
                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\carlsource_S1300385_fr_v5.0.1-I1-L1_a.zip"'
                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\carlsource_S1300385_v5.0.1-I1_a.zip"'
                    bat 'node scan.js'
                    bat 'node deploy.js'
                 }
                            
            }
        }
        stage('Deploy I2 + PATCHS + EN + BABL') {
        when{
            expression { env.CSA_DEPLOY_SPE == 'ON' }
         }
        environment { 
        CSA_Host = 'upgrade01'
        CSA_Port = '8178'
        CSA_EQUIP = 'upgrade-501-mssql-tomcat'
        CSA_DEPLOY_DISTRIBS = 'carlsource_en_v5.0.1-L1,carlsource_babl_v4.0.1-A1,carlsource_S1300385_v5.0.1-I2,carlsource_v5.0.1-P19' 
        }
            steps {
                echo 'Starting Stage 501 I2 EN BABL'  
                 script {
                    bat 'npm install'
                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\I2\\carlsource_S1300385_fr_v5.0.1-I2-L1_a.zip"'
                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\I2\\carlsource_S1300385_v5.0.1-I2_a.zip"'
                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\I2\\carlsource_S1300385_en_v5.0.1-I2-L1_a.zip"'
                    bat 'node deploy.js'
                 }
                            
            }
        }
        stage('Backup CSA') {
        when{
            expression { env.CSA_BACKUP == 'ON' }
         }
            environment { 
            CSA_Host = 'upgrade01'  
            CSA_Port = '8178'
            CSA_EQUIP = 'upgrade-501-mssql-tomcat'
            }
            steps {
                echo 'Starting Stage BACKUP'
                bat 'npm install'
                bat 'node scan.js'
                bat 'node backup.js' //vérifier la présence des pièces jointes sur des partages ??
            }
        }
    }
}

