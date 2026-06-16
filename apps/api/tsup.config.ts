import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  clean: true,
  sourcemap: true,
  // Bundle the workspace packages (they ship raw TypeScript from src)...
  noExternal: [/^@repo\//],
  // ...but keep Prisma's runtime external — it relies on generated client
  // files and native engines that must stay resolvable from node_modules.
  external: ["@prisma/client", ".prisma/client"],
});
