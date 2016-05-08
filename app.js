'use strict';

const electron = require('electron');
const ipc = require('ipc');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;
var menuWindow=null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

ipc.on('close-main-window', function () {
    app.quit();
});

ipc.on('minimize', function () {
    mainWindow.minimize();
});

ipc.on('open-menu-window', function () {
    if (menuWindow) {
        return;
    }

    menuWindow = new BrowserWindow({
        frame: false,
        height: 340,
        width: 500,
		resizable: false,
		movable: true,
		autoHideMenuBar: true
    });

    menuWindow.loadURL('file://' + __dirname + '/view/menu.html');

    menuWindow.on('closed', function () {
        menuWindow = null;
    });
});

ipc.on('close-menu-window', function () {
    if (menuWindow) {
        menuWindow.close();
    }
});

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        // 'width' : 1250,//550
        // 'height' : 951,//351
        'width' : 550,//550
        'height' : 351,//351
        'icon' : './view/assets/images/app_icon.png',
        //'titleBarStyle' : 'hidden-inset',
		'movable' : true,
		'frame' : false,
		//'transparent' : true,
		'autoHideMenuBar' : true,
        'resizable' : false,
        'transparent' : true,
        'webPreferences' : {
            'webSecurity' : false,
            'defaultEncoding' : 'UTF-8'
        }
    });

    mainWindow.loadURL('file://' + __dirname + '/view/main.html');
    //mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        //mainWindow = null;
        app.quit();
    });

});
