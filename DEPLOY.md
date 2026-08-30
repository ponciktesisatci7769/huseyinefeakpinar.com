# Deploy guide

## Option A — GitHub Pages (simple and free)

1. Create a new public GitHub repository, for example `huseyinefeakpinar.com`.
2. Upload the contents of this folder to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main`, and `/(root)`.
4. GitHub will provide a temporary `github.io` address.
5. Register `huseyinefeakpinar.com` with a domain registrar.
6. In GitHub Pages, add the custom domain and enable HTTPS.
7. At the registrar, create the DNS records GitHub displays for the repository. Do not guess the records; GitHub's current instructions can change.

## Option B — Cloudflare Pages / Netlify / Vercel

Upload or connect the repository as a static site. No build command is required and the publish directory is the repository root.

## Custom domain

Keep the domain registered in an account you control. Turn on domain privacy when offered, and use HTTPS.

The included `sitemap.xml` and `robots.txt` are already written for:

`https://huseyinefeakpinar.com`

If you choose another domain, replace that domain in both files before deployment.

## After deployment

Submit the sitemap in Google Search Console and Bing Webmaster Tools. Then search your own name in an incognito window to make sure the site title and description appear correctly.
