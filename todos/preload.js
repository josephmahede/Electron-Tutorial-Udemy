const {contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld(
    "api", 
    {
        send: (channel, data) => {
            let validChannels = ["todo:add"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["todo:add"];
            if (validChannels.includes(channel)) {
                
                ipcRenderer.on(channel, (event,todo) => {
                    console.log("args: ", todo);
                    func(todo)
                });
            }
        }
    }
);