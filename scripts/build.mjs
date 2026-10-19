#!/usr/bin/env node
// Build `client.js` from `src/*.js`.
//
// The Harness Client loads one browser artifact per plugin, produced by
// `window.__ModuleLoader__.load({ id, factory })`. The sources stay plain
// ES2020 fragments in one factory scope — no bundler, no dependencies.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');

const files = readdirSync(srcDir)
  .filter((name) => name.endsWith('.js'))
  .sort();

if (!files.length) {
  console.error('no sources found in', srcDir);
  process.exit(1);
}

const body = files
  .map((name) => {
    const source = readFileSync(join(srcDir, name), 'utf8');
    return `    // ==== src/${name} ${'='.repeat(Math.max(0, 62 - name.length))}\n${source.trimEnd().replace(/^/gm, '    ')}`;
  })
  .join('\n\n');

const output = `window.__ModuleLoader__.load({
  id: 'dsh-pure-theme',
  factory(require) {
    const React = require('react');
    const { useState, useEffect, useRef, useMemo, useCallback } = React;
    const h = React.createElement;

${body}

    return plugin;
  },
});
`;

// Compile-check the artifact before writing it: a syntax error here would
// otherwise surface as a blank settings panel inside the Harness.
try {
  // eslint-disable-next-line no-new-func
  new Function(output);
} catch (error) {
  console.error('client.js failed to compile:', error.message);
  process.exit(1);
}

const outFile = process.env.DSH_PURE_THEME_OUT || join(root, 'client.js');
writeFileSync(outFile, output);
console.log(`client.js written to ${outFile} (${output.length} bytes) from ${files.length} sources`);
