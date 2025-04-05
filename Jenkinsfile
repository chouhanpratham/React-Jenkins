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
        
        stage('Zip Vite Build') {
            steps {
                dir('my-ikea/dist') {
                    sh 'zip -r ../../dist.zip *'
                }
            }
        }
        

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'my-ikea/dist.zip', fingerprint: true
            }
        }
        
    

stage('Deploy to Azure') {
    steps {
        withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
            sh "az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID"
            sh "az account set --subscription $AZURE_SUBSCRIPTION_ID"
            sh "az webapp deploy --resource-group $RESOURCE_GROUP --name $APP_SERVICE_NAME --src-path $WORKSPACE/dist.zip --type static"
        }
    }
}


        stage('Deploy to Azure App Service') {
    steps {
        withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
            sh '''
                echo "Logging into Azure..."
                az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                
                echo "Setting subscription..."
                az account set --subscription $AZURE_SUBSCRIPTION_ID

                echo "Deploying Vite build using config-zip..."
                az webapp deployment source config-zip \
                  --resource-group $RESOURCE_GROUP \
                  --name $APP_SERVICE_NAME \
                  --src $WORKSPACE/my-ikea/dist.zip
            '''
        }
    }
}

        }
    }

    post {
        success {
            echo '✅ Vite App deployed successfully to Azure!'
        }
        failure {
            echo '❌ Deployment failed. Check Kudu logs for details.'
        }
    }
}

