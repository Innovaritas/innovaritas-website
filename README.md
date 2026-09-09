# Innovaritas Website

The real, hand-coded replacement for the old WordPress site at innovaritas.com.

## Status

Structure and visual style are now in place (plain HTML/CSS, no build step, no framework), using the confirmed dark/glassmorphism visual style (navy-to-near-black gradient background, starfield, frosted-glass cards, magenta→purple→cyan gradient accents, Raleway/Inter type). See `Innovaritas-Website-Progress.md` in the Content Docs / Website folder in Google Drive for the full plan, decisions, and color palette.

Copy on About is still placeholder text. Real content comes next. Contact is now a working form rather than placeholder.

**In progress, not yet committed or pushed:** a homepage redesign (two-column hero layout with an interactive fanned card switcher for featured projects). It's built and working locally but hasn't been reviewed, checked, or deployed yet, so the live site at innovaritas.com does not reflect it.

As of August 16, 2026 the site is under git version control, has passed a security scan (isitsecure v0.22.0, grade A, zero findings) ahead of going public, and has been pushed to GitHub (`Innovaritas/innovaritas-website`). **The site is live**: connected to Netlify (auto-deploys on every push to `main`), the contact form is confirmed working (test submission received, both in the Netlify Forms dashboard and by email), and `innovaritas.com` / `www.innovaritas.com` are pointed at the Netlify site and load correctly over HTTPS. The Netlify project was also switched from Netlify's private-by-default setting to **Public** (Project configuration → General → Visitor access), since new Netlify projects start private until you explicitly publish them.

**Still worth doing:** submit one more test message through the contact form at the live `innovaritas.com` address specifically (earlier tests were on the free `.netlify.app` address, before the domain switch) to confirm nothing broke in the DNS change.

## Structure

```
index.html                       Home
projects.html                    Projects (Pin Shuffler only, for now)
about.html                       About (placeholder copy)
contact.html                     Contact (Netlify form, see Contact form below)
thanks.html                      Post-submit confirmation page (noindex)
privacy/pin-shuffler.html        Pin Shuffler's real privacy policy
assets/style.css                 Shared stylesheet
assets/logo.png                  Innovaritas wordmark (transparent PNG, from Canva)
assets/favicon.png               Favicon / apple-touch-icon source (512x512)
assets/favicon-32.png            Favicon (32x32)
assets/hero-stack.js             Powers the homepage's interactive project card switcher
assets/pin-shuffler-pin.jpg      Photo used in the homepage hero's card stack
assets/pin-shuffler-icon.png     Pin Shuffler's icon, used on the Chrome Web Store CTA pill
assets/pin-shuffler-screenshot.jpg  Screenshot of Pin Shuffler in action, used on the Projects page
```

**Note:** Only Pin Shuffler is featured on the site right now, on purpose. MagDrop and BrandLens aren't mentioned yet since their names/scope could still change and they're not committed to being finished. When one of them is ready to be named publicly, add it back to `index.html` and `projects.html`, and give it its own `privacy/<app-name>.html` page (copy the structure of `privacy/pin-shuffler.html`).

## Contact form

`contact.html` posts to [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) rather than publishing an inbox address. Netlify's build step detects the `data-netlify="true"` attribute, strips it, and injects a hidden `form-name` field; submissions then appear in the site's Forms panel. Nothing identifying appears in the markup: no address, no endpoint, no account ID.

Spam is filtered by Netlify's built-in Akismet pass, plus a honeypot field (`netlify-honeypot="bot-field"`) that bots fill in and humans never see. No CAPTCHA.

**Two dashboard steps are required, or the form silently fails without them:**

1. **Forms → Enable form detection**, *before* the deploy that includes the form. It is off by default, and submissions vanish with no error if it is off at deploy time.
2. **Forms → Settings → notifications**, or submissions collect in the dashboard with nothing telling you they arrived.

The form cannot be tested locally; form detection only happens at deploy. First real test is on the live site.

The privacy policy deliberately keeps a real `mailto:` link instead of pointing at the form, because the Chrome Web Store listing requires a contact address in the policy. That address is HTML-entity encoded, which stops naive scrapers but not ones that decode entities first. It's a speed bump, not a guarantee.

## Deploying

This site is plain static HTML. No build step required.

Target repo: `Innovaritas/innovaritas-website` (the **Innovaritas org**, not a personal account). Pushed as of August 16, 2026: two commits (initial site, then the contact-form/README update).

Netlify is connected and set to auto-deploy on every push to `main`. Netlify's free subdomain for this site is `chic-cendol-5493fa.netlify.app`. **Don't rename it** in the Netlify dashboard without also updating the `www` CNAME record at the registrar (see DNS section below), since that record points at the exact current subdomain name.

## Domain (innovaritas.com)

Registered at Northwest Registered Agent, which also manages this domain's DNS (nameservers were left pointed at Northwest; Netlify DNS was deliberately *not* used, so the domain's existing Google Workspace/Gmail email setup for `@innovaritas.com` stays untouched).

DNS records changed at Northwest on August 16, 2026 to point the site at Netlify:

- **A record**, host `@` (root domain): changed from the old host's IP to `75.2.60.5` (Netlify's load-balancer IP, used because Northwest doesn't offer an ALIAS/ANAME record type, which is Netlify's first-choice option for the root domain)
- **CNAME record**, host `www`: added, pointing to `chic-cendol-5493fa.netlify.app.`
- The old `www` A record was removed (a host can't have both an A and CNAME record)
- `mail`, `*` (wildcard) A records, the MX record (`SMTP.GOOGLE.COM`), and all SPF/DKIM/DMARC TXT records were left untouched. Those run this domain's email and aren't part of the website

Netlify's own visitor-access setting also had to be flipped from **Private** to **Public** after the domain connected (Project configuration → General → Visitor access). New Netlify projects default to private now, separate from DNS/domain setup.
