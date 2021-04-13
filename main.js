const {app, BrowserWindow, Menu} = require('electron');
const settings = require('electron-settings');
const { resolve } = require('app-root-path');
let mainWindow;
//require('electron-debug')({showDevTools: true, enabled: true});
app.on('ready', function() {



  // send an ipcRenderer.send('ready') from your browser as soon as the app is ready

// initialize the splashscreen handling


  mainWindow = new BrowserWindow({x:100, y:100, width: 1024, height: 768, show:false,  toolbar: false, webPreferences: {
            nodeIntegration: true,
                  enableRemoteModule: true,

     devTools:false,
        }});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  var menu = new Menu();



  // Create the Application's main menu
    var template = [{
       
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            //{ label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

 Menu.setApplicationMenu(Menu.buildFromTemplate(template));
//Menu.setApplicationMenu(menu);


  mainWindow.once('ready-to-show', () => {
    // Electron-splash will automatically show the mainwindow as soon, but you can show it earlier in dev
    mainWindow.show();
    
  });

  mainWindow.on('close', () => {
    for (let window of BrowserWindow.getAllWindows()) {
      if (window != mainWindow)
        window.close();
    }
  })

 app.on('browser-window-created',function(e,window) {
      window.setMenu(null);
  });

});



app.on('window-all-closed', () => {
  app.quit()
})
