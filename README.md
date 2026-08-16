# Innovaritas Website

The real, hand-coded replacement for the old WordPress site at innovaritas.com.

## Status

Structure and visual style are now in place — plain HTML/CSS, no build step, no framework — using the confirmed dark/glassmorphism visual style (navy-to-near-black gradient background, starfield, frosted-glass cards, magenta→purple→cyan gradient accents, Raleway/Inter type). See `Innovaritas-Website-Progress.md` in the Content Docs / Website folder in Google Drive for the full plan, decisions, and color palette.

Copy is still mostly placeholder text (About/Contact especially) — real content comes next, most likely with Claude Code from here.

## Structure

```
index.html                       Home
projects.html                    Projects (Pin Shuffler only, for now)
about.html                       About (placeholder copy)
contact.html                     Contact (placeholder — just an email link for now)
privacy/pin-shuffler.html        Pin Shuffler's real privacy policy
assets/style.css                 Shared stylesheet
assets/logo.png                  Innovaritas wordmark (transparent PNG, from Canva)
assets/favicon.png               Favicon / apple-touch-icon source (512x512)
assets/favicon-32.png            Favicon (32x32)
assets/pin-shuffler-lockup.png   Pin Shuffler's icon + wordmark lockup, used on the featured project card
```

**Note:** Only Pin Shuffler is featured on the site right now, on purpose — MagDrop and BrandLens aren't mentioned yet since their names/scope could still change and they're not committed to being finished. When one of them is ready to be named publicly, add it back to `index.html` and `projects.html`, and give it its own `privacy/<app-name>.html` page (copy the structure of `privacy/pin-shuffler.html`).

## Deploying

This site is plain static HTML — no build step required. Once the GitHub repo and Netlify are connected (see the Progress doc's Next Steps), every push to the `main` branch on GitHub will automatically redeploy the live site. That connection hasn't been made yet as of this file's last update.
