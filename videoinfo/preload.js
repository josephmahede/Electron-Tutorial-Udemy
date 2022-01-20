const {contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = ["video:submit"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["video:metadata"];
            if (validChannels.includes(channel)) {
                
                ipcRenderer.on(channel, (event,...args) => {
                    console.log(...args);
                    func(...args)
                });
            }
        }
    }
);