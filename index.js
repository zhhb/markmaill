var app = require('app');//应用模块
var Tray = require('tray');//托盘模块
var Dialog = require('dialog');//提示框

var BrowserWindow = require('browser-window');

var mainWindow = null;
var appIcon = null;

var resourcePath = process.cwd();
//关闭所有窗口后退出
app.on('window-all-close',function(){
    if(process.platform != 'darwin'){
        app.quit();
    }
});

app.on('ready',function(){
    var iconPath = resourcePath + '/images/mail.png';
    //appIcon = new Tray(iconPath);

    mainWindow = new BrowserWindow({
        title: 'MarkMail - By Tobbyn',
        show: true,
        width: 800,
        height: 600,
        'min-width': 800,
        'min-height': 600,
        icon: iconPath,
        resizable: true,
        transparent: false,
        frame: true,
        kiosk: false,
        'dark-theme': true, //Forces using dark theme for the window, only works on some GTK+3 desktop environments
        type: 'desktop' //type of the window only works on Linux
    });

    mainWindow.loadUrl('https://www.baidu.com');

    //mainWindow.openDevTools({detach:true});

    mainWindow.on('close',function(){
        mainWindow = null;
    });

    console.log(iconPath)
});

