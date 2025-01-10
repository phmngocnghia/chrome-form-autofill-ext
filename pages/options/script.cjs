// this script reloads the extension, and open content ui when dev
var execSync = require('child_process').execSync;
var chokidar = require('chokidar');

var watcher = chokidar.watch('./src', { ignored: /^\./, persistent: true });

const reloadExtension = () => {
  console.log('reload extension page');

  execSync('open -a "Google Chrome" http://reload.extensions');
  // open the extension page after it's closed because we reload it...
  execSync('open -a "Google Chrome" chrome-extension://bhhpghgdhgenmdjephidklamakhjjnff/options/index.html');
}

watcher
  .on('add', reloadExtension)
  .on('change', reloadExtension)
  .on('unlink', reloadExtension)



process.stdin.resume();