pipeline {
    agent any
     environment {
        CSA_Host = 'upgrade01'
        CSA_Port = '8177'
        CSA_Login = 'root'
        CSA_Password = '123456'
        CSA_DEPLOY_TO = '501'
        CSA_DEPLOY_FROM = '312'
        CSA_MANUAL_RESTORE = 'ON'
        CSA_DB = 'MSSQL'
        CSA_PATH_DOCS = 'C:/CARLdata/extfiles/instance8080'
        CSA_BACKUP_PATH = 'C:/BACKUP'
        CSA_BACKUP_APP = 'backup_S1400467_app_jb_16ca96d905d-5d_20190819163454009'
        CSA_BACKUP_DAT = 'backup_S1400467_dat_ms_16ca96d905d-5d_20190819163454009.zip'
        CSA_SERIAL_NUMBER = 'S1400467'
    }
    stages {
        stage('INIT') {
            steps {
                echo 'Starting Stage INIT' 
                bat 'npm install'

            }
        }
        stage('RESTORE') {
         when{
            expression { env.CSA_MANUAL_RESTORE == 'OFF'}
         }
            steps {
                echo 'Starting Stage RESTORE'              
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
        }
            steps {
                
                echo 'Starting Stage 402'
               // bat 'setx -m JAVA_HOME "C:\Program Files\Java\jdk1.8.0_201\"'
                //bat 'node clean.js'
             script {
                def msg = bat(returnStdout: true, script: 'node clean.js')
                println msg
            }
                
                bat 'node check.js ${response.execResult}'
                //  bat 'node deploy.js'          
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
        }
         
            steps {
                echo 'Starting Stage 420'              
            }
        }
        stage('501') {
        when{
            expression { env.CSA_DEPLOY_FROM < '501' && env.CSA_DEPLOY_TO >= '501' }
         }
        environment { 
        CSA_Host = 'upgrade01'
        CSA_Port = '8178'
        CSA_EQUIP = 'upgrade-501-mssql'
        }
            steps {
                echo 'Starting Stage 501'              
            }
        }
        stage('Backup') {
            steps {
                echo 'Starting Stage BACKUP'              
            }
        }
    }
}
