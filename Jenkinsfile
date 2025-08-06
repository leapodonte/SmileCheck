pipeline {
  agent any

  environment {
    FRONTEND_IMAGE = "smilecheck-frontend"
    FRONTEND_CONTAINER = "smilecheck-frontend"
    FRONTEND_PORT = "3000"

    BACKEND_IMAGE = "smilecheck-backend"
    BACKEND_CONTAINER = "smilecheck-backend"
    BACKEND_PORT = "4000"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/leapodonte/SmileCheck.git'
      }
    }

    // ======================
    // FRONTEND (Next.js)
    // ======================
    stage('Build Frontend Docker Image') {
      steps {
        script {
          sh "docker build --no-cache -t ${FRONTEND_IMAGE} ./frontend"
        }
      }
    }

    stage('Stop Old Frontend Container') {
      steps {
        script {
          sh """
            docker stop ${FRONTEND_CONTAINER} || true
            docker rm ${FRONTEND_CONTAINER} || true
          """
        }
      }
    }

    stage('Run Frontend Container') {
      steps {
        script {
          sh """
            # Copy secure .env.local from VPS to working dir
            cp /opt/env-files/smilecheck/frontend.env.local ./frontend/.env.local

            # Merge .env.local (fallback) and .env.production (override)
            cat ./frontend/.env.local ./frontend/.env.production | awk '!seen[\$0]++' > ./frontend/.env.merged

            # Run frontend container with merged env
            docker run -d \\
              --name ${FRONTEND_CONTAINER} \\
              --env-file ./frontend/.env.merged \\
              -p ${FRONTEND_PORT}:${FRONTEND_PORT} \\
              ${FRONTEND_IMAGE}
          """
        }
      }
    }

    // ======================
    // BACKEND
    // ======================
    stage('Build Backend Docker Image') {
      steps {
        script {
          sh "docker build --no-cache -t ${BACKEND_IMAGE} ./backend"
        }
      }
    }

    stage('Stop Old Backend Container') {
      steps {
        script {
          sh """
            docker stop ${BACKEND_CONTAINER} || true
            docker rm ${BACKEND_CONTAINER} || true
          """
        }
      }
    }

    stage('Run Backend Container') {
      steps {
        script {
          sh """
            # Copy secure .env.local from VPS to working dir
            cp /opt/env-files/smilecheck/backend.env.local ./backend/.env.local

            # Merge .env.local (fallback) and .env.production (override)
            cat ./backend/.env.local ./backend/.env.production | awk '!seen[\$0]++' > ./backend/.env.merged

            # Run backend container with merged env
            docker run -d \\
              --name ${BACKEND_CONTAINER} \\
              --env-file ./backend/.env.merged \\
              -p ${BACKEND_PORT}:${BACKEND_PORT} \\
              ${BACKEND_IMAGE}
          """
        }
      }
    }
  }

  post {
    success {
      echo "✅ Frontend and Backend deployed successfully!"
    }
    failure {
      echo "❌ Deployment failed. Check logs for details."
    }
  }
}
