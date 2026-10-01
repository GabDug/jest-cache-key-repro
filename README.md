# Jest 30.5: transform cache not shared across projects

Two Jest projects with the same `@swc/jest` transform and the same `id` (so they share one transform cache directory). Both import `nanoid` from `node_modules`, which is transformed because `transformIgnorePatterns` is empty.

Since `@jest/create-cache-key-function` 30.5.0 ([#16331](https://github.com/jestjs/jest/pull/16331)), the key includes the stringified project config, which differs per project (`rootDir`, `displayName`). Each project transforms and caches the shared files again.

## Run

```sh
npm install
npm run count        # transform cache files after a cold run of both projects
```

Per project: `rm -rf .jc && npx jest --selectProjects a && find .jc -path '*jest-transform-cache-*' -type f | wc -l`

To compare with 30.4.1, add `"overrides": { "@jest/create-cache-key-function": "30.4.1" }` to `package.json`, then `rm -rf node_modules package-lock.json && npm install`.

## Result

| `@jest/create-cache-key-function` | project a | project b | a + b |
| --------------------------------- | --------- | --------- | ----- |
| 30.4.1                            | 14        | 14        | 16    |
| 30.5.1 (Jest 30.5.2)              | 14        | 14        | 24    |
