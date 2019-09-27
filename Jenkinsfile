pipeline {
 agent any
     environment {
        CSA_Host = 'upgrade01'
        CSA_Port = '8177'
        CSA_Login = 'root'
        CSA_Password = '123456'
        CSA_DEPLOY_TO = '501'
        CSA_DEPLOY_FROM = '401'
        CSA_MANUAL_RESTORE = 'ON'
        CSA_BACKUP = 'ON'
        CSA_DB = 'ds_mssql_2014'
        CSA_SERIAL_NUMBER = 'S1300385'
    }
    stages {    
        stage('INIT') {
            steps {
                echo 'Starting Stage INIT' 
                bat 'npm install'
                bat 'node addlicence.js'
            }
        }
        stage('RESTORE 402') {
         when{
            expression { env.CSA_MANUAL_RESTORE == 'OFF' && env.CSA_DEPLOY_FROM == '402'}
         }  
         environment{
             CSA_PATH_DOCS = 'C:/CARLdata/extfiles/instance8080'
             CSA_BACKUP_PATH = 'C:/BACKUP'
             CSA_BACKUP_APP = 'backup_S1400467_app_jb_16ca96d905d-5d_20190819163454009.zip'
             CSA_BACKUP_DAT = 'backup_S1400467_dat_ms_16ca96d905d-5d_20190819163454009.zip'
             CSA_Host = 'upgrade01'
             CSA_Port = '8177'
             CSA_EQUIP = 'upgrade-420-mssql'
             CSA_DISTRIB_PATH = 'c:/Distribs/402/'
         }
            steps {
                echo 'Starting Stage RESTORE' 
                script {
                    if (env.CSA_DEPLOY_FROM == '402')
                     {

                        bat 'node setDS.js'
                        bat 'node serial.js'
                        bat 'node restore.js'
                       
                    }
                }
            }
        }  
        stage('Manual Restore') {
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
                bat 'node serial.js'
                bat 'node addDistrib.js "C:\\Distribsv4.0.1\carlsource_S1300385_fr_v4.0.1-I3-L1_c.zip"'
                bat 'node addDistrib "C:\\Distribs\\v4.0.1\\carlsource_S1300385_v4.0.1-I3_c.zip"'
                bat 'node scan.js'
              }
            }
        }
        stage('312') {
         when{
            expression { env.CSA_DEPLOY_FROM < '312' && env.CSA_DEPLOY_TO >= '312' }
         }
            steps {
                echo 'Starting Stage 312'              
            }
        }
        stage('MAJ402') {
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
               // bat 'setx -m JAVA_HOME "C:\\Program Files\\Java\\jdk1.8.0_201\\"'
                bat 'node addDistrib.js "C:\\Distribs\\v4.0.2\\I3\\carlsource_S1300385_v4.0.2-I3_b.zip"'
                bat 'node addDistrib.js "C:\\Distribs\\v4.0.2\\I3\\carlsource_S1300385_fr_v4.0.2-I3-L1_b.zip"'
                bat 'node deploy.js'
            }
             
        }
        stage('MAJ420') {

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
                 script {
                    if (env.CSA_DEPLOY_FROM < '402') {
                        bat 'node scan.js'
                    }
                    bat 'node addDistrib.js "C:\\Distribs\\v4.2.0\\I1\\carlsource_S1300385_fr_v4.2.0-I1-L1_b.zip"'
                    bat 'node addDistrib.js "C:\\Distribs\\v4.2.0\\I1\\carlsource_S1300385_v4.2.0-I1_b.zip"'
                    bat 'node deploy.js'
                 // bat 'setx -m JAVA_HOME "C:\\Program Files\\Java\\jdk1.8.0_201\\"'
                 //def msg = bat(returnStdout: true, script: 'node test.js')
                 }
                            
            }
        }
        stage('MAJ501') {
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

                    bat 'node serial.js'
                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\carlsource_S1300385_fr_v5.0.1-I1-L1_a.zip"'
                    bat 'node addDisrtib.js "C:\\Distribs\\v5.0.1\\carlsource_S1300385_v5.0.1-I1_a.zip"'

                    if (env.CSA_DEPLOY_FROM <= '420') {
                        bat 'node scan.js'
                    }

                    bat 'node deploy.js'
                 }
                            
            }
        }
        stage('501 I2 EN BABL') {
        when{
            expression { env.CSA_DEPLOY_FROM < '501' && env.CSA_DEPLOY_TO >= '501' }
         }
        environment { 
        CSA_Host = 'upgrade01'
        CSA_Port = '8178'
        CSA_EQUIP = 'upgrade-501-mssql-jboss'
        CSA_DEPLOY_DISTRIBS = 'carlsource_en_v5.0.1-L1,carlsource_babl_v4.0.1-A1'
        }
            steps {
                echo 'Starting Stage 501 I2 EN BABL'  
                 script {

                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\I2\\carlsource_S1300385_fr_v5.0.1-I2-L1_a.zip"'
                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\I2\\carlsource_S1300385_v5.0.1-I2_a.zip"'
                    bat 'node addDistrib.js "C:\\Distribs\\v5.0.1\\I2\\carlsource_S1300385_en_v5.0.1-I2-L1_a.zip"'
                    bat 'node deploy.js'
                 }
                            
            }
        }
        stage('Backup') {
        when{
            expression { env.CSA_MANUAL_RESTORE = 'ON' }
         }
            environment { 
            CSA_Host = 'upgrade01'
            CSA_Port = '8178'
            CSA_EQUIP = 'upgrade-501-mssql-tomcat'
            }
            steps {
                echo 'Starting Stage BACKUP'
            
                bat 'node backup.js'
            }
        }
    }
}

