# Innovaritas Website

The real, hand-coded replacement for the old WordPress site at innovaritas.com.

## Status

Structure and visual style are now in place — plain HTML/CSS, no build step, no framework — using the confirmed dark/glassmorphism visual style (navy-to-near-black gradient background, starfield, frosted-glass cards, magenta→purple→cyan gradient accents, Raleway/Inter type). See `Innovaritas-Website-Progress.md` in the Content Docs / Website folder in Google Drive for the full plan, decisions, and color palette.

Copy on About is still placeholder text — real content comes next. Contact is now a working form rather than placeholder.

As of August 16, 2026 the site is under git version control, has passed a security scan (isitsecure v0.22.0, grade A, zero findings) ahead of going public, and has been pushed to GitHub (`Innovaritas/innovaritas-website`). Not yet connected to Netlify.

## Structure

```
index.html                       Home
projects.html                    Projects (Pin Shuffler only, for now)
about.html                       About (placeholder copy)
contact.html                     Contact (Netlify form — see Contact form below)
thanks.html                      Post-submit confirmation page (noindex)
privacy/pin-shuffler.html        Pin Shuffler's real privacy policy
assets/style.css                 Shared stylesheet
assets/logo.png                  Innovaritas wordmark (transparent PNG, from Canva)
assets/favicon.png               Favicon / apple-touch-icon source (512x512)
assets/favicon-32.png            Favicon (32x32)
assets/pin-shuffler-lockup.png   Pin Shuffler's icon + wordmark lockup, used on the featured project card
```

**Note:** Only Pin Shuffler is featured on the site right now, on purpose — MagDrop and BrandLens aren't mentioned yet since their names/scope could still change and they're not committed to being finished. When one of them is ready to be named publicly, add it back to `index.html` and `projects.html`, and give it its own `privacy/<app-name>.html` page (copy the structure of `privacy/pin-shuffler.html`).

## Contact form

`contact.html` posts to [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) rather than publishing an inbox address. Netlify's build step detects the `data-netlify="true"` attribute, strips it, and injects a hidden `form-name` field; submissions then appear in the site's Forms panel. Nothing identifying appears in the markup — no address, no endpoint, no account ID.

Spam is filtered by Netlify's built-in Akismet pass, plus a honeypot field (`netlify-honeypot="bot-field"`) that bots fill in and humans never see. No CAPTCHA.

**Two dashboard steps are required — the form silently fails without them:**

1. **Forms → Enable form detection**, *before* the deploy that includes the form. It is off by default, and submissions vanish with no error if it is off at deploy time.
2. **Forms → Settings → notifications**, or submissions collect in the dashboard with nothing telling you they arrived.

The form cannot be tested locally; form detection only happens at deploy. First real test is on the live site.

The privacy policy deliberately keeps a real `mailto:` link instead of pointing at the form, because the Chrome Web Store listing requires a contact address in the policy. That address is HTML-entity encoded, which stops naive scrapers but not ones that decode entities first — a speed bump, not a guarantee.

## Deploying

This site is plain static HTML — no build step required.

Target repo: `Innovaritas/innovaritas-website` (the **Innovaritas org**, not a personal account). Pushed as of August 16, 2026 — two commits (initial site, then the contact-form/README update).

Once Netlify is connected (see the Progress doc's Next Steps), every push to `main` automatically redeploys the live site.

**Remaining steps:**

1. Connect the repo to Netlify
2. Enable form detection in Netlify (see Contact form above) **before** the first deploy
3. Verify the live site loads over HTTPS — this was outside the scope of the local security scan
4. Submit a test message through the live form to confirm it arrives
