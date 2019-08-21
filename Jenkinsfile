pipeline {
    agent any
     environment {
        CSA_Host = 'upgrade01'
        CSA_Port    = '8178'
        CSA_Login = 'root'
        CSA_Password = '123456'
        CSA_DEPLOY_TO = 501
        CSA_DEPLOY_FROM = 420
    }
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
        text(name: 'BIOGRAPHY', defaultValue: '', description: 'Enter some information about the person')
        booleanParam(name: 'TOGGLE', defaultValue: true, description: 'Toggle this value')
        choice(name: 'CHOICE', choices: ['One', 'Two', 'Three'], description: 'Pick something')
        password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'Enter a password')
       
    }
    stages {
        stage('INIT') {
            steps {
                echo "Starting Stage INIT" 
                bat 'npm install'
                bat 'check.bat'
             //   bat 'node scan.js'
            }
        }
        stage('RESTORE') {
         when{
            expression { !env.CSA_MANUAL_RESTORE }
         }
            steps {
                echo "Starting Stage RESTORE"              
            }
        }
        stage('312') {
         when{
            expression { env.CSA_DEPLOY_FROM < 312 && env.CSA_DEPLOY_TO >= 312 }
         }
            steps {
                echo "Starting Stage 312"              
            }
        }
        stage('402') {
        when{
            expression { env.CSA_DEPLOY_FROM < 402 && env.CSA_DEPLOY_TO >= 402 }
         }
            steps {
                echo "Starting Stage 402"              
            }
        }
        stage('420') {
        when{
            expression { env.CSA_DEPLOY_FROM < 420 && env.CSA_DEPLOY_TO >= 420 }
         }
            steps {
                echo "Starting Stage 420"              
            }
        }
        stage('501') {
        when{
            expression { env.CSA_DEPLOY_FROM < 501 && env.CSA_DEPLOY_TO >= 501 }
         }
            steps {
                echo "Starting Stage 501"              
            }
        }
        stage('Backup') {
            steps {
                echo "Starting Stage BACKUP"              
            }
        }
    }
}
