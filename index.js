const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
const { remote } = require('electron')
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const clipboard = electron.clipboard;

const option = true;

var checked = false;
var nowURL = ""

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 700, 
    height: 800, 
    alwaysOnTop: true,
    icon: __dirname + '/icon.png'
  });
  mainWindow.loadURL('https://youtube.com');
  mainWindow.setTitle("twitter");
  option ? mainWindow.hide() : mainWindow.setPosition(-730, 150);
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
  xmenu.append(new MenuItem({
    type: "normal",
    label: "URLをコピー",
    click: function(e) {
      clipboard.writeText(nowURL)
    }
  }))
  mainWindow.webContents.on('context-menu', function(e,params) {
    nowURL = params.linkURL
    xmenu.popup(mainWindow,params.x - 50,params.y - 50)
  })


  setInterval(function () {
    let mousePos = electron.screen.getCursorScreenPoint();
    console.log(mousePos);
    if (!checked && mousePos.x < 5 && mousePos.y > 150) {
      option ? mainWindow.show(): mainWindow.setPosition(0, 150);
    }
    else {
      if (!checked && mousePos.x >= 750) {
        option ? mainWindow.hide() : mainWindow.setPosition(-780, 150);
      }
    }
  }, 1000);

});

