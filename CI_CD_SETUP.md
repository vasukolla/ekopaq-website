# Automated CI/CD Deployment Guide: Workload Identity Federation

We have successfully deployed the **Ekopaq Website** to Google Cloud Run! 
* **Live App URL:** https://ekopaq-website-llwcgwsnsa-as.a.run.app

Since your Google Cloud organization has policies that disable service account key creation (which is a standard security best-practice), we have configured **Workload Identity Federation**. 

This is an **ultra-secure, keyless** authentication mechanism. GitHub Actions authenticates dynamically using open-standard tokens (OIDC) directly with Google Cloud. **No passwords or secret keys are stored on GitHub.**

---

## 🛠️ GitHub Actions Workflow Configuration
We have already created the workflow file at `.github/workflows/deploy.yml` and pre-configured everything for you. Here is the configuration:

```yaml
name: Deploy to Google Cloud Run

on:
  push:
    branches:
      - main

env:
  PROJECT_ID: ekopaq-496610
  REGION: asia-southeast1
  SERVICE_NAME: ekopaq-website

jobs:
  deploy:
    name: Build and Deploy to Cloud Run
    runs-on: ubuntu-latest

    # Required permissions for keyless dynamic auth
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Google Auth (Workload Identity Federation)
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'projects/1017665393092/locations/global/workloadIdentityPools/github-pool/providers/github-provider'
          service_account: 'github-deployer@ekopaq-496610.iam.gserviceaccount.com'

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2

      - name: Authorize Docker
        run: |
          gcloud auth configure-docker asia-southeast1-docker.pkg.dev --quiet

      - name: Build and Push Container
        run: |
          docker build -t asia-southeast1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/$SERVICE_NAME:$GITHUB_SHA .
          docker push asia-southeast1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/$SERVICE_NAME:$GITHUB_SHA

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy $SERVICE_NAME \
            --image=asia-southeast1-docker.pkg.dev/$PROJECT_ID/cloud-run-source-deploy/$SERVICE_NAME:$GITHUB_SHA \
            --region=$REGION \
            --platform=managed \
            --allow-unauthenticated \
            --port=8080
```

---

## 🚀 How to trigger your first deploy:
Since all OIDC federation and project permissions are fully configured on your Google Cloud Console, **everything is 100% ready to run!**

Simply push any commit to your `main` branch:
1. Make any change in the code.
2. Run:
   ```bash
   git add -A
   git commit -m "Trigger deployment"
   git push origin main
   ```
3. Go to the **Actions** tab on your GitHub Repository page [vasukolla/ekopaq-website](https://github.com/vasukolla/ekopaq-website) to watch the live build and deploy process in real-time!
