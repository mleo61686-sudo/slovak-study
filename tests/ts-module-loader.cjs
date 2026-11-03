/** Minimal CommonJS TypeScript loader for isolated content smoke tests. */
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function loadTS(file) {
  const id = path.resolve(file);
  if (cache.has(id)) return cache.get(id).exports;
  const mod = { exports: {} };
  cache.set(id, mod);
  const js = ts.transpileModule(fs.readFileSync(id, 'utf8'), {
    fileName: id, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const req = name => name.startsWith('.') ? loadTS(path.resolve(path.dirname(id), name) + (path.extname(name) ? '' : '.ts')) : require(name);
  new Function('require', 'module', 'exports', js)(req, mod, mod.exports);
  return mod.exports;
}
module.exports = { loadTS };
