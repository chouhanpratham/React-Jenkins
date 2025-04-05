pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react-app'
        RESOURCE_GROUP = 'rg-jenkins'
        APP_SERVICE_NAME = 'webapijenkinspratham2222225'
    }

    tools {
        nodejs 'NodeJS 20'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/chouhanpratham/React-Jenkins.git',
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    sh 'terraform init'
                }
            }
        }

        stage('Terraform Plan & Apply') {
            steps {
                sh 'terraform plan -out=tfplan'
                sh 'terraform apply -auto-approve tfplan'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Deploy to Azure') {
            steps {
                withCredentials([azureServicePrincipal('AZURE_CREDENTIALS_ID')]) {
                    sh '''
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                    az webapp deploy --resource-group $AZURE_RESOURCE_GROUP --name $AZURE_APP_NAME --src-path build.zip --type zip
                    '''
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment to Azure App Service was successful!'
        }
        failure {
            echo 'Deployment to Azure App Service failed.'
        }
    }
}
