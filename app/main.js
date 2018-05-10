const URL = 'https://talky.io/snap-advocacy'
const TITLE = 'Snap Advocacy Virtual Office'
const { app, shell, BrowserWindow } = require('electron');

require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        label: 'Menu'
    }]
});

let window;

app.commandLine.appendSwitch('enable-usermedia-screen-capturing');

app.on('ready', () => {
    window = new BrowserWindow({
        width: 1278,
        height: 675,
        show: false,
        webPreferences: {
          nodeIntegration: false,
          plugins: true
        }
    });
    window.setMenuBarVisibility(false);
    window.loadURL(URL);

    window.on('ready-to-show', () => {
        window.show();
        window.focus();
    });

    window.webContents.on('did-finish-load', () => {
        window.setTitle(TITLE);
    });

    window.webContents.on('will-navigate', (ev, url) => {
        parts = url.split('/');
        if (parts[0] + '//' + parts[2] != URL) {
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
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
