pipeline {
    agent any
     environment {
        CSA_Host = 'upgrade01'
        CSA_Port    = '8178'
         CSA_Login = 'root'
         CSA_Password = '123456'
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
                bat 'node scan.js'
            }
        }
        stage('RESTORE') {
            steps {
                echo "Starting Stage RESTORE"              
            }
        }
        stage('312') {
            steps {
                echo "Starting Stage 312"              
            }
        }
        stage('402') {
            steps {
                echo "Starting Stage 402"              
            }
        }
        stage('420') {
            steps {
                echo "Starting Stage 420"              
            }
        }
        stage('501') {
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
