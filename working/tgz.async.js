const compressing = require('compressing');

async function main() {
  try {
    await compressing.tar.compressDir('nodejs-compressing-demo',
      'nodejs-compressing-demo.tar');
    await compressing.gzip.compressFile('nodejs-compressing-demo.tar',
      'nodejs-compressing-demo.tgz');
    console.log('success');
  } catch (err) {
    console.error(err);
  }
  
  // 解压缩
  try {
    await compressing.gzip.uncompress('nodejs-compressing-demo.tgz',
      'nodejs-compressing-demo.tar');
    await compressing.tar.uncompress('nodejs-compressing-demo.tar',
      'nodejs-compressing-demo2');
    console.log('success');
  } catch (err) {
    console.error(err);
  }
}
