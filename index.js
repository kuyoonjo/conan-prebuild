const tar = require('tar');
const fs = require('fs');
const cp = require('child_process');

const targets = {
  x86: 'i386-pc-win32',
  x86_64: 'x86_64-pc-windows-msvc',
};

let name = process.env.build_target + '-' + process.env.build_version
if (process.env.name_suffix)
  name += '-' + process.env.name_suffix;
const reference = process.env.build_target + '/' + process.env.build_version;

for (const arch of ['x86_64', 'x86']) {
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
