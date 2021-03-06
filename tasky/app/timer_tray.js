const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
    constructor(iconPath, mainWindow) {
        super(iconPath);
        this.mainWindow = mainWindow;
        this.setToolTip('Timer App'); // Method from the super class.
        this.on('click', this.onClick.bind(this));
        this.on('right-click', this.onRightClick.bind(this));
    }

    onClick(event, bounds) {
        // Click event bounds
        const { x, y } = bounds;
        //Window height and width
        const { height, width } = this.mainWindow.getBounds();
        if (this.mainWindow.isVisible()) {
            this.mainWindow.hide();
        } else {
            this.mainWindow.setBounds({
                x: x - width / 2,
                y: process.platform === 'win32'? y - height : y,
                height,
                width 
            });
            this.mainWindow.show();
        }
    }

    onRightClick() {
        const menuConfig = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]);
        this.popUpContextMenu(menuConfig); // Method from the Tray class.
    }
}

module.exports = TimerTray;