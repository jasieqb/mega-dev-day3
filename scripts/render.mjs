import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import { renderPages } from '../.build/entry.js';
for (const page of renderPages()) {
 const path = 'rendered/' + page.path;
 page.body = page.body.replace(/href="(\/kb[^"#]*)(#[^"]*)?"/g, (_, route, hash = '') => {
 const target = 'rendered' + route + '/index.html';
 return 'href="' + relative(dirname(path), target) + hash + '"';
 });
 mkdirSync(dirname(path), {recursive:true});
 // Svelte's SSR CSS is returned in head when css=injected.
 writeFileSync(path, '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + page.head + '</head><body>' + page.body + '</body></html>\n');
 console.log(path);
}

copyFileSync('src/routes/kb/incidents/4471-review/+page.svx', '4471-review.svx');
copyFileSync('rendered/kb/incidents/4471-review/index.html', '4471-review.html');
let rootHtml = (await import('node:fs')).readFileSync('4471-review.html', 'utf8');
rootHtml = rootHtml.replace(/href="(?!https?:|#)([^"]+)"/g, (_, href) => 'href="' + new URL(href, 'https://local.invalid/rendered/kb/incidents/4471-review/').pathname.slice(1) + '"');
writeFileSync('4471-review.html', rootHtml);
