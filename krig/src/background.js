'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const dbPath = path.join(app.getPath('userData'), 'app_data.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Błąd podczas otwierania bazy danych:', err.message);
  } else {
    console.log('Połączono z bazą danych SQLite.');
  }
});

// Tworzenie tabeli przy starcie aplikacji
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    )
  `);
});
// db.serialize(() => {
//   db.run(`
//     DROP TABLE bills 
//     `);
// });
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      number TEXT NOT NULL,
      buyer INTEGER NOT NULL, 
      car INTEGER NOT NULL, 
      products TEXT NULL,
      creation_date INTEGER NULL
    )
  `);
});



db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NULL,
      surname TEXT NULL,
      nick TEXT NOT NULL,
      adress TEXT NULL,
      creation_date INTEGER NULL
    )
  `);
});
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      car TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      vin TEXT NULL,
      comment TEXT NULL,
      creation_date INTEGER NULL,
      parent_id INTEGER NOT NULL, 
      FOREIGN KEY (parent_id) REFERENCES customers(id)
    )
  `);
});
// Funkcje komunikacji z frontendem
ipcMain.handle('get-invoices', () => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM bills',
      function (err, rows) {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });
});

ipcMain.handle('update-invoice', (event, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE bills SET buyer = ?, car = ?, products = ?, creation_date = ? WHERE id = ?',
      [ data.buyer, data.car, data.products, data.creation_date, data.id ],
      function (err) {
        // event.reply("add-customer-response", { success: true }, parsedData);
        console.log(data, 'updated invoice')
        if (err) {
          reject(err.message, data);
        } else {
          resolve({...data,  changes: this.changes});
        }
      }
    );
  });
});

ipcMain.handle('add-invoice', (event, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO bills (number, buyer, car, products, creation_date) VALUES (?, ?, ?, ?, ?)',
      [data.number, data.buyer, data.car, data.products, data.creation_date ],
      function (err) {
        // event.reply("add-customer-response", { success: true }, parsedData);
        console.log(data, 'add invoice')
        if (err) {
          reject(err.message, data);
        } else {
          resolve({...data, id: this.lastID});
        }
      }
    );
  });
});


ipcMain.handle('get-max-invoice-id', () => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT MAX(id) FROM bills',[],
      function (err, rows) {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows[0]['MAX(id)']);
        }
      }
    );
  });
});

ipcMain.handle('delete-customer', (event, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM cars WHERE parent_id = ?',[data.id],
      function (err) {
        // event.reply("add-customer-response", { success: true }, parsedData);
     
        if (err) {
          reject(err.message, data);
        } else {
          db.run(
            'DELETE FROM customers WHERE id = ?',[data.id],
            function (err) {
              // event.reply("add-customer-response", { success: true }, parsedData);
        
              if (err) {
                reject(err.message, data);
              } else {
                resolve(data);
              }
            }
          );
        }
      }
    );
  });
});
ipcMain.handle('delete-car', (event, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM cars WHERE id = ?',[data.id],
      function (err) {
        if (err) {
          reject(err.message, data);
        } else {
          resolve(data);
        }
      }
    );
  });
});

ipcMain.handle('add-car', (event, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO cars (car, model, year, vin, creation_date, comment, parent_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.car, data.model, data.year, data.vin, data.creation_date, data.comment, data.parent_id ],
      function (err) {
        // event.reply("add-customer-response", { success: true }, parsedData);
   
        if (err) {
          reject(err.message, data);
        } else {
          resolve(data);
        }
      }
    );
  });
});
ipcMain.handle('get-cars', (event, data) => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM cars WHERE parent_id = ?',[data.id],
      function (err, rows) {
     
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });
});
ipcMain.handle('add-customer', (event, data) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO customers (name, surname, nick, adress, creation_date) VALUES (?, ?, ?, ?, ?)',
      [data.name, data.surname, data.nick, data.adress, data.creation_date],
      function (err) {
        // event.reply("add-customer-response", { success: true }, parsedData);

        if (err) {
          reject(err.message, data);
        } else {
          resolve({...data, id: this.lastID});
        }
      }
    );
  });
});
ipcMain.handle('get-customers', () => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM customers',
      function (err, rows) {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });
});


ipcMain.handle('add-user', (event, { name, age }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (name, age) VALUES (?, ?)',
      [name, age],
      function (err) {
        if (err) {
          reject(err.message);
        } else {
          resolve({ id: this.lastID, name, age });
        }
      }
    );
  });
});

ipcMain.handle('get-users', () => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM users',
      function (err, rows) {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });
});

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
