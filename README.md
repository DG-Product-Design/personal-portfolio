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
- **Styling**: Tailwind CSS v4, DaisyUI
- **Build Tool**: Vite
- **Testing**: Vitest
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Yarn package manager

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

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Available Scripts

- `yarn start` - Starts the development server
- `yarn build` - Builds the app for production
- `yarn preview` - Locally preview the production build
- `yarn test` - Run tests
- `yarn test:coverage` - Run tests with coverage report
- `yarn deploy` - Deploy to GitHub Pages

## Project Structure

- `/src` - Source code
    - `/assets` - Static assets (images, etc.)
    - `/components` - Reusable React components
    - `/pages` - Page components
    - `/sections` - Page section components
    - `appData.tsx` - Portfolio content
    - `App.tsx` - Main application component

## Deployment

This site is deployed to GitHub Pages. There are two ways to deploy:

### Automatic Deployment (Recommended)

The site is automatically deployed to GitHub Pages when changes are pushed to the `gh-pages` branch via GitHub Actions.

### Manual Deployment

1. Merge all changes into the main branch via a Github pull request.

2. To manually deploy the site:

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

The deployment automatically creates a CNAME file with `davidageorge.me`. To use a different domain:

1. Update the domain in the `deploy` script in `package.json`
2. Or manually create the CNAME file with your desired domain
3. Configure your domain's DNS settings to point to your GitHub Pages URL

## License

MIT

## Acknowledgments

Thanks for visiting my portfolio repository!
