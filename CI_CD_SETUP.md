# Automated CI/CD Deployment Guide: Git Push to Google Cloud

We have successfully deployed the **Ekopaq Website** to Google Cloud Run! 
* **Live App URL:** https://ekopaq-website-llwcgwsnsa-as.a.run.app

To automate this so that every time you push to GitHub, the live site is automatically rebuilt and updated, you can use one of two methods:

---

## 🛠️ Choice A: GitHub Actions (Recommended)
This is the most standard, clean, and flexible approach. You don't need to configure anything in the Google Cloud Console UI. It uses a workflow file in your codebase to build and deploy.

### Step 1: Create a Service Account Key
To allow GitHub Actions to safely deploy to your Google Cloud Project, you need a key for the newly created `github-deployer` service account.

Run this command in your local terminal to generate the key file:
```bash
gcloud iam service-accounts keys create gcp-key.json \
  --iam-account=github-deployer@ekopaq-496610.iam.gserviceaccount.com
```

### Step 2: Add the Key to GitHub Secrets
1. Open your GitHub Repository in the browser: [vasukolla/ekopaq-website](https://github.com/vasukolla/ekopaq-website).
2. Go to **Settings** -> **Secrets and variables** -> **Actions**.
3. Click **New repository secret**.
4. Set the **Name** to: `GCP_SA_KEY`
5. Open the local `gcp-key.json` file you generated, copy its entire contents (JSON format), and paste it into the **Value** box.
6. Click **Add secret**.
7. *(Important)* Delete the local `gcp-key.json` file from your computer immediately for security!
   ```bash
   rm gcp-key.json
   ```

### Step 3: We create the GitHub Actions Workflow
We have prepared the workflow file at `.github/workflows/deploy.yml` with the following configuration:
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

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Google Auth
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

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

## ☁️ Choice B: Google Cloud Build Trigger (GCP Native)
This uses Google Cloud's native trigger service to watch your GitHub repository.

### Step 1: Connect your GitHub Repo to GCP
1. Go to the [Google Cloud Build Triggers page](https://console.cloud.google.com/cloud-build/triggers;region=asia-southeast1?project=ekopaq-496610).
2. Click **Manage Repositories** -> **Connect Repository**.
3. Select **GitHub (Cloud Build GitHub App)** and authorize access.
4. Select your repository: `vasukolla/ekopaq-website` and click **Connect**.

### Step 2: Create the Trigger
Run this single gcloud command in your terminal once the repository is connected:
```bash
gcloud beta builds triggers create github \
  --name="ekopaq-deploy-trigger" \
  --repo-owner="vasukolla" \
  --repo-name="ekopaq-website" \
  --branch-pattern="^main$" \
  --build-config="cloudbuild.yaml" \
  --region="asia-southeast1" \
  --project="ekopaq-496610"
```
Whenever a push happens on `main`, Google Cloud Build will automatically run the local `cloudbuild.yaml` to build and deploy the update.

---

### Which do you prefer?
Let me know which option you would like to proceed with, and I can generate the `.github/workflows/deploy.yml` file for you if you choose Choice A!
