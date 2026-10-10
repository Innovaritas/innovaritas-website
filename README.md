# Innovaritas Website

The real, hand-coded replacement for the old WordPress site at innovaritas.com.

## Status

Structure and visual style are now in place (plain HTML/CSS, no build step, no framework), using the confirmed dark/glassmorphism visual style (navy-to-near-black gradient background, starfield, frosted-glass cards, magenta→purple→cyan gradient accents, Raleway/Inter type). See `Innovaritas-Website-Progress.md` in the Content Docs / Website folder in Google Drive for the full plan, decisions, and color palette.

Copy on About is still placeholder text. Real content comes next. Contact is now a working form rather than placeholder.

The homepage redesign (two-column hero with an interactive fanned card switcher) is committed and live.

As of August 16, 2026 the site is under git version control, has passed a security scan (isitsecure v0.22.0, grade A, zero findings) ahead of going public, and has been pushed to GitHub (`Innovaritas/innovaritas-website`). **The site is live**: connected to Netlify (auto-deploys on every push to `main`), the contact form is confirmed working (test submission received, both in the Netlify Forms dashboard and by email), and `innovaritas.com` / `www.innovaritas.com` are pointed at the Netlify site and load correctly over HTTPS. The Netlify project was also switched from Netlify's private-by-default setting to **Public** (Project configuration → General → Visitor access), since new Netlify projects start private until you explicitly publish them.

**Still worth doing:** submit one more test message through the contact form at the live `innovaritas.com` address specifically (earlier tests were on the free `.netlify.app` address, before the domain switch) to confirm nothing broke in the DNS change.

## Structure

```
index.html                       Home
projects.html                    Projects (Pin Shuffler only, for now)
about.html                       About (placeholder copy)
contact.html                     Contact (Netlify form, see Contact form below)
thanks.html                      Post-submit confirmation page (noindex)
privacy/index.html               Lists every privacy policy (the footer "Privacy" link points here)
privacy/innovaritas.html         Privacy policy for innovaritas.com itself (contact form, hosting, fonts)
privacy/pin-shuffler.html        Pin Shuffler's real privacy policy
privacy/etsy-shop.html           Etsy shop privacy policy pointer (links to the policy on Etsy)
assets/style.css                 Shared stylesheet (includes the @font-face rules for the self-hosted fonts)
assets/fonts/                    Self-hosted Inter and Raleway (.woff2) plus their license files
assets/contact-topic.js          Pre-selects the contact form's Topic dropdown from ?topic= in the URL
assets/logo.png                  Innovaritas wordmark (transparent PNG, from Canva)
assets/favicon.png               Favicon / apple-touch-icon source (512x512)
assets/favicon-32.png            Favicon (32x32)
assets/hero-stack.js             Powers the homepage's interactive project card switcher
assets/pin-shuffler-pin.jpg      Photo used in the homepage hero's card stack
assets/pin-shuffler-icon.png     Pin Shuffler's icon, used on the Chrome Web Store CTA pill
assets/pin-shuffler-screenshot.jpg  Screenshot of Pin Shuffler in action, used on the Projects page
```

**Note:** Only Pin Shuffler is featured on the site right now, on purpose. MagDrop and BrandLens aren't mentioned yet since their names/scope could still change and they're not committed to being finished. When one of them is ready to be named publicly, add it back to `index.html` and `projects.html`, and give it its own `privacy/<app-name>.html` page (copy the structure of `privacy/pin-shuffler.html`) and add an entry for it to `privacy/index.html`. See Privacy policies below.

## Contact form

`contact.html` posts to [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) rather than publishing an inbox address. Netlify's build step detects the `data-netlify="true"` attribute, strips it, and injects a hidden `form-name` field; submissions then appear in the site's Forms panel. Nothing identifying appears in the markup: no address, no endpoint, no account ID.

Spam is filtered by Netlify's built-in Akismet pass, plus a honeypot field (`netlify-honeypot="bot-field"`) that bots fill in and humans never see. No CAPTCHA.

**Two dashboard steps are required, or the form silently fails without them:**

1. **Forms → Enable form detection**, *before* the deploy that includes the form. It is off by default, and submissions vanish with no error if it is off at deploy time.
2. **Forms → Settings → notifications**, or submissions collect in the dashboard with nothing telling you they arrived.

The form cannot be tested locally; form detection only happens at deploy. First real test is on the live site.

A one-line note above the Send button links to the website's privacy policy (`privacy/innovaritas.html`). The Pin Shuffler privacy policy deliberately keeps a real `mailto:` link instead of pointing at the form, because the Chrome Web Store listing requires a contact address in the policy. That address is HTML-entity encoded, which stops naive scrapers but not ones that decode entities first. It's a speed bump, not a guarantee.

## Privacy policies

**Rule: every product or offering gets its own privacy page, plus an entry in `privacy/index.html`.** Never merge them into one combined policy; one policy per offering is easier to keep accurate as apps are added.

- `privacy/index.html` lists all policies with a one-line description each. The footer "Privacy" link on every page points to `/privacy/` (the index). The "Privacy policy" link on the Pin Shuffler card in `projects.html` goes straight to `/privacy/pin-shuffler.html`.
- `privacy/innovaritas.html` covers only the use of innovaritas.com and general messages sent through the contact form. It uses "we" and is deliberately short and generic (it says "our hosting provider", not a named host, and "the information you enter in its fields", not a field list), so routine changes do not require editing it. Claims it makes must stay true: contact form is the contact route; no cookies, analytics, advertising tools, browser storage or cross-site tracking; fonts self-hosted; submissions stored by the hosting provider and possibly spam-checked by it or a third-party service; nothing is sold. **If any of that changes (for example analytics, a newsletter tool, or a new kind of form field such as file uploads or sensitive information), update the policy first.** Retention wording is "only as long as we need them", with no fixed deadline. Product-specific details (and any EU or UK buyer coverage) belong in each product's own policy. Research notes (Oct 10, 2026): a US site like this has no general legal duty to publish a policy, but California's online privacy law (CalOPPA) effectively requires one, covering types of information collected, types of third parties, how to request changes, how changes are announced, an effective date, and a Do Not Track statement. EU/UK rules apply only if the site targets people there. Revisit if B becomes established in the EU or starts marketing there. Not legal advice.
- `privacy/pin-shuffler.html` is the Chrome Web Store policy. Its text and URL must stay stable.
- `privacy/etsy-shop.html` is a **pointer only**. The Etsy shop policy is written and maintained on Etsy (shop Policies section) and is not copied onto this site, so there is nothing here to keep in sync. The page has no date line because the dated policy lives on Etsy. If the shop URL changes, update the link.
- Company name is written "Innovaritas LLC" (no comma) everywhere. Dates: every policy page that contains policy text (website, Pin Shuffler), in the same wording and place, ends with `Last updated: Month D, YYYY · Innovaritas LLC`. The Etsy pointer page and the index page have no date.
- Not settled: whether Netlify's data processing agreement covers our plan. This is a question for a lawyer, not policy text.

## Fonts

Inter (400, 500, 600, 700) and Raleway (600, 700, 800) are self-hosted from `assets/fonts/` (latin subset, `.woff2`, from Fontsource 5.3.0), declared with `@font-face` and `font-display: swap` at the top of `assets/style.css`. Both fonts use the SIL Open Font License 1.1, and the license files in `assets/fonts/` must stay with the font files. No page loads anything from Google Fonts, so no visitor IP address goes to Google. Do not add a Google Fonts link back. To add a weight, copy the matching `.woff2` from the Fontsource package and add a `@font-face` rule.

## Recurring chore: delete old contact form messages

The website privacy policy says messages are kept only as long as needed, then deleted. As our own practice we delete anything older than 12 months. Netlify has no automatic deletion, so this is done by hand every 6 months (delete anything older than 6 months, so nothing passes 12 months). A scheduled reminder (April 1 and October 1, 9:07 am Eastern) sends the exact steps. Copies exist in four places and all four need cleaning:

1. Netlify: Forms, contact form. Use Download as CSV first for anything to keep (verified messages only), then delete old verified messages and old spam. Deletion is permanent.
2. The innovaritas.com mailbox (Gmail): search `from:formresponses@netlify.com older_than:6m`, delete, empty Trash.
3. innovaritas@gmail.com (copies forwarded by Gmail): same search and steps.
4. B's own replies in both mailboxes (best effort search by the topic subjects).

An optional Gmail filter that labels mail from `formresponses@netlify.com` as `Contact form` makes the search easier.

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
