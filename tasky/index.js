const { timeLog } = require('console');
const electron = require('electron');
const path = require('path');
const MainWindow = require('./app/main_window');
const TimerTray = require('./app/timer_tray');

const { app, ipcMain } = electron;

let mainWindow;
let tray

app.on('ready', () => {
    mainWindow = new MainWindow(`file://${__dirname}\\src\\index.html`);

    if (process.platform == 'darwin') {
        app.dock.hide();
    } else {
        mainWindow.setSkipTaskbar(true);
    }

    const iconName = process.platform ==='win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
    tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timerLeft) => {
    tray.setTitle(timeLeft);
});