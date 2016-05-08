'use strict';

var ipc = require('ipc');
var closeEl = document.querySelector('.close');
var minEl = document.querySelector('.min');
var menuEl = document.querySelector('.menu');
var skinEl = document.querySelector('.skin');

// var remote = require('electron').remote;
// var dialog = remote.require('dialog');

closeEl.addEventListener('click', function () {
    ipc.send('close-main-window');
});


minEl.addEventListener('click', function () {
    ipc.send('minimize');
});

menuEl.addEventListener('click', function () {
    ipc.send('open-menu-window');
});

skinEl.addEventListener('click', function () {
    //ipc.send('open-skin-window');
});