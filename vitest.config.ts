import { defineConfig } from "vitest/config";
import { configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    exclude: [...configDefaults.exclude, "e2e/**"],
    // Provide dummy env vars so modules that read them at import time don't throw
    env: {
      NEXT_PUBLIC_SUPABASE_URL: "http://localhost:54321",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
      SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
      EMAIL_SMTP_HOST: "127.0.0.1",
      EMAIL_SMTP_PORT: "54325",
    },
  },
});
