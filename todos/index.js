const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}\\index.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Add New Todo' 
    });
    addWindow.loadURL(`file://${__dirname}\\add.html`);
}

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