const tar = require('tar');
const fs = require('fs');
const cp = require('child_process');

if (process.env.build_deps) {
  console.log('Build Deps:', process.env.build_deps);
  const deps = process.env.build_deps.split(',');
  for (const dep of deps) {
    const cmdInstall = [
      'conan',
      'install',
      dep + '@',
      '--build=missing',
      process.env.build_flags,
    ].join(' ');
    console.log(cmdInstall);
    cp.execSync(cmdInstall, { stdio: 'inherit' });
  }
}

const reference = process.env.build_target + '/' + process.env.build_version;

const jsonPath = `${process.env.build_output_basename}.json`;
const cmdInstall = [
  'conan',
  'install',
  reference + '@',
  '--build=missing',
  process.env.build_flags,
].join(' ');
console.log(cmdInstall);
cp.execSync(cmdInstall, { stdio: 'inherit' });

const cmdInfo = [
  'conan',
  'info',
  reference + '@',
  process.env.build_flags,
  `--paths --json ${jsonPath}`,
].join(' ');
console.log(cmdInfo);
cp.execSync(cmdInfo, { stdio: 'inherit' });

const jsonArray = JSON.parse(fs.readFileSync(jsonPath).toString());
const json = jsonArray.find(x => x.reference === reference);
console.log(json);
const cwd = json.package_folder;
const output = process.env.build_output_basename + '.tgz';
tar.c(
  {
    gzip: true,
    cwd,
  },
  ['.']
).pipe(fs.createWriteStream(output));

