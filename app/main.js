const electron = require('electron');
const { shell, app, BrowserWindow } = electron;
const HOMEPAGE = 'https://talky.io/snap-advocacy'

let mainWindow;

app.on('ready', () => {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
          nodeIntegration: false
        }
    });
    window.setMenuBarVisibility(false);
    window.loadURL(HOMEPAGE);

    window.webContents.on('did-finish-load', () => {
        window.setTitle('Snap Advocacy Virtual Office');
    });

    window.webContents.on('will-navigate', (ev, url) => {
        parts = url.split('/');
        if (parts[0] + '//' + parts[2] != HOMEPAGE) {
            ev.preventDefault();
            shell.openExternal(url);
        };
    });

    // Emitted when the window is closed.
    window.on('closed', () => {
        window = null;
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
