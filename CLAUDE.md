# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server at localhost:4321
npm run build     # production build → dist/
npm run preview   # serve the dist/ folder locally
```

No test runner or linter is configured yet.

## Architecture

**Framework:** Astro 6 (static output) + React islands + Tailwind CSS 4 + MDX.

**Deployment:** Every push to `master` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and deploys `dist/` to GitHub Pages at `https://mohamed-abdelaziz721.github.io/personal_website/`.

### Base path

`astro.config.mjs` sets `base: '/personal_website'`. All internal links must be prefixed with `/personal_website/…` or use `import.meta.env.BASE_URL` (which `BaseLayout.astro` already does for nav links). Forgetting the base path is the most common breakage point.

### Content collections (Astro v6 loader API)

Content lives in `src/content/` and is declared in `src/content.config.ts` using the `glob()` loader (not the legacy `src/content/config.ts` pattern).

| Collection | Directory | Required frontmatter |
|---|---|---|
| `blog` | `src/content/blog/` | `title`, `description`, `date` |
| `projects` | `src/content/projects/` | `title`, `description`, `date` |

Both collections accept `.md` and `.mdx`. Optional fields: `tags[]`, `github` (URL), `client` (projects only).

**Adding a post or project:** drop an `.mdx` file into the matching directory — routing and listing pages are fully dynamic via `getStaticPaths`.

### MDX capabilities

Math is available globally — `remark-math` + `rehype-katex` are wired in `astro.config.mjs` under `markdown:` (not inside `mdx()`). KaTeX CSS is imported in `BaseLayout.astro`.

- Inline math: `$E = mc^2$`
- Block math: `$$…$$`
- Recharts, Framer Motion, and any React component can be imported directly in `.mdx` files.

### React islands (3D / MPR viewers)

Heavy browser-only components live in `src/components/`. Always mount them with `client:only="react"` — they use browser APIs and will break during SSR otherwise.

- **`VtkViewer.tsx`** — renders a VTK.js scene from a URL (`.vti`, `.vtp`, etc.). All VTK imports are dynamic (`import('@kitware/vtk.js/…')`) because `@kitware/vtk.js` is excluded from Vite's `optimizeDeps` to avoid bundling issues.
- **`MprViewer.tsx`** — three-panel axial/sagittal/coronal viewer backed by Cornerstone.js. Accepts a `imageIds` array (WADO-URI or `wadouri:` prefixed strings). Initialises Cornerstone and its tool group lazily inside `useEffect`.

Example usage in MDX:

```astro
import VtkViewer from '../../components/VtkViewer';
import MprViewer from '../../components/MprViewer';

<VtkViewer client:only="react" url="/personal_website/data/scene.vti" height={500} />
<MprViewer client:only="react" imageIds={['wadouri:/personal_website/data/slice_001.dcm']} />
```

Static assets served from `public/` are available at `/personal_website/<filename>` in production.

### Layout

`BaseLayout.astro` is the single layout used by all pages. It imports `global.css` (Tailwind entry point) and `katex/dist/katex.min.css`. Nav links are built with `import.meta.env.BASE_URL`.
