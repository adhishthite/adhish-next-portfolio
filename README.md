# Adhish Thite's Portfolio

Personal portfolio website showcasing my work in AI/ML engineering, product development, and technical leadership. Built with modern web technologies and deployed on Vercel.

**Live Site:** [adhishthite.com](https://adhishthite.com)

## Tech Stack

- **Framework:** Next.js 15 (App Router) with React 19
- **Language:** TypeScript
- **Styling:** TailwindCSS with [shadcn/ui](https://ui.shadcn.com/) and [magic-ui](https://magicui.design/)
- **Content:** MDX with syntax highlighting (Shiki)
- **Animations:** Framer Motion
- **Code Quality:** Biome (linting + formatting)
- **Deployment:** Vercel

## Key Features

- **Single-config Setup** — All personal data lives in [`src/data/resume.tsx`](./src/data/resume.tsx)
- **MDX Blog** — Write posts in Markdown with React components
- **Interactive UI** — Animated components (word rotation, number tickers, marquees)
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Dark Mode** — System-aware theme switching
- **Production-Ready** — Type-safe, linted, and optimized for Vercel

## Local Development

```bash
# Clone the repository
git clone https://github.com/adhishthite/adhish-next-portfolio
cd adhish-next-portfolio

# Install dependencies
make install
# or: pnpm install

# Start dev server
make dev
# or: pnpm dev

# Open http://localhost:3000
```

## Customization

1. **Edit Personal Data** — Update [`src/data/resume.tsx`](./src/data/resume.tsx) with your info
2. **Add Blog Posts** — Create `.mdx` files in the `content/` directory
3. **Modify Styling** — Adjust TailwindCSS classes or theme in `tailwind.config.ts`
4. **Add Components** — Use shadcn/ui CLI: `pnpm dlx shadcn@latest add [component]`

## Available Commands

```bash
make install   # Install dependencies
make dev       # Start development server
make build     # Build production bundle
make lint      # Lint with Biome (autofix)
make format    # Format code with Biome
make check     # Check formatting and linting (CI-friendly)
make clean     # Remove build artifacts and dependencies
make help      # Show all commands
```

Or use `pnpm` directly: `pnpm dev`, `pnpm build`, etc.

## Project Structure

```text
├── src/
│   ├── app/          # Next.js App Router (pages, layouts)
│   ├── components/   # React components (UI, magic-ui, mdx)
│   ├── data/         # Content configuration (resume, blog)
│   └── lib/          # Utilities and helpers
├── content/          # MDX blog posts
├── public/           # Static assets (images, icons)
└── Makefile          # Development commands
```

## Deployment

Deployed on **Vercel** with automatic builds from the `main` branch.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/adhishthite/adhish-next-portfolio)

Vercel handles the build configuration automatically for Next.js projects. Manual settings:

- **Build command:** `make build` or `pnpm build`
- **Output directory:** `.next`
- **Node version:** 18+

## License

MIT License — feel free to fork and customize for your own portfolio!

---

Built with ☕ by [Adhish Thite](https://github.com/adhishthite)
