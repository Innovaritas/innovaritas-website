# Innovaritas Website

The real, hand-coded replacement for the old WordPress site at innovaritas.com.

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
privacy/genuinearticle.html      GenuineArticle's privacy policy (Chrome Web Store and Etsy API requirement)
terms/index.html                 Lists every terms of use page (the footer "Terms" link points here)
terms/genuinearticle.html        GenuineArticle's Terms of Use (includes Etsy's required warranty disclaimer)
assets/style.css                 Shared stylesheet (includes the @font-face rules for the self-hosted fonts)
assets/fonts/                    Self-hosted Inter and Raleway (.woff2) plus their license files
assets/contact-topic.js          Pre-selects the contact form's Topic dropdown from ?topic= in the URL
assets/logo.png                  Innovaritas wordmark (transparent PNG, 832 x 216). The sparkle above the i was rebuilt on an 11 pixel grid
assets/favicon.png               Favicon source (512x512), same rebuilt sparkle
assets/favicon-32.png            Favicon (32x32)
assets/apple-touch-icon.png      Home screen icon (180x180)
favicon.ico                      Classic favicon with 16, 32 and 48 pixel layers (lives in the project root, not assets/)
assets/hero-stack.js             Powers the homepage's interactive project card switcher
assets/pin-shuffler-pin.jpg      Photo used in the homepage hero's card stack
assets/pin-shuffler-icon.png     Pin Shuffler's icon, used on the Chrome Web Store CTA pill
assets/pin-shuffler-screenshot.jpg  Screenshot of Pin Shuffler in action, used on the Projects page
```

## Contact form

`contact.html` posts to [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) rather than publishing an inbox address. Netlify's build step detects the `data-netlify="true"` attribute, strips it, and injects a hidden `form-name` field; submissions then appear in the site's Forms panel. Nothing identifying appears in the markup: no address, no endpoint, no account ID.

Spam is filtered by Netlify's built-in Akismet pass, plus a honeypot field (`netlify-honeypot="bot-field"`) that bots fill in and humans never see. No CAPTCHA.

A one-line note above the Send button links to the website's privacy policy (`privacy/innovaritas.html`). The Pin Shuffler privacy policy deliberately keeps a real `mailto:` link instead of pointing at the form, because the Chrome Web Store listing requires a contact address in the policy. That page keeps the address HTML-entity encoded so a store reviewer or checker that does not run JavaScript still sees a real contact address. The GenuineArticle pages build the address with `assets/contact-email.js` instead, so it is not in their page source. Both are speed bumps for scrapers, not guarantees.

## Privacy and Terms

**Rule: every product or offering gets its own privacy page, plus an entry in `privacy/index.html`.** Never merge them into one combined policy; one policy per offering is easier to keep accurate as apps are added.

- `privacy/index.html` lists all policies with a one-line description each. The footer "Privacy" link on every page points to `/privacy/` (the index). The "Privacy policy" link on the Pin Shuffler card in `projects.html` goes straight to `/privacy/pin-shuffler.html`.
- `privacy/innovaritas.html` covers only the use of innovaritas.com and general messages sent through the contact form. It uses "we" and is deliberately short and generic (it says "our hosting provider", not a named host, and "the information you enter in its fields", not a field list), so routine changes do not require editing it. Claims it makes must stay true: contact form is the contact route; no cookies, analytics, advertising tools, browser storage or cross-site tracking; fonts self-hosted; submissions stored by the hosting provider and possibly spam-checked by it or a third-party service; nothing is sold. **If any of that changes (for example analytics, a newsletter tool, or a new kind of form field such as file uploads or sensitive information), update the policy first.** Retention wording is "only as long as we need them", with no fixed deadline. Product-specific details (and any EU or UK buyer coverage) belong in each product's own policy.
- `privacy/pin-shuffler.html` is the Chrome Web Store policy. Its text and URL must stay stable.
- `privacy/etsy-shop.html` is a **pointer only**. The Etsy shop policy is written and maintained on Etsy (shop Policies section) and is not copied onto this site, so there is nothing here to keep in sync. The page has no date line because the dated policy lives on Etsy. If the shop URL changes, update the link.
- Company name is written "Innovaritas LLC" (no comma) everywhere. Dates: every policy page that contains policy text (website, Pin Shuffler), in the same wording and place, ends with `Last updated: Month D, YYYY · Innovaritas LLC`. The Etsy pointer page and the index page have no date.

**Rule: every product that needs terms gets its own page under `terms/`, plus an entry in `terms/index.html`.** The footer "Terms" link on every page points to `/terms/`.

- `terms/genuinearticle.html` is the Terms of Use for the GenuineArticle extension (added Oct 17, 2026). Etsy's API terms (updated Aug 18, 2026) require Application Terms that users accept by click-through or equivalent, with a privacy policy, a warranty disclaimer substantially similar to Etsy's template naming the developer (Innovaritas LLC) and stating Etsy is not the developer and makes no warranties, and a monitored support email. Keep the "Disclaimer" section, the Etsy trademark sentence, and the support email in this page. The extension's accept step (not built yet) must link here and to `privacy/genuinearticle.html`.
- `privacy/genuinearticle.html` describes recipients by CATEGORY (image search provider, image safety check provider, AI language model provider, public knowledge base, hosting and database providers) and names only Etsy, whose terms require it. **If GenuineArticle's data practices change (a new service, a new stored value, accounts, payments, analytics), update this policy first** and the date on it.
- The support address on both pages is HTML-entity encoded, like the Pin Shuffler policy. Never write it in plain text.

## Fonts

Inter (400, 500, 600, 700) and Raleway (600, 700, 800) are self-hosted from `assets/fonts/` (latin subset, `.woff2`, from Fontsource 5.3.0), declared with `@font-face` and `font-display: swap` at the top of `assets/style.css`. Both fonts use the SIL Open Font License 1.1, and the license files in `assets/fonts/` must stay with the font files. No page loads anything from Google Fonts, so no visitor IP address goes to Google. Do not add a Google Fonts link back. To add a weight, copy the matching `.woff2` from the Fontsource package and add a `@font-face` rule.

## Deploying

Netlify auto-deploys every push to `main`. No build step is needed for the site itself.
Repo-only files such as this README are deleted before publishing by the build command in `netlify.toml`; add any new repo-only file to that list.

## Internal notes

Internal notes are kept outside the repo in `planning/`.
