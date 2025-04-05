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

        stage('Add web.config for Windows App Service') {
            steps {
                script {
                    def webConfig = '''
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <defaultDocument>
      <files>
        <add value="index.html" />
      </files>
    </defaultDocument>
    <rewrite>
      <rules>
        <rule name="SPA" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
'''
                    writeFile file: 'my-ikea/dist/web.config', text: webConfig
                }
            }
        }

        stage('Zip Vite Build') {
            steps {
                sh 'rm -f dist.zip'
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
                        unzip -l dist.zip

                        echo "Deploying Vite build to Azure..."
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
