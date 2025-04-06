import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import path from 'path'
import { isDev } from './util.js'
import { getStaticData, pollResources } from './resourceManagement.js'
import { getAssetPath, getPreloadPath } from './pathResolver.js'
import { createTray } from './tray.js'
import { createMenu } from './menu.js'


// Menu.setApplicationMenu(null) ---> En caso de que no queramos mas opciones en el menu o ningun menu

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    // frame: false
  })
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123')
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'))
  }

  pollResources(mainWindow)

  ipcMain.handle('getStaticData', () => {
    return getStaticData()
  })

  createTray(mainWindow)
  handleCloseEvents(mainWindow)
  createMenu(mainWindow)

})

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;

  mainWindow.on('close', (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {//This option is for macos
      app.dock.hide();
    }
  });

  app.on('before-quit', () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
  });
}
