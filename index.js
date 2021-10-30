const tar = require('tar');
const fs = require('fs');
const cp = require('child_process');

const targets = {
  x86: 'i386-pc-win32',
  x86_64: 'x86_64-pc-windows-msvc',
};

const gh = 'C:\\Program Files (x86)\\GitHub CLI\\gh.exe';

const name = process.env.build_target.replace(/\//g, '-');
const releaseName = process.env.build_target.split('/')[0];
const cmdCreateRelease = `"${gh}" release create ${releaseName} --notes ${releaseName}`;
console.log(cmdCreateRelease);
cp.execSync(cmdCreateRelease, { stdio: 'inherit' });

for (const arch of ['x86_64', 'x86']) {
  const jsonPath = `${name}-${arch}.json`;
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
  const output = name + '-' + targets[arch] + '.tar.gz';
  tar.c(
    {
      gzip: true,
      cwd,
    },
    ['.']
  ).pipe(fs.createWriteStream(output));
  // gh release upload

  const cmdUploadRelease = `"${gh}" release upload ${releaseName} ${output} --clobber`;
  console.log(cmdUploadRelease);
  cp.execSync(cmdUploadRelease, { stdio: 'inherit' });
}
