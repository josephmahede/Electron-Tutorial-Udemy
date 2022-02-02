const {contextBridge, ipcRenderer} = require("electron");
contextBridge.exposeInMainWorld(
    "api", 
    {
        send: (channel, data) => {
            // let validChannels = ["todo:add"];
            if (channel === "todo:add") {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            // let validChannels = ["todo:add", "todo:clear"];
            if (channel === "todo:add") {
                ipcRenderer.on(channel, (event,todo) => {
                    console.log("args: ", todo);
                    func(todo);
                });
            }

            if (channel === "todo:clear") {
                ipcRenderer.on(channel, (event) => {
                    console.log("Clearing list!");
                    func();
                })
            }

        }
    }
);