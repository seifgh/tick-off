"use strict";

const fs = require('fs');
const path = require('path');

// make working with files easier 

class Store {

	constructor(appName, storeFileName) {

		const storeFolderPath = (function () {
			const operatingSystem = process.platform;
			const homePath = process.env.HOME;

			//return the path of the current operating system
			if (operatingSystem === 'linux')
				return path.join(homePath, '.config', appName);
			else if (operatingSystem === 'darwin')
				return path.join(homePath, 'Library', 'Application Support', appName);
			else if (operatingSystem === 'win32')
				return path.join(homePath, 'AppData', 'Local', appName);

			// if the ops didn't match
			throw new Error("Unsupported operating system");
		})();

		if (!fs.existsSync(storeFolderPath)) {
			fs.mkdirSync(storeFolderPath);
		}

		this.storeFilePath = path.join(storeFolderPath, storeFileName);

	}

	readFile(path, toJson = false) {
		const file = fs.readFileSync(path, function (err) {
			if (err) throw err;
		});

		return toJson ? JSON.parse(file.toString()) : file.toString();
	}

	writeFile(path, fileContent, fromJson = false) {

		if (fromJson) {
			fileContent = JSON.stringify(fileContent);
		}

		fs.writeFile(path, fileContent, function (err) {
			if (err) throw err
		})
	}

	deleteFile(path) {
		fs.unlink(path, function (err) {
			if (err) throw err;
		});
	}

	fileExists(path) {
		return fs.existsSync(path)
	}

	storeExists() {
		return this.fileExists(this.storeFilePath);
	}

	getData() {
		return this.readFile(this.storeFilePath, true);
	}

	saveData(dataAsJson) {
		this.writeFile(this.storeFilePath, dataAsJson, true);
	}

	eraseData() {
		this.writeFile(this.storeFilePath, '');
	}

	deleteStore() {
		this.deleteFile(this.storeFilePath);
	}


}

module.exports = Store;
