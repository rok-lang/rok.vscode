# Contributing to rok.vscode

The VS Code extension for Rok: syntax, language configuration, and an LSP
client for `rokls`.

## Development

Run `npm ci`, open the folder in VS Code, and launch the extension with F5.
The LSP needs `rokls` on your `PATH` (install Rok). `npm run compile`
type-checks and bundles `src/` into `out/extension.js`; `npm run package`
builds the `.vsix`.

## Submitting

Open a pull request against `main`. By contributing you agree that your work is
licensed under both MIT and Apache-2.0, the project's dual license.

## Releasing

The extension is published as `rok-lang.rok` to the
[VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=rok-lang.rok)
and [Open VSX](https://open-vsx.org/extension/rok-lang/rok). Its version is
independent of the Rok toolchain.

1. Bump `version` in `package.json` (`npm version X.Y.Z --no-git-tag-version`
   keeps `package-lock.json` in step) and add an `## X.Y.Z` entry to
   `CHANGELOG.md`. Commit on `main`.
2. Tag and push:

   ```sh
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

`.github/workflows/release.yml` then builds, checks the grammars against
rok-syntax, packages `rok-X.Y.Z.vsix`, publishes it to both registries and
attaches it to a GitHub release for the tag. The tag must match
`package.json`.

### One-time setup

- VS Code Marketplace: a publisher `rok-lang`
  (<https://marketplace.visualstudio.com/manage>) with a trusted publishing
  policy for GitHub Actions: owner `rok-lang`, repository `rok.vscode`,
  workflow `release.yml`, no environment. No secret is stored; the workflow
  publishes with `vsce publish --oidc`.
- Open VSX: an account at <https://open-vsx.org> (sign in with GitHub, sign
  the publisher agreement), the namespace `rok-lang`, and a trusted
  publisher on it for GitHub: repository `rok-lang/rok.vscode`, workflow
  `release.yml`, no environment. Open VSX accepts a trusted publisher
  only from a namespace owner and only for an extension that already has a
  version, so the first version goes out with an access token stored as
  `OVSX_PAT`; delete the secret once the trusted publisher is registered.

If a release stops halfway, run the workflow by hand from main
(Actions, release, Run workflow) with the tag; versions already published
are skipped and the `.vsix` on the GitHub release is replaced.
