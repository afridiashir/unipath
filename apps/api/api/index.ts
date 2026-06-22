// Vercel serverless entry point.
//
// Vercel treats files inside this `api/` directory as serverless functions.
// An Express app is itself a valid `(req, res)` handler, so we just re-export
// the configured app. The app does NOT call `listen()` on Vercel (see
// ../src/index.ts), which is required for serverless invocation to work.
export { default } from "../src/index.js";
