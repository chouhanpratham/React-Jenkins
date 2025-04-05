pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react-app'
        RESOURCE_GROUP = 'rg-jenkins'
        APP_SERVICE_NAME = 'webapijenkinspratham2222225'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/chouhanpratham/React-Jenkins.git'
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
                dir('terraform') {
                    sh 'terraform plan -out=tfplan'
                    sh 'terraform apply -auto-approve tfplan'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('my-ikea') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('my-ikea') {
                    sh 'npm run build'
                }
            }
        }
        stage('Zip Build Folder') {
            steps {
                sh '''
                cd dist
                zip -r ../dist.zip .
                '''
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                dir('my_ikea') {
                    archiveArtifacts artifacts: '**', fingerprint: true
                }
            }
        }

        stage('Deploy to Azure') {
    steps {
        withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
            sh "az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID"
            sh "az webapp deploy --resource-group $RESOURCE_GROUP --name $APP_SERVICE_NAME --src-path dist.zip --type zip"
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
