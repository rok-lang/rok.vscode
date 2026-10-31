// Copies the TextMate grammars of rok-syntax into syntaxes/.
//
//   node scripts/sync-grammar.mjs                  fetch them at the commit in rok-syntax.rev
//   node scripts/sync-grammar.mjs --from DIR       copy them from a rok-syntax checkout, pin its HEAD
//   node scripts/sync-grammar.mjs --check [--from DIR]
//                                                  fail if syntaxes/ differs from the source
//
// syntaxes/ is never edited by hand: change the grammars in rok-syntax,
// then sync.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const revFile = path.join(root, "rok-syntax.rev");
const files = ["rok.tmLanguage.json", "rokon.tmLanguage.json"];

const args = process.argv.slice(2);
const check = args.includes("--check");
const at = args.indexOf("--from");
const from = at >= 0 ? path.resolve(args[at + 1] ?? "") : null;

async function source(name) {
  if (from) return fs.readFileSync(path.join(from, "grammars", name), "utf8");
  const rev = fs.readFileSync(revFile, "utf8").trim();
  const url = `https://raw.githubusercontent.com/rok-lang/rok-syntax/${rev}/grammars/${name}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: ${r.status} ${r.statusText}`);
  return r.text();
}

let differ = 0;
for (const name of files) {
  const want = await source(name);
  const dest = path.join(root, "syntaxes", name);
  const have = fs.existsSync(dest) ? fs.readFileSync(dest, "utf8") : null;
  if (check) {
    if (have !== want) {
      console.log(`syntaxes/${name} differs from rok-syntax; run node scripts/sync-grammar.mjs`);
      differ++;
    }
  } else if (have !== want) {
    fs.writeFileSync(dest, want);
    console.log(`syntaxes/${name} updated`);
  }
}

if (from && !check) {
  const git = (...a) => execFileSync("git", ["-C", from, ...a], { encoding: "utf8" }).trim();
  if (git("status", "--porcelain", "grammars")) console.log(`warning: ${from}/grammars has uncommitted changes`);
  fs.writeFileSync(revFile, git("rev-parse", "HEAD") + "\n");
  console.log(`rok-syntax.rev: ${fs.readFileSync(revFile, "utf8").trim()}`);
}
process.exit(differ ? 1 : 0);
