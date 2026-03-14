import { spawnSync } from "node:child_process";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn("[build] DATABASE_URL is not set. Skipping prisma migrate deploy.");
  process.exit(0);
}

const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  env: process.env,
});

if (result.error) {
  console.warn(
    `[build] prisma migrate deploy could not run: ${result.error.message}. Continuing build.`,
  );
  process.exit(0);
}

if (typeof result.status === "number" && result.status !== 0) {
  console.warn(
    `[build] prisma migrate deploy exited with status ${result.status}. Continuing build.`,
  );
  process.exit(0);
}
