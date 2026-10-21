# rok for Visual Studio Code

Syntax highlighting for `.rok` and `.rokon`, and the rok language server
(`rokls`) for hover, completion, go-to-definition, find-references,
rename, document symbols, formatting, and semantic highlighting of user-defined constructs the static grammar
cannot know - macro calls, literal suffixes, keywords, operators,
derives and attributes.

## Requirements

The rok toolchain, so `rokls` is on your `PATH` (install from
<https://rok-lang.org/download.html>). If it lives elsewhere, set
`rok.server.path`. Turn the server off with `rok.server.enable: false`
(highlighting still works).

## Build

```sh
npm install
npm run compile
npx vsce package   # -> rok-0.1.0.vsix; install with: code --install-extension rok-0.1.0.vsix
```

## License

Licensed under either of [MIT](LICENSE-MIT) or [Apache-2.0](LICENSE-APACHE), at your option.
