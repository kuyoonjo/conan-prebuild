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
    const ps = deps.map(async dep => {
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

  const outputDir = path.resolve(path.join(__dirname, process.env.build_output_basename));

  const cmdConfig = [
    'cmake',
    '-B build .',
    '-DCMAKE_TOOLCHAIN_FILE=../' + process.env.triple + '.cmake',
    '-DCMAKE_INSTALL_PREFIX=' + outputDir,
    '-DCMAKE_PREFIX_PATH=' + path.resolve(path.join(__dirname, 'deps')),
    process.env.build_flags,
    //  -DBUILD_SHARED_LIBS=OFF -DCMAKE_INSTALL_PREFIX=$PWD/install -DCMAKE_USE_LIBSSH2=ON -DCMAKE_PREFIX_PATH=/Users/yu/Downloads/libssh2-1.10.0-aarch64-linux-gnu;/Users/yu/Downloads/zlib-1.2.11-aarch64-linux-gnu
  ].join(' ');
  console.log(cmdConfig);
  cp.execSync(cmdConfig, { stdio: 'inherit', cwd: 'repo' });

  const cmdBuild = [
    'cmake --build build && cmake --build build --target install',
  ].join(' ');
  console.log(cmdBuild);
  cp.execSync(cmdBuild, { stdio: 'inherit', cwd: 'repo' });

  const output = process.env.build_output_basename + '.tgz';
  tar.c(
    {
      gzip: true,
      cwd: outputDir,
    },
    ['.']
  ).pipe(fs.createWriteStream(output));
})();
