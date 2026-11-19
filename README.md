# Personal Portfolio Website

This is my personal portfolio website, built from the ground-up with Vite, React, TypeScript, and Tailwind CSS v4. It's published to [davidageorge.me](https://davidageorge.me) via GitHub Pages CI/CD.

## Features

- Modern, responsive design
- Project showcase
- Skills and experience sections
- Contact information
- Built with accessibility in mind

## Technologies

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Yarn package manager
- Google Chrome on macOS, or Playwright Chromium (`yarn playwright-core install chromium`) for browser checks

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/yourusername/personal-portfolio.git
    cd personal-portfolio
    ```

2. Install dependencies

    ```bash
    yarn install
    ```

3. Start the development server

    ```bash
    yarn start
    ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Available Scripts

- `yarn start` - Starts the development server
- `yarn typecheck` - Checks TypeScript for the app and Vite configuration
- `yarn build` - Checks TypeScript and builds the app for production
- `yarn build:app` - Bundles and prerenders the site; CI runs TypeScript as a separate parallel job
- `yarn preview` - Locally preview the production build
- `yarn test:gifting` - Build the site and check gift artwork loading, replay, and failure handling
- `yarn test:a11y` - Build the site and run automated accessibility checks
- `yarn test:smoke` - Build the site and check desktop/mobile navigation, lightboxes, page errors, and horizontal overflow
- `yarn test:links` - Build the site and check generated pages, internal links, anchors, and referenced assets
- `yarn validate` - Run lint, build once, then run all link, accessibility, smoke, and gifting checks
- `yarn deploy` - Deploy to GitHub Pages

The accessibility, smoke, and link checks use installed Chrome on macOS or Playwright's Chromium elsewhere. Set `CHROME_PATH` to use another compatible executable. CI reuses cached Chromium binaries and installs the required Linux dependencies on each browser runner.

The gifting check uses installed Chrome on macOS or Playwright's Chromium elsewhere. Run `npx playwright-core install chromium` if that browser is missing. To check Firefox, install its test browser with `npx playwright-core install firefox`, then run `GIFT_TEST_BROWSER=firefox yarn test:gifting`. `GIFT_TEST_BROWSER_PATH` can select a compatible executable; Firefox requires Playwright's build rather than a regular Firefox installation.

The gifting regression check runs in `yarn validate` and CI. It verifies loading and animation state, not device frame rates or every browser paint issue. The scripts stay in `scripts/` and are not included in the deployed site.

Pull requests and pushes to `main` run TypeScript, lint, the production build, internal-link and asset checks, accessibility, desktop/mobile smoke tests, and gifting regression tests. TypeScript, lint, and the production build run as independent parallel jobs. After the build, four separate jobs check links, accessibility, desktop/mobile behavior, and gifting in parallel; a failing check does not cancel the others. The build is uploaded once and downloaded by all four checks and deployment, so the exact tested files are published only after every job passes. Yarn downloads are cached by the lockfile. Installed dependencies are cached by the pinned Node version, package manifest, and lockfile; Chromium is cached by Playwright version. All caches are scoped to the runner platform. Smoke-test failures upload a screenshot artifact retained for seven days. External websites are excluded from link validation so third-party downtime does not block deployment.


## Project Structure

- `/src` - Source code
    - `/assets` - Static assets (images, etc.)
    - `/components` - Reusable React components
    - `/pages` - Page components
    - `/content` - Case studies, skills, and image metadata
    - `App.tsx` - Main application component

## Deployment

This site is deployed to GitHub Pages. There are two ways to deploy:

### Automatic Deployment (Recommended)

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions. Simply:

1. Make your changes
2. Commit and push to the main branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. GitHub Actions will automatically build and deploy your site

### Manual Deployment

If you need to deploy manually (not recommended for regular use):

**Build and deploy in one command:**

```bash
yarn deploy
```

This command will:

- Build the production version of the site
- Create a CNAME file with your domain
- Deploy to GitHub Pages using the `gh-pages` package

**Alternative: Build first, then deploy:**

```bash
yarn build
echo 'davidageorge.me' > ./build/CNAME
npx gh-pages -d build
```

### Prerequisites for Manual Deployment

- Ensure you have the `gh-pages` package installed (already included in devDependencies)
- Make sure you're authenticated with GitHub (the `gh-pages` package will use your Git credentials)
- Verify your repository has GitHub Pages enabled in the repository settings

### Custom Domain Setup

The build creates the CNAME file and all canonical, Open Graph, JSON-LD, robots, and sitemap URLs from `src/content/site.json`. To use a different domain:

1. Update `siteUrl` in `src/content/site.json`
2. Configure the new domain's DNS settings to point to your GitHub Pages URL
3. Run `yarn build` and verify `build/CNAME`, `build/robots.txt`, and `build/sitemap.xml` contain the new domain

## License

MIT

## Acknowledgments

Thanks for visiting my portfolio repository!
