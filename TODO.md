# TODO

## Done

- [x] Astro static scaffold is in place
- [x] `dotenvx` scripts and `.env.keys` flow are set up
- [x] `pnpm run build` passes
- [x] `pnpm run cf:deploy:dry-run` passes
- [x] Real Cloudflare deploy is finished on `apps-site.j138cm.workers.dev`
- [x] Decide Cloudflare auth mode for deploy
  - Chosen: shared `dotenvx` key + encrypted Cloudflare token/account values
- [x] Fix `.env` so Wrangler does not receive empty or malformed Cloudflare auth values
- [x] Run `pnpm exec wrangler whoami` and confirm authentication works
- [x] Run `pnpm run cf:deploy`
- [x] Confirm the Worker is created successfully in Cloudflare
- [x] Attach `apps.jey3dayo.net` or the intended route to the Worker
- [x] Open the deployed URL and verify the top page responds
- [x] Add crawl/share metadata support in the shared layout
- [x] Add `robots.txt` and `sitemap.xml`

## Next

- [ ] Clean up the unused `.env` variables `PUBLIC_SUPPORT_EMAIL` and `PUBLIC_DEFAULT_APP` (`pnpm env:decrypt`, edit, then `pnpm env:encrypt`)
- [ ] Remove the now-unused `tw-animate-css` from devDependencies
