const tar = require('tar');
const fs = require('fs');
const cp = require('child_process');

const targets = {
  x86: 'i386-pc-win32',
  x86_64: 'x86_64-pc-windows-msvc',
};

for (const arch of ['x86_64', 'x86']) {
  const jsonPath = `${process.env.build_target}-${arch}.json`;
  const cmdInstall = [
    'conan',
    'install',
    process.env.build_target + '@',
    `-s arch=${arch}`,
    '--build=missing',
    process.env[arch + '_flags'],
  ].join(' ');
  console.log(cmdInstall);
  cp.execSync(cmdInstall, { stdio: 'inherit' });

  const cmdInfo = [
    'conan',
    'info',
    process.env.build_target + '@',
    `-s arch=${arch}`,
    process.env[arch + '_flags'],
    `--paths --json ${jsonPath}`,
  ].join(' ');
  console.log(cmdInfo);
  cp.execSync(cmdInfo, { stdio: 'inherit' });

  const jsonArray = JSON.parse(fs.readFileSync(jsonPath).toString());
  const json = jsonArray.find(x => x.reference === process.env.build_target);
  console.log(json);
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
