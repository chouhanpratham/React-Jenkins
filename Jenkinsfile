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
                    sh '''
                    ls -al
                    ls -al build || echo "No 'build' directory found"
                    ls -al dist || echo "No 'dist' directory found"
                    '''
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                dir('my-ikea') {
                    archiveArtifacts artifacts: '**', fingerprint: true
                }
            }
        }

        stage('Deploy to Azure') {
    steps {
        withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
            sh '''
                az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                
                # Create zip only from dist folder
                cd my-ikea/dist
                zip -r ../../build.zip ./*
                cd ../..
                
                # Deploy to Azure App Service
                az webapp deploy \
                  --resource-group $RESOURCE_GROUP \
                  --name $APP_SERVICE_NAME \
                  --src-path build.zip \
                  --type zip
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
