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

        stage('Build Vite App') {
            steps {
                dir('my-ikea') {
                    sh 'npm run build'
                }
            }
        }

        stage('Add web.config to dist') {
            steps {
                dir('my-ikea/dist') {
                    writeFile file: 'web.config', text: '''
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <defaultDocument>
      <files>
        <clear />
        <add value="index.html" />
      </files>
    </defaultDocument>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".webmanifest" mimeType="application/manifest+json" />
    </staticContent>
  </system.webServer>
</configuration>
'''
                }
            }
        }

        stage('Zip Vite Build') {
            steps {
                sh 'cd my-ikea/dist && zip -r ../../dist.zip .'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist.zip', fingerprint: true
            }
        }

        stage('Deploy to Azure') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    sh '''
                        echo "Logging into Azure..."
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID

                        echo "Setting subscription..."
                        az account set --subscription $AZURE_SUBSCRIPTION_ID

                        echo "Checking contents of dist.zip"
                        unzip -l $WORKSPACE/dist.zip

                        echo "Deploying Vite build..."
                        az webapp deploy \
                            --resource-group $RESOURCE_GROUP \
                            --name $APP_SERVICE_NAME \
                            --src-path dist.zip \
                            --type zip
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Vite App deployed successfully to Azure!'
        }
        failure {
            echo '❌ Deployment failed. Check Azure logs for details.'
        }
    }
}
