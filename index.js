const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
const { remote } = require('electron')
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

var checked = false;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 700, height: 800, alwaysOnTop: true });
  mainWindow.loadURL('https://youtube.com');
  mainWindow.setTitle("twitter");
  mainWindow.setPosition(-780, 1020);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  const xmenu = new Menu()
  xmenu.append(new MenuItem({
    type: "checkbox",
    label: "隠さない",
    click: function(e) {
      checked = e.checked
    }
  }))
  mainWindow.webContents.on('context-menu', function(e,params) {
    xmenu.popup(mainWindow,params.x,params.y)
  })


  setInterval(function () {
    // get the mouse position
    let mousePos = electron.screen.getCursorScreenPoint();
    console.log(mousePos);
    if (mousePos.x < 5 && mousePos.y > 850) {
      mainWindow.setPosition(0, 850);
    }
    else {
      if (!checked && mousePos.x >= 750) {
        mainWindow.setPosition(-780, 850);
      }
    }
  }, 1000);

});

