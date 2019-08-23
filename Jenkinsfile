pipeline {
 agent any
     environment {
        CSA_Host = 'upgrade01'
        CSA_Port = '8177'
        CSA_Login = 'root'
        CSA_Password = '123456'
        CSA_DEPLOY_TO = '501'
        CSA_DEPLOY_FROM = '402'
        CSA_MANUAL_RESTORE = 'ON'
        CSA_BACKUP = 'OFF'
        CSA_DB = 'MSSQL'
        CSA_SERIAL_NUMBER = 'S1400467'
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
         }
            steps {
                echo 'Starting Stage RESTORE' 
                script {
                    if (env.CSA_DEPLOY_FROM == '402')
                     {
                        bat 'node serial.js'
                        bat 'node restore.js'
                    }
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
        stage('402') {
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
               // bat 'setx -m JAVA_HOME "C:\Program Files\Java\jdk1.8.0_201\"'
                bat 'node deploy.js'
            }
             
        }
        stage('420') {

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
                    bat 'node deploy.js'
                 // bat 'setx -m JAVA_HOME "C:\Program Files\Java\jdk1.8.0_201\"'
                 //def msg = bat(returnStdout: true, script: 'node test.js')
                 }
                            
            }
        }
        stage('501') {
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
                    if (env.CSA_DEPLOY_FROM <= '402') {
                        bat 'node scan.js'
                    }
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
              //  bat 'node backup.js'
            }
        }
    }
}

