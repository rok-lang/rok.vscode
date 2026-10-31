# Rok for Visual Studio Code

Rok language support for Visual Studio Code: syntax highlighting for `.rok`
and `.rokon`, plus the rok language server `rokls` for hover, completion,
go-to-definition, references, rename, symbols, formatting, semantic
highlighting, signature help, and quick fixes (including `rok add` for a
missing stone).

## Requirements

The rok toolchain, so `rokls` is on your `PATH` (install from
<https://rok-lang.org/download.html>). If it lives elsewhere, set
`rok.server.path`. Turn the server off with `rok.server.enable: false`
(highlighting still works).

## Grammars

`syntaxes/rok.tmLanguage.json` (`source.rok`) and
`syntaxes/rokon.tmLanguage.json` (`source.rokon`) are copies of the
grammars in [rok-syntax](https://github.com/rok-lang/rok-syntax), at the
commit in `rok-syntax.rev`. Change them there, then sync:

```sh
node scripts/sync-grammar.mjs --from ../rok-syntax   # copy from a checkout, pin its HEAD
node scripts/sync-grammar.mjs                       # fetch at the pinned commit
node scripts/sync-grammar.mjs --check               # what CI runs
```

`r#match` is one word for double-click and word motions.

## Build

```sh
npm install
npm run compile
npx vsce package   # -> rok-0.1.0.vsix; install with: code --install-extension rok-0.1.0.vsix
```

## License

Licensed under either of [MIT](LICENSE-MIT) or [Apache-2.0](LICENSE-APACHE), at your option.
