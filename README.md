<img src="https://raw.githubusercontent.com/rok-lang/web/main/assets/rok-transparent-512.png" alt="Rok" width="96">

# Rok for Visual Studio Code

Rok language support: syntax highlighting for `.rok` and `.rokon`, and the
Rok language server `rokls`.

## Features

- Syntax highlighting from the [rok-syntax](https://github.com/rok-lang/rok-syntax)
  grammars.
- From `rokls`, over LSP:
  - diagnostics
  - hover
  - completion
  - go to definition
  - find references
  - rename
  - document symbols
  - formatting
  - semantic highlighting
  - signature help
  - quick fixes, including `rok add` for a missing stone

## Requirements

Install Rok so `rokls` is on your `PATH`.

Linux and macOS:

```sh
curl -fsSL https://rok-lang.org/install.sh | sh
```

Windows (PowerShell):

```powershell
powershell -ExecutionPolicy Bypass -c "irm https://rok-lang.org/install.ps1 | iex"
```

More at <https://rok-lang.org/download>. Without `rokls` you still get
highlighting.

## Settings

| Setting             | Default | Description                                       |
| ------------------- | ------- | ------------------------------------------------- |
| `rok.server.path`   | `rokls` | Path to `rokls`, if it is not on `PATH`.          |
| `rok.server.enable` | `true`  | Run the language server. Off: highlighting only.  |

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

Node 22 or newer.

```sh
npm ci
npm run compile    # type-check, bundle into out/extension.js
npm run package    # -> rok-<version>.vsix
code --install-extension rok-<version>.vsix
```

Releasing is in [CONTRIBUTING.md](https://github.com/rok-lang/rok.vscode/blob/main/CONTRIBUTING.md).

## License

Licensed under either of
[MIT](https://github.com/rok-lang/rok.vscode/blob/main/LICENSE-MIT) or
[Apache-2.0](https://github.com/rok-lang/rok.vscode/blob/main/LICENSE-APACHE),
at your option.
