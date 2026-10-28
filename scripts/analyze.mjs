import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
const code = readFileSync('src/lib/kb/causes.ts', 'utf8');
const rules = await import('data:text/javascript;base64,' + Buffer.from(stripTypeScriptTypes(code)).toString('base64'));
const source = JSON.parse(readFileSync('src/lib/data/reports-4471.json'));
const tenants = readdirSync('src/lib/data/tenants').map(f => JSON.parse(readFileSync('src/lib/data/tenants/' + f)));
const tenantOf = r => tenants.find(t => t.handle === r.tenant);
const reports = rules.uniqueById(source).filter(r => r.mergedInto === 4471);
const groups = rules.groupByCause(reports, tenantOf);
const notes = JSON.parse(readFileSync('src/lib/data/desk-notes.json'));
const summary = { sourceRows: source.length, uniqueReports: reports.length, duplicateRows: source.length - reports.length,
  groups: groups.map(g => ({...g, reports: g.reports.map(r => r.id), oneDayMove: rules.readAs(g, notes.oneDayMove)})),
  monthly: Object.entries(Object.groupBy(reports, r => r.receivedAt.slice(0,7))).map(([month,rs])=>({month,received:rs.length})),
  mergedDays: Object.entries(Object.groupBy(reports, r=>r.mergedAt.slice(0,10))).map(([day,rs])=>({day,merged:rs.length})) };
mkdirSync('evidence', {recursive:true});writeFileSync('evidence/analysis.json',JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({...summary, groups:summary.groups.map(g=>({...g,reports:g.reports.length})), mergedDays:summary.mergedDays.filter(x=>x.merged>10)},null,2));
