const cp = require('child_process');

try {
  cp.execSync(`refreshenv && gh release create ${process.env.build_target} --notes "${process.env.build_target}"`, {
    stdio: 'inherit',
  });
} catch { }