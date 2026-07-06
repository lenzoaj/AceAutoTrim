---
name: Vite uppercase image extension imports
description: TS2307 "Cannot find module" errors when importing .JPG/.PNG (uppercase) assets in a Vite + TS app
---

Vite's built-in `vite/client` ambient module declarations only cover lowercase extensions (`*.jpg`, `*.png`, etc.). Importing an asset with an uppercase extension (e.g. `photo.JPG`, common in camera-exported files) fails TypeScript with TS2307 even though the file resolves fine at runtime via Vite's asset pipeline.

**Why:** TS module declarations are case-sensitive string matches; `declare module "*.jpg"` does not match `"*.JPG"`.

**How to apply:** When an artifact imports user-provided image assets with mixed-case extensions, add a local `src/vite-env.d.ts` (referencing `vite/client` plus explicit `declare module "*.JPG" { const src: string; export default src; }` blocks for each uppercase extension in use) rather than renaming the source files.
