import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    rules: {
      // Preserve the original images' intrinsic sizing and CSS layout.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", ".tmp/**", ".cache/**", "next-env.d.ts"]),
]);
