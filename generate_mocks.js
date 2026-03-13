const fs = require('fs');
const path = require('path');

const baseDir = process.cwd();
const dataDir = path.join(baseDir, 'resources/js/data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Write the original JSON file directly as a TS constant export
const munStr = fs.readFileSync(path.join(baseDir, 'database/data/DataMunicipality.json'), 'utf8');
fs.writeFileSync(path.join(dataDir, 'municipalityMock.ts'), `export const MUNICIPALITIES = ${munStr};\n`);

const parStr = fs.readFileSync(path.join(baseDir, 'database/data/DataParishs.json'), 'utf8');
fs.writeFileSync(path.join(dataDir, 'parishMock.ts'), `export const PARISHES = ${parStr};\n`);

console.log("Mock files generated successfully in resources/js/data");
