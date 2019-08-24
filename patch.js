// Allow angular use native node modules
const fs = require('fs');
const file = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  const result = data.replace(/node: false,\r?\n/g, 'node: false,\n        target: \'electron-renderer\',\n');

  fs.writeFile(file, result,'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
  });
});
