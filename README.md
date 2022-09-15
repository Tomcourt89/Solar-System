# Solar-System
# Tom Court
Solar system project built in three.js

This repository contains all the necessary dependencies to run the application on a local machine.
to run the application locally type the command:

npm run dev

Should this not work check you have the correct files as in the git repository.

Alternatively you can view the live hosted version of the application at https://comforting-biscochitos-09fc05.netlify.app/



Should none of these options work then you can reinstall all of the node modules as I did when first creating the project.

on the command line:

npm install -g typescript
npm install three --save-dev
npm install @types/three --save-dev
npm install typescript --save-dev

This should install typescript globally and also within the root file as well as creating the necessary modules for Three.js and the types required to run it.
Additionally on the command line:

npm install webpack webpack-cli webpack-dev-server webpack-merge ts-loader --save-dev

This will install the necessary files for the webpack to launch the typescript file.

the package.json file will also need its scripts updating if the one from my repository is not correct.

It should look like this:

{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config ./src/client/webpack.prod.js",
    "dev": "webpack serve --config ./src/client/webpack.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/dat.gui": "^0.7.7",
    "@types/three": "^0.140.0",
    "dat.gui": "^0.7.9",
    "three": "^0.140.2",
    "ts-loader": "^9.3.0",
    "typescript": "^4.6.4",
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.9.0",
    "webpack-merge": "^5.8.0"
  }
}
