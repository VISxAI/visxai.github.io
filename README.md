# VISxAI Website

This is the official website for [visxai.io](https://visxai.io), the VISxAI workshop series on visualization and AI.

## Tech Stack

This project is built with:
- **SvelteKit** - Web framework
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **Vite** - Build tool
- **@sveltejs/adapter-static** - Static site generation for GitHub Pages

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0 or higher recommended)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/visxai/visxai.github.io.git
cd visxai.github.io
bun install
```

## Development

Start the development server:

```sh
bun run dev

# or start the server and open the app in a new browser tab
bun run dev --open
```

The site will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building

To create a production build:

```sh
bun run build
```

This will generate a static site in the `build/` directory using the static adapter configured in `svelte.config.js`.

You can preview the production build locally:

```sh
bun run preview
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

### Manual Deployment

If you need to deploy manually:

1. Build the project:
   ```sh
   bun run build
   ```

2. The `build/` directory contains the static files ready for deployment

### GitHub Pages Configuration

The project uses:
- **Adapter**: `@sveltejs/adapter-static` for static site generation
- **Build output**: `build/` directory
- **Deployment**: Automated via GitHub Actions workflow

## Project Structure

```
├── src/
│   ├── lib/
│   │   └── data/
│   │       └── years.ts      # Workshop data by year
│   ├── routes/               # SvelteKit routes
│   └── app.html             # HTML template
├── static/                   # Static assets
├── build/                    # Production build output (generated)
└── svelte.config.js         # SvelteKit configuration
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

See the repository for license information.
