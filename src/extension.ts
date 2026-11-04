// LSP client for rokls. Highlighting is the TextMate grammar; every other
// feature, including the `rok.add` quick-fix command, is plain LSP.
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
