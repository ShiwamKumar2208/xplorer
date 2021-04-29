const { app, BrowserWindow, Menu, screen } = require('electron')
const path = require('path')
const storage = require('electron-json-storage')

try {
   require('electron-reloader')(module)
} catch (_) { }


// Create a new window
function createWindow() {
   const {width, height} = screen.getPrimaryDisplay().workAreaSize
   const win = new BrowserWindow({
      frame: false,
      width: Math.floor(width * .8),
      height: Math.floor(height * .8),
      minWidth: 600,
      minHeight: 400,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
         enableRemoteModule: true
      }
   })

   win.loadFile('src/public/index.html')
   //win.removeMenu()
}
app.allowRendererProcessReuse = false

app.whenReady().then(() => {
   createWindow()

   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow()
      }
   })
})

app.on('window-all-closed', () => {
   storage.remove('_loc')
   if (process.platform !== 'darwin') {
      app.quit()
   }
})
