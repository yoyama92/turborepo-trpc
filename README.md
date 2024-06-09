# Turborepo tRPC

Turborepoで作成したモノレポのアプリケーションにtRPCを適用したサンプルアプリケーション。

## 起動方法

```bash
npm run dev
```

## 構成

```
.
├── apps
│   ├── api ... バックエンドのAPIアプリケーション 
│   └── web ... フロントエンドのWEBアプリケーション
└── packages
    ├── api ... tRPCのAPI定義
    ├── typescript-config ...tsconfig
    └── ui ... 共通UI※テンプレートでフロントのアプリケーションが2つだった名残
```

## tRPC

`apps` 配下の両方から参照する必要があるため、`packages/api` で定義して、`packages/api` を `apps` 配下のアプリケーションが参照する。そのため、`apps/api` ではアプリケーションの起動設定とtRPCの読み込みのみ行う。

## 認証

認証機能にはNextAuthを採用している。

* tRPCでの認可に用いるためにフロントエンドから呼び出す際は `middleware` で認証情報をヘッダーに付与してからrewriteする。
* Server Componentから呼び出すときは直接バックエンドのURLを指定するので、Client Componentと tRPC のクライアントを分けている。


---
以下、テンプレートまま

# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
