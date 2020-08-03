const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');


let win;

function createWindow() {

	// create browser window
	win = new BrowserWindow({
		width: 1000,
		height: 800,
		frame: true,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js')
		}
	});

	//remove menu bar
	win.setMenu(null);

	if (process.env.ELECTRON_ENV === "development") {
		// load react development server page
		win.loadURL('http://localhost:3000/');
		win.webContents.openDevTools();
	} else {
		// after react build
		win.loadFile(path.join(__dirname, 'build', 'index.html'));
	}

}

function closeWindow() {
	/* 
		  On macOS it is common for applications and their menu 
		  bar to stay active until the user quits explicitly with Cmd + Q 
	*/

	if (process.platform !== 'darwin') // not mac os
		app.quit()
}

function activateWindow() {
	/* 
		  On macOS it's common to re-create a window in the app when the
	  dock icon is clicked and there are no other windows open.
	*/
	if (BrowserWindow.getAllWindows().length === 0)
		createWindow()
}

app.whenReady().then(createWindow)

// quit when all windows are closed 
app.on('window-all-closed', closeWindow)

app.on('activate', createWindow)