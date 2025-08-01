# SlideFlow Simple (Scaffold)

This repository contains the initial scaffolding for SlideFlow Simple per the provided plan. You will deploy and install dependencies on Vercel; this commit focuses on application code only.

Important notes:
- TypeScript errors shown in the editor are expected until dependencies are installed (react, next, framer-motion, etc.).
- Tailwind setup is referenced by globals.css directives, but tailwind/postcss config files are not included since you preferred to handle setup manually.
- The export pipeline is scaffolded and currently returns a minimal MP4 stub to exercise the UI; replace with ffmpeg.wasm when you wire dependencies.

## Implemented

- App Router structure:
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/app/globals.css
- Components:
  - src/components/ImageUploader.tsx (drag & drop with react-dropzone API)
  - src/components/TransitionSelect.tsx (Random + all effect keys)
  - src/components/SlidePreview.tsx (Framer Motion preview with a subset of effects mapped)
  - src/components/ExportSection.tsx (CPU/GPU buttons + progress)
- Lib:
  - src/lib/transitions.ts (58 effect keys + random sequence helpers)
  - src/lib/exportUtils.ts (placeholder export performing progress updates and producing a tiny MP4 stub)
- Styles:
  - Tailwind utility usage in components and globals.css ready for Tailwind configuration.

## What you need to do on Vercel

1) Install dependencies:
   - next@14 react@18 react-dom@18
   - framer-motion@11
   - tailwindcss@3 postcss autoprefixer
   - lucide-react@latest
   - react-dropzone@latest
   - @ffmpeg/ffmpeg @ffmpeg/util

2) Configure Tailwind:
   - Create tailwind.config.js with `content: ["./src/**/*.{ts,tsx}"]`
   - Create postcss.config.js with tailwindcss and autoprefixer
   - Ensure the import of globals.css is active (Next.js App Router loads it via layout.tsx)

3) TypeScript:
   - Add tsconfig.json. Minimal example:
     {
       "compilerOptions": {
         "target": "ES2022",
         "lib": ["dom", "es2022"],
         "jsx": "react-jsx",
         "module": "esnext",
         "moduleResolution": "bundler",
         "baseUrl": ".",
         "paths": { "@/*": ["src/*"] },
         "strict": true,
         "skipLibCheck": true,
         "noEmit": true,
         "resolveJsonModule": true
       },
       "include": ["src"]
     }

4) Next.js config (optional):
   - Add next.config.js if needed for future asset domains or wasm settings.

5) ffmpeg.wasm integration (future):
   - Replace exportUtils.ts internals with ffmpeg.wasm flow, including proper core/wasm URLs.

## Usage

- Upload images via the import panel.
- Choose Random or a specific transition.
- Set global duration.
- Use Export buttons to generate a placeholder MP4 file (for now).

This scaffold matches the plan and is structured to be extended with the full set of transitions and real export pipeline.
