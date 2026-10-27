import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";

// Guards the CVE fix versions in package-lock.json:
//   - tinypool 2.1.1 (GHSA-5gmw-xhrv-c9v3, GHSA-85c8-ppgw-ccpr)
//   - postcss 8.5.18 (GHSA-r28c-9q8g-f849)
//   - source-map-js 1.2.2 (GHSA-68fv-2mgg-jv7q)
//   - zod 4.6.6 (GHSA-mrhx-c7xc-m3w5)
function lockedVersion(pkg: string): string {
  const lock = JSON.parse(
    readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"),
  );
  const entry = lock.packages?.[`node_modules/${pkg}`];
  expect(entry, `node_modules/${pkg} missing from lockfile`).toBeDefined();
  return entry.version;
}

describe("CVE dependency pins", () => {
  test("tinypool is fixed at 2.1.1", () => {
    expect(lockedVersion("tinypool")).toBe("2.1.1");
  });
  test("postcss is fixed at 8.5.18", () => {
    expect(lockedVersion("postcss")).toBe("8.5.18");
  });
  test("source-map-js is fixed at 1.2.2", () => {
    expect(lockedVersion("source-map-js")).toBe("1.2.2");
  });
  test("zod is fixed at 4.6.6", () => {
    expect(lockedVersion("zod")).toBe("4.6.6");
  });
});
