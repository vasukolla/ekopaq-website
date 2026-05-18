# Custom GoDaddy Domain Setup for Cloud Run

Since your Cloud Run service is deployed in the Singapore region (**`asia-southeast1`**), Google Cloud's **native custom domain mapping** is fully supported! 

Here is a step-by-step guide to pointing your custom domain from GoDaddy to your live Cloud Run site.

---

## 🗺️ Step 1: Initialize Domain Mapping in Google Cloud
You can set up the mapping using the command line.

Open your local terminal and run:
```bash
gcloud beta run domain-mappings create \
  --service=ekopaq-website \
  --domain=www.yourdomain.com \
  --region=asia-southeast1 \
  --project=ekopaq-496610
```
> [!NOTE]
> * Replace `www.yourdomain.com` with your actual domain (e.g., `ekopaq.com` or `www.ekopaq.com`).
> * If you want both `ekopaq.com` and `www.ekopaq.com` to work, you will run this command twice—once for the root domain and once for the `www` subdomain.

---

## 🔑 Step 2: Verify Domain Ownership (If requested)
If this is the first time you are using this domain with Google Cloud, you will see a message asking you to verify ownership.

1. Go to the [Google Webmaster Central page](https://www.google.com/webmasters/verification/home).
2. Click **Add a Property** and enter your domain name (e.g., `yourdomain.com`).
3. Select **GoDaddy** as your domain registrar or select **Other / DNS TXT Record**.
4. Copy the generated **TXT record value** (it looks like `google-site-verification=...`).
5. **Log into GoDaddy**, open your domain's **DNS Management**, and add a new record:
   * **Type:** `TXT`
   * **Name/Host:** `@`
   * **Value:** *(Paste the TXT value copied from Google)*
   * **TTL:** `1 Hour` (or default)
6. Go back to Webmaster Central and click **Verify**.

---

## ⚙️ Step 3: Add DNS Records in GoDaddy
Once verified, the `gcloud` command (or the Google Cloud Console) will display the DNS records you need to add to your GoDaddy DNS settings to point traffic to Cloud Run.

### Choice A: If mapping a subdomain (e.g., `www.yourdomain.com`)
Google will ask you to add a **CNAME** record.
* **In GoDaddy DNS Management, click Add:**
  * **Type:** `CNAME`
  * **Name/Host:** `www` *(or your chosen subdomain)*
  * **Value/Target:** `ghs.googlehosted.com.` *(include the trailing dot if GoDaddy permits, otherwise just `ghs.googlehosted.com`)*
  * **TTL:** `1 Hour`

### Choice B: If mapping a root/apex domain (e.g., `yourdomain.com`)
Google will provide a set of **A** and **AAAA** IP addresses.
* **In GoDaddy DNS Management, click Add for each record:**
  * **Type:** `A` (add 4 separate A records)
    * **Name/Host:** `@`
    * **Value/Target:** *(Use the 4 IP addresses Google provides, e.g., `216.239.32.21`, etc.)*
  * **Type:** `AAAA` (add 4 separate AAAA records)
    * **Name/Host:** `@`
    * **Value/Target:** *(Use the 4 IPv6 addresses Google provides)*

---

## ⏳ Step 4: Wait for SSL Provisioning
Once the DNS records are saved in GoDaddy, Google Cloud will automatically detect them and provision an **SSL Certificate (HTTPS)** for your custom domain free of charge.
* This process typically takes **15 to 30 minutes** to complete.
* Once done, you can open your custom domain in the browser, and it will load your Ekopaq website securely via HTTPS!

---

### Need any help?
Let me know if you get stuck on the verification or GoDaddy DNS steps, and we can troubleshoot it together!
