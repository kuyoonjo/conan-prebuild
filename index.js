const tar = require('tar');
const fs = require('fs');

const targets = {
  x86: 'i386-pc-win32',
  x64: 'x86_64-pc-windows-msvc',
};

for (const arch of ['x86', 'x64']) {
  const json = JSON.parse(fs.readFileSync(arch + '.json').toString());
  const cwd = json.package_folder;
  const name = json.reference.replace(/\//g, '-');
  tar.c(
    {
      gzip: true,
      cwd,
    },
    ['.']
  ).pipe(fs.createWriteStream(name + '-' + targets[arch] + '.tar.gz'));
}
