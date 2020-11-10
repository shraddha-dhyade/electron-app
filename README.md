# Electron App

This application takes two input numbers and displays the output sum on clicking add button.
This application is developed using Electron and python.


# Project Description
The file structure of the project folder is as follows:
```text

|-- index.html
|-- main.js
|-- package.json
|-- render.js
|
|-- pyadd
|   |-- api.py
|   |-- add.py
|-- test
|   |-- spec.js
|
|-- my-electron-app-linux-x64
|
|-- pyadddist
|
`-- README.md
```

# System and environment

Linux OS : 	Ubuntu 18.04.2 LTS
Python 3.6.5
npm 3.5.2
node v8.10.0

# To run the project
- Download and extract the project folder
- To run the execute app, in the project folder run following command
```bash
./my-electron-app-linux-x64/my-electron-app 
```
- To execute test, change the electron path on `line 15` of `test/spec.js` and run
```bash
./node_modules/mocha/bin/mocha test/spec.js 
```
## Steps followed 

Installed following packages  
```bash
pip install zerorpc
pip install pyinstaller
sudo apt-get install -y upx

# verify the electron binary and its version by opening it
./node_modules/.bin/electron
```
Create app folder

Configured `package.json`
```json
{
  "name": "my-electron-app",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
	"test": "mocha"

  },
  "dependencies": {
    "zerorpc": "git+https://github.com/0rpc/zerorpc-node.git"
  },
  "devDependencies": {
    "electron": "^1.8.8",
    "electron-packager": "^9.0.1",
    "zerorpc": "^3.5.2",
    "spectron": "^3.8.0",
    "mocha": "^3.5.3",
    "chai": "^3.5.0" ,
    "chai-as-promised": "^5.3.0",
    "@types/mocha": "^2.2.43" 
  },
  "version": "1.0.0",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```
Used `main.js` from the provided resource and modified below values
```python
const PY_DIST_FOLDER = 'pyadddist'
const PY_FOLDER = 'pyadd'
const PY_MODULE = 'api' // without .py suffix
```

In the app folder following commands are run 
```bash
npm init -y
npm i --save-dev electron
```
Server side Python code is written in `pyadd` folder. The core addition function is written in `pyadd/add.py` The add API function is defined in `pyadd/api.py` It invokes the validation check and core function The server listens on the given port 4242. 

This API can be tested by running `pyadd/api.py` in one terminal and running client request in second terminal as below
```bash
zerorpc tcp://localhost:4242 add 23 45
```
`index.html` renders the html page and uses `render.js` script to process the data received.
Data is processed in `render.js` and client function `add` is invoked. Both numbers are sent to the server to compute sum. Sum is then returned and set as result. 

## Packaging python program
Python program is packaged using pyinstaller as follows
```bash
pyinstaller pyadd/api.py --distpath pyadddist
```
Note: I had to install few packages as below
```bash
npm install zerorpc
npm install electron-packager
npm i mocha@3.5.3 -D 
npm i @types/mocha@2.2.43 -D
```

## Creating desktop application
Create desktop application using below command:
```
./node_modules/.bin/electron-packager . --overwrite --ignore="pyadd$" --ignore="\.venv" --ignore="test"
```

## Run application

A new folder is created as `my-electron-app-linux-x64`. Run application as below:
```bash
./my-electron-app-linux-x64/my-electron-app
```
## Testing using Spectron
Used Spectron testing framework with Mocha library to test the app UI. The test spec is created in test folder as `spec.js`
Used the following command to run the command: 

```bash
./node_modules/mocha/bin/mocha test/spec.js 
```
