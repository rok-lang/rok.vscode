// Starts the Rok language server (rokls) as an LSP client for .rok files.
// Highlighting comes from the TextMate grammar; everything else (hover,
// completion, go-to-definition, references, rename, symbols, formatting,
// signature help, quick fixes and their `rok.add` command) comes from the
// server, which the client handles without extra code here.
import { workspace, ExtensionContext, window } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: ExtensionContext) {
  const cfg = workspace.getConfiguration("rok");
  if (!cfg.get<boolean>("server.enable", true)) return;

  const command = cfg.get<string>("server.path", "rokls");
  const server: ServerOptions = {
    run: { command, transport: TransportKind.stdio },
    debug: { command, transport: TransportKind.stdio },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "rok" }],
    synchronize: { fileEvents: workspace.createFileSystemWatcher("**/*.rok") },
  };

  client = new LanguageClient("rok", "Rok language server", server, clientOptions);
  client.start().catch((e) => {
    window.showWarningMessage(
      `Rok: could not start the language server (${command}). ` +
        `Install the toolchain, or set "rok.server.path". Highlighting still works. ${e}`
    );
  });
}

export function deactivate(): Thenable<void> | undefined {
  return client?.stop();
}
