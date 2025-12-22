import typescript from "@rollup/plugin-typescript";
import { createFilter } from "@rollup/pluginutils";
// import pkg from './package.json' with { type: 'json' };

function createRawImportPlugin(include: string) {
  const rawFilter = createFilter(include);

  return {
    name: "raw-import",

    transform(code: string, id: string): any {
      if (rawFilter(id)) {
        return {
          code: `export default ${JSON.stringify(code)};`,
          map: { mappings: "" },
        };
      }
    },
  };
}

export default {
  input: "src/index.ts",
  output: {
    // file: pkg.module,
    file: "dist/index.js",
    format: "esm",
    sourcemap: true,
  },
  watch: {
    include: "src/**",
  },
  external: ["ejs"],
  plugins: [typescript(), createRawImportPlugin("**/templates/**")],
};
