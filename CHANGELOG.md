# Changelog

## 0.2.0

For Rok 0.2. Rok 0.1 is no longer supported.

- Syntax highlighting for the Rok 0.2 syntax, from rok-syntax 740423a:
  `**`, `**=`, `.**`, `.??`, `.=` and `.op=`, `!in`, byte chars
  `b'0'`, `some` before a bound, `return@each`.
- Reserved keywords `macro`, `defer`, `dyn`, `move`, `gen` and `do`.

## 0.1.0

First release.

- Syntax highlighting for `.rok` and `.rokon`, from rok-syntax.
- LSP client for `rokls`: diagnostics, hover, completion, go to
  definition, references, rename, symbols, formatting, semantic
  highlighting, signature help, quick fixes.
- Settings `rok.server.path` and `rok.server.enable`.
