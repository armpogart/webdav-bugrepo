import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as angular from './angular.json';

let mainWindow: BrowserWindow;
const args = process.argv.slice(1);
const serve = args.some(value => value === '--serve');

// Make app singleton
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // This event will be emitted inside the primary instance of your application
    // when a second instance has been executed and calls app.requestSingleInstanceLock().
    // noinspection JSUnusedLocalSymbols
    app.on('second-instance', (event: Event, argv: string[], workingDirectory: string) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }
    });

    // Emitted when a new browserWindow is created
    app.on('browser-window-created', (event: Event, window: BrowserWindow) => {
      window.removeMenu();
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // On OS X it"s common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
        createWindow();
      }
    });
  } catch (e) {
    // throw e;
  }
}

function createWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window
  mainWindow = new BrowserWindow({
    width: size.width / 2,
    height: size.height / 2,
    icon: path.join(__dirname, `${angular.defaultProject}/favicon.ico`),
    resizable: false,
    maximizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev(),
    },
  });

  if (serve) {
    // https://electronjs.org/docs/tutorial/security
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../node_modules/electron`),
    });
    // noinspection JSIgnoredPromiseFromCall
    mainWindow.loadURL('http://localhost:4200');
  } else {
    // noinspection JSIgnoredPromiseFromCall
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, `${angular.defaultProject}/index.html`),
      protocol: 'file',
      slashes: true,
    }));
  }

  // Emitted when the window content is loaded and ready to show
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Open the DevTools.
  mainWindow.webContents.on('did-frame-finish-load', () => {
    if (isDev()) {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
      mainWindow.webContents.on('devtools-opened', () => {
        // Not sure this works, as I don't see console log
        mainWindow.focus();
        console.log('Finished loading');
      });
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function isDev(): boolean {
  return process.mainModule.filename.indexOf('app.asar') === -1;
}
