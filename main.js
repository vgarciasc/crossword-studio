const { app, BrowserWindow } = require('electron')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      nodeIntegration: true // This allows you to use Node.js APIs in your HTML/JS
    }
  })

  mainWindow.loadFile('index.html')
})