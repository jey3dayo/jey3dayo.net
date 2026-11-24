# TODO

## 未対応

- [ ] `.env` から未使用の変数 `PUBLIC_SUPPORT_EMAIL`・`PUBLIC_DEFAULT_APP` を削除する（`pnpm env:decrypt` → 編集 → `pnpm env:encrypt`）
- [ ] （任意）`PUBLIC_SITE_ORIGIN` を平文にするか、現行どおり暗号化＋フォールバック運用とするか方針を確定する

## 完了済み（参考）

- [x] Astro + Cloudflare Workers Static Assets での基盤構築と `dotenvx` 運用整備
- [x] ポートフォリオ刷新（Hero / Works / About / Experience / Contact・404 ページ）
- [x] `jey3dayo.net` / `www.jey3dayo.net` へのカスタムドメイン切り替え
- [x] SEO（OGP・JSON-LD・`robots.txt`・`sitemap.xml`）および a11y / モーション対応
- [x] 未使用パッケージ `tw-animate-css` の削除
