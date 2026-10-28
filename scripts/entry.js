import { render } from 'svelte/server';
const pages = import.meta.glob('/src/routes/kb/**/+page.svx', {eager:true});
export function renderPages() {
 return Object.entries(pages).map(([path, mod]) => { const result = render(mod.default); return ({
   path: path.replace('/src/routes/', '').replace('/+page.svx','/index.html'),
   body: result.body, head: result.head,
 }); });
}
