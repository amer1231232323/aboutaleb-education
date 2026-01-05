const fs = require('fs');
const path = require('path');

function findCssFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) results = results.concat(findCssFiles(full));
    else if (item.isFile() && full.endsWith('.css')) results.push(full);
  }
  return results;
}

const files = findCssFiles(path.join(__dirname, '..', 'src'));
if (!files.length) {
  console.log('No CSS files found in src/');
  process.exit(0);
}

let hadIssue = false;
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8');
  const openBrace = (text.match(/\{/g) || []).length;
  const closeBrace = (text.match(/\}/g) || []).length;
  const openParen = (text.match(/\(/g) || []).length;
  const closeParen = (text.match(/\)/g) || []).length;
  const colons = (text.match(/:/g) || []).length;
  const semis = (text.match(/;/g) || []).length;

  if (openBrace !== closeBrace || openParen !== closeParen) {
    hadIssue = true;
    console.log(`SYNTAX ISSUE: ${f}`);
    console.log(`  { ${openBrace}  } ${closeBrace}   ( ${openParen} ) ${closeParen}`);
    console.log('  First 20 lines:\n' + text.split('\n').slice(0,20).join('\n'));
    console.log('---');
  } else {
    console.log(`OK: ${f}  ({${openBrace}} parens(${openParen}/${closeParen}) colons:${colons} semicolons:${semis})`);
  }
}

if (!hadIssue) console.log('No unmatched braces/parens found.');
