const electron = require('electron');
const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = electron;


let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences:{
            preload: path.join(app.getAppPath(), "preload.js")
        }
    });
    // mainWindow.loadURL(`file://${__dirname}\\index.html`);
    mainWindow.loadFile('index.html');
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Add New Todo',
        webPreferences: {
            preload: path.join(app.getAppPath(), "preload.js")   
        }
         
    });
    // addWindow.loadURL(`file://${__dirname}\\add.html`);
    addWindow.loadFile('add.html');
    addWindow.on('closed', () => addWindow = null);
}

ipcMain.on('todo:add', (event, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

const menuTemplate = [
    {
        label: 
            'File',
            submenu: [
                {
                    label: 'New Todo',
                    click() { createAddWindow();}
                },
                { 
                    label: 'Quit',
                    accelerator: process.platform === 'darwin' ? 'CoSmmand+Q':'Ctrl+W',
                    click() {
                        app.quit();
                    }
                }
            ]
    }
]

if (process.platform === 'darwin') {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV != 'production') {
    menuTemplate.push({
        label: 'Dev',
        submenu: [
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin'? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}