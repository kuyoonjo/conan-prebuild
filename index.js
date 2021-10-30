const tar = require('tar');
const fs = require('fs');
const cp = require('child_process');

const targets = {
  x86: 'i386-pc-win32',
  x86_64: 'x86_64-pc-windows-msvc',
};

const name = process.env.build_target + '-' + process.env.build_version
const reference = process.env.build_target + '/' + process.env.build_version;

for (const arch of ['x86_64']) {
  const jsonPath = `${name}-${arch}.json`;
  const cmdInstall = [
    'conan',
    'install',
    reference + '@',
    `-s arch=${arch}`,
    '--build=missing',
    process.env[arch + '_flags'],
  ].join(' ');
  console.log(cmdInstall);
  cp.execSync(cmdInstall, { stdio: 'inherit' });

  const cmdInfo = [
    'conan',
    'info',
    reference + '@',
    `-s arch=${arch}`,
    process.env[arch + '_flags'],
    `--paths --json ${jsonPath}`,
  ].join(' ');
  console.log(cmdInfo);
  cp.execSync(cmdInfo, { stdio: 'inherit' });

  const jsonArray = JSON.parse(fs.readFileSync(jsonPath).toString());
  const json = jsonArray.find(x => x.reference === reference);
  console.log(json);
  const cwd = json.package_folder;
  const output = name + '-' + targets[arch] + '.tar.gz';
  tar.c(
    {
      gzip: true,
      cwd,
    },
    ['.']
  ).pipe(fs.createWriteStream(output));
}
