var app = require('app'); //应用模块
var Tray = require('tray'); //托盘模块
var Dialog = require('dialog'); //提示框
var BrowserWindow = require('browser-window');
var mainWindow = null;
var appIcon = null;
//关闭所有窗口后退出
app.on('window-all-close', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
app.on('ready', function() {
    var iconPath = __dirname + '/images/mail.png';
    var mainView = 'file://' + __dirname + '/index.html'
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
    mainWindow.loadUrl(mainView);

    //create menu
    var Menu = require('menu');
    var template = [{
        label: 'MarkMail',
        submenu: [{
            label: 'About MarkMail',
            selector: 'orderFrontStandardAboutPanel:'
        }, {
            type: 'separator'
        }, {
            label: 'Services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: 'Hide MarkMail',
            accelerator: 'Command+H',
            selector: 'hide:'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
        }, {
            label: 'Show All',
            selector: 'unhideAllApplications:'
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() {
                app.quit();
            }
        }, ]
    }, {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
        }, {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
        }, {
            type: 'separator'
        }, {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
        }, {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
        }, {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
        }, {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
        }, ]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() {
                BrowserWindow.getFocusedWindow().reloadIgnoringCache();
            }
        }, {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: function() {
                BrowserWindow.getFocusedWindow().toggleDevTools({detach: true});
            }
        }, ]
    }, {
        label: 'Window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
        }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
        }, {
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
        }, ]
    }, {
        label: 'Help',
        submenu: []
    }, ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.on('close', function() {
        mainWindow = null;
    });

    console.log(iconPath)
});