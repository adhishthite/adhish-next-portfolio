<div align="center">
<img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdillionverma%2Fportfolio)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Cloudflare Pages.

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 16, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog with MDX support
- Responsive for different devices
- Optimized for Next.js and Cloudflare Pages
- Code quality with Biome linting and formatting
- Makefile for consistent development workflow

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dillionverma/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   make dev
   ```

   Or using pnpm directly:

   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

# Available Commands

This project uses a Makefile for common tasks:

- `make dev` — Start development server
- `make build` — Build production bundle
- `make lint` — Lint with Biome (includes autofix)
- `make format` — Format code with Biome
- `make check` — Run format and lint checks (no autofix)
- `make clean` — Clean build artifacts and dependencies
- `make help` — Show all available commands

# License

Licensed under the [MIT license](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
