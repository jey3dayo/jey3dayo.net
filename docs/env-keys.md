# `.env.keys` と 1Password の運用

このリポジトリでは、機密情報を含む `.env` を `dotenvx` で暗号化してコミットし、復号鍵である `.env.keys` はローカル専用（Git 管理外）としています。

`DOTENV_PRIVATE_KEY` が利用できない環境（Fork や Dependabot の PR など）でも、`PUBLIC_SITE_ORIGIN` が未設定または未復号（`encrypted:`）の場合は `config/resolve-site-origin.mjs` がデフォルト値（`https://jey3dayo.net`）へフォールバックするため、静的サイトのビルド自体は通る設計です。

## 1Password の保管場所

このリポジトリに対応する正規の 1Password ドキュメントは次のとおりです（前身リポジトリ名のまま維持しています）。

- Vault: `Dotfiles Automation`
- タイトル: `.env.keys | apps-site`

`dotfiles` リポジトリ用の `.env.keys | dotfiles` とは別管理です。作業時に誤って上書き・リネームしないでください。

## 復元手順

新しいマシンやシェルで `.env.keys` を復元する手順です。

1. 1Password の `Dotfiles Automation` ボールトから `.env.keys | apps-site` を取得する。
2. リポジトリ直下に `.env.keys` として保存する。
3. `.env` を編集する前に `pnpm env:decrypt` を実行する。
4. 編集が終わったら `pnpm env:encrypt` で再暗号化する。

## 更新手順

このリポジトリ用に `.env.keys` を再生成した場合の手順です。

1. 既存の 1Password ドキュメント `.env.keys | apps-site` を更新する。
2. 同名のアクティブなドキュメントを重複作成しない。
3. 更新後、保存されたドキュメントを再取得できることを確認する。
4. GitHub Actions のシークレット `DOTENV_PRIVATE_KEY` も必要に応じて更新する。

## セキュリティ上の注意

- `.env.keys` の内容をチャット、ドキュメント、コミットメッセージ、シェル履歴に貼り付けない。
- `DOTENV_PRIVATE_KEY` を要約・転記してリポジトリ内ドキュメントへ記載しない。
- `.env.keys` はバージョン管理およびデプロイバンドルに含めない。
