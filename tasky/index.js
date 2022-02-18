const electron = require('electron');
const path = require('path');
const { app, BrowserWindow, Tray } = electron;
const TimerTray = require('./app/timer_tray');

let mainWindow;
let tray

app.on('ready', () => {
    
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false,
        skipTaskBar: true
    });

    if (process.platform == 'darwin') {
        app.dock.hide();
    } else {
        mainWindow.setSkipTaskbar(true);
    }

    mainWindow.loadURL(`file://${__dirname}\\src\\index.html`);
    mainWindow.on('blur', () => {
        mainWindow.hide();
    });

    const iconName = process.platform ==='win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow);
});