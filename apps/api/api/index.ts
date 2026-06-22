// Vercel serverless entry point.
//
// Vercel treats files inside this `api/` directory as serverless functions.
// We import the PREBUILT bundle (`../dist/index.js`, produced by tsup during
// the build step) rather than the TypeScript source. This is deliberate:
// `@vercel/node` type-checks whatever TS it compiles with its own compiler
// config, which differs from our tsconfig and trips on Zod-inferred types.
// Pointing at the already-bundled JS sidesteps that entirely — the app is a
// valid `(req, res)` handler and does not call `listen()` on Vercel.
export { default } from "../dist/index.js";
