const tar = require('tar');
const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const download = require('download');

(async () => {
  if (process.env.build_deps) {
    fs.mkdirSync('deps', { recursive: true });
    console.log('Download Deps:', process.env.build_deps);
    const deps = process.env.build_deps.split(',');
    const ps = deps.map(dep => {
      const [lib, version] = dep.split('/');
      const fileName = `${lib}-${version}-${process.env.triple}.tgz`;
      const url = `https://github.com/kuyoonjo/conan-prebuild/releases/download/${lib}/${fileName}`;
      console.log('Downloading', fileName, '...');
      await download(url, 'deps');
      await tar.x(
        {
          file: `deps/${fileName}`,
          cwd: 'deps',
        },
      );
    });
    await Promise.all(ps);
  }

  const cmdBuild = [
    'cmake',
    '-B build repo',
    '-DCMAKE_TOOLCHAIN_FILE=' + process.env.triple + '.cmake',
    '-DCMAKE_INSTALL_PREFIX=' + path.relative(path.join(__dirname, process.env.build_output_basename + '.tgz')),
    process.env.build_flags,
    //  -DBUILD_SHARED_LIBS=OFF -DCMAKE_INSTALL_PREFIX=$PWD/install -DCMAKE_USE_LIBSSH2=ON -DCMAKE_PREFIX_PATH=/Users/yu/Downloads/libssh2-1.10.0-aarch64-linux-gnu;/Users/yu/Downloads/zlib-1.2.11-aarch64-linux-gnu
  ].join(' ');
  console.log(cmdInstall);
  cp.execSync(cmdInstall, { stdio: 'inherit' });
})();

// const reference = process.env.build_target + '/' + process.env.build_version;

// const jsonPath = `${process.env.build_output_basename}.json`;
// const cmdInstall = [
//   'conan',
//   'install',
//   reference + '@',
//   '--build=missing',
//   process.env.build_flags,
// ].join(' ');
// console.log(cmdInstall);
// cp.execSync(cmdInstall, { stdio: 'inherit' });

// const cmdInfo = [
//   'conan',
//   'info',
//   reference + '@',
//   process.env.build_flags,
//   `--paths --json ${jsonPath}`,
// ].join(' ');
// console.log(cmdInfo);
// cp.execSync(cmdInfo, { stdio: 'inherit' });

// const jsonArray = JSON.parse(fs.readFileSync(jsonPath).toString());
// const json = jsonArray.find(x => x.reference === reference);
// console.log(json);
// const cwd = json.package_folder;
// const output = process.env.build_output_basename + '.tgz';
// tar.c(
//   {
//     gzip: true,
//     cwd,
//   },
//   ['.']
// ).pipe(fs.createWriteStream(output));

