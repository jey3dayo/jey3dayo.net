# jey3dayo.net

Astro と Cloudflare Workers Static Assets で構築した個人ポートフォリオサイトです。

## 技術スタック

- **フレームワーク**: Astro（静的出力 / Content Collections / MDX）
- **UI**: Tailwind CSS v4 / React / shadcn/ui / Lucide Icons
- **デプロイ**: Cloudflare Workers Static Assets（Wrangler）
- **環境変数**: dotenvx（暗号化した `.env` をリポジトリ管理）
- **開発ツール / 品質管理**: mise / pnpm / Biome / TypeScript / markdownlint-cli2 / yamllint / gh-actions-lock

## ルート構成

- `/` - ポートフォリオ（Hero / Works / About / Experience / Contact）
- `/404` - 404 ページ（`404.html` として配信）
- `/robots.txt` - クローラー向け制御
- `/sitemap.xml` - サイトマップ

> [!NOTE]
> 検索エンジンのインデックス許可は本番オリジン（`https://jey3dayo.net`）のみです。それ以外のオリジンでは自動的に `noindex` が付与されます（`src/lib/site-indexing.ts`）。

## コンテンツの更新箇所

| セクション | 編集対象 |
| --- | --- |
| Works（制作物） | `src/content/works/*.mdx` |
| Experience（経歴） | `src/content/experience.yaml` |
| About（`whoami.json`） | `src/data/whoami.json` |
| SNS リンク | `src/data/sns.ts` |

スキーマ定義は `src/content.config.ts` にあります。

## セットアップ

```bash
mise install
pnpm install
```

ローカルで暗号化済みの環境変数（Cloudflare 認証情報など）を扱う場合は、`.env.keys` をローカルに配置してください。`.env.keys` の復元・更新手順は [docs/env-keys.md](docs/env-keys.md) を参照してください。

`.env` を編集するときは復号してから作業し、完了後に必ず再暗号化します。

```bash
pnpm env:decrypt
# .env を編集
pnpm env:encrypt
```

## 主なコマンド

### 開発・デプロイ（pnpm）

- `pnpm dev` - `dotenvx` 経由で Astro 開発サーバーを起動
- `pnpm build` - 静的サイトをビルド
- `pnpm preview` - ビルド後、Astro のローカルプレビューを起動
- `pnpm cf:dev` - ビルド後、Wrangler でローカル確認
- `pnpm cf:deploy` - Cloudflare Workers へデプロイ
- `pnpm cf:deploy:dry-run` - 公開せずに Wrangler のバンドル・設定を検証
- `pnpm deploy` - `build` と `cf:deploy` を連続実行
- `pnpm check` - `build` と `cf:deploy:dry-run` を連続実行
- `pnpm lint` - Biome で lint チェック
- `pnpm format` - Biome で自動整形
- `pnpm env:encrypt` - `.env` を暗号化
- `pnpm env:decrypt` - `.env` を編集用に復号
- `pnpm env:run -- <cmd>` - `dotenvx` 経由で任意のコマンドを実行

### 品質チェック・運用タスク（mise）

日常的なチェックは `mise.toml` にまとめています。

- `mise run format` - Biome と markdownlint で自動整形
- `mise run lint` - 型チェック / Biome / Markdown / YAML をまとめて検証
- `mise run check:quick` - 型チェックと Biome のみ高速実行
- `mise run check` - 整形 + lint + ビルド + Cloudflare dry-run
- `mise run ci` - CI と同等の検証（lint + ビルド + Cloudflare dry-run）
- `mise run cf:whoami` - `dotenvx` 経由で Cloudflare の認証状態を確認
- `mise run actions-lock:generate` - `.github/workflows/actions.lock` を再生成・検証
- `mise run actions-lock:verify` - `actions.lock` の整合性を検証
- `mise run deploy` - ビルドして Cloudflare Workers へデプロイ

## 環境変数

- コミット対象: `.env`（`dotenvx` で管理）
- ローカル専用（Git 管理外）: `.env.keys`

1Password 上の対応ドキュメントは `Dotfiles Automation` ボールト内の `.env.keys | apps-site` です（`.env.keys | dotfiles` とは別管理）。詳細は [docs/env-keys.md](docs/env-keys.md) を参照してください。

現在の定義変数:

- `PUBLIC_SITE_ORIGIN` - サイトオリジン（現在 `.env` では暗号化。未設定・復号不可時は `https://jey3dayo.net` にフォールバック）
- `PUBLIC_SUPPORT_EMAIL` - 未使用（`.env` からの整理予定）
- `PUBLIC_DEFAULT_APP` - 未使用（`.env` からの整理予定）
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare アカウント ID（暗号化）
- `CLOUDFLARE_API_TOKEN` - Cloudflare API トークン（暗号化）

ローカル実行時は `dotenvx run` が `.env.keys` を自動で読み込みます。CI やリモートデプロイでは、`.env.keys` 内の `DOTENV_PRIVATE_KEY` をシークレットとして渡してください。

## Cloudflare デプロイ

`wrangler.jsonc` の設定により、Astro が出力する `dist/` を Cloudflare Workers Static Assets として配信します（Worker 名は互換性のため `apps-site` を継続利用）。

カスタムドメイン:

- `jey3dayo.net`
- `www.jey3dayo.net`
- `apps.jey3dayo.net`

静的配信専用のため、Worker エントリポイント・DB・認証レイヤーは持っていません。

## GitHub Actions

利用するワークフロー:

- `checks.yml` - `push`（`main` / `codex/**`）および PR で `actions-lock:verify` と `mise run ci` を実行
- `deploy.yml` - `main` への `push` および手動実行（`workflow_dispatch`）で `mise run ci` 後にデプロイ
- `pr-insights-labeler.yml` - PR の規模・種別ラベルを自動付与

必要なリポジトリシークレット:

- `DOTENV_PRIVATE_KEY`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

> [!NOTE]
> Fork や Dependabot からの PR など `DOTENV_PRIVATE_KEY` が渡らない環境でも、`PUBLIC_SITE_ORIGIN` はデフォルト値にフォールバックするため静的ビルドは通ります。
