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
- Google Chrome for automated accessibility validation

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
- `yarn build` - Builds the app for production
- `yarn preview` - Locally preview the production build
- `yarn test:gifting` - Build the site and check gift artwork loading, replay, and failure handling
- `yarn test:a11y` - Build the site and run automated accessibility checks
- `yarn validate` - Run the production build, lint, and accessibility checks
- `yarn deploy` - Deploy to GitHub Pages

The accessibility audit finds Chrome automatically on macOS or through Playwright's `chrome` channel. Set `CHROME_PATH` to the Chrome executable when it is installed elsewhere.

The gifting check uses installed Chrome on macOS or Playwright's Chromium elsewhere. Run `npx playwright-core install chromium` if that browser is missing. To check Firefox, install its test browser with `npx playwright-core install firefox`, then run `GIFT_TEST_BROWSER=firefox yarn test:gifting`. `GIFT_TEST_BROWSER_PATH` can select a compatible executable; Firefox requires Playwright's build rather than a regular Firefox installation.

This regression check runs separately from `yarn validate` and the deployment workflow. It verifies loading and animation state, not device frame rates or every browser paint issue. The script stays in `scripts/` and is not included in the deployed site.


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
