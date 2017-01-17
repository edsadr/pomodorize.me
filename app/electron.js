'use strict'

const fs = require('fs')
const https = require('https')
const platform = require('os').platform()
const path = require('path')
const electron = require('electron')
const username = require('username')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Tray = electron.Tray
const user = username.sync()

let mainWindow
let config = {}

global.trayIcon

global.getAvatar = (cb) => {
  let avatarFile = path.join(app.getPath('appData'), 'pomodorize.me', `${user}.png`)

  fs.stat(avatarFile, (err, stat) => {
    if (err) return requestAvatar(err, avatarFile, cb)
    cb(null, `file://${avatarFile}`)
  })
}

global.getUsername = () => {
  return user
}

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 630,
    height: 680,
    minWidth: 630,
    minHeight: 680,
    name: `pomodorize.me - ${user}`,
    frame: false
  })

  mainWindow.loadURL(config.url)

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then((name) => mainWindow.webContents.openDevTools())
      .catch((err) => console.log('An error occurred: ', err))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('mainWindow opened')
}

function createTray () {
  let trayImage = path.join(__dirname, 'icons', 'icon.png')

  if (platform === 'win32') {
    trayImage = path.join(__dirname, 'icons', 'icon.ico')
  }

  global.trayIcon = new Tray(trayImage)
  global.trayIcon.setToolTip('Pomodorize.me')
  global.trayIcon.setTitle('25:00')

  global.trayIcon.on('click', () => {
    if (!mainWindow.isVisible()) {
      mainWindow.show()
    } else if (!mainWindow.isFocused()) {
      mainWindow.focus()
    } else {
      mainWindow.hide()
    }
  })
}

function requestAvatar (err, avatarFile, cb) {
  if (err.code !== 'ENOENT') {
    return cb(err)
  }

  let transfered = false

  let file = fs.createWriteStream(avatarFile).on('finish', () => {
    if (transfered) return cb(null, `file://${avatarFile}`)

    return cb(new Error('failed obtaining a custom avatar'))
  })

  https.get(`https://robohash.org/${user}?set=set3&size=128x128`, (res) => {
    if (res.statusCode !== 200) {
      console.error(res.statusCode)
      return cb(new Error('failed obtaining a custom avatar'))
    }

    transfered = true
    res.pipe(file)
  })
  .on('error', (err) => {
    console.error(err)
    return cb(err)
  })
}

app.on('ready', () => {
  createTray()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
