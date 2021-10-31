const fs = require('fs');
const crypto = require('crypto');

const filePath = process.env.build_output_basename + '.tgz';;
const sha1sum = crypto.createHash('sha1');
const file = fs.createReadStream(filePath);
file.addListener('data', function (data) {
  sha1sum.update(data);
});
file.addListener('close', function () {
  const res = sha1sum.digest('hex');
  const output = process.env.build_output_basename + '.sha1sum.txt';
  fs.writeFileSync(output, res);
});