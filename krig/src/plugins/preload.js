const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  addUser: (user) => ipcRenderer.invoke('add-user', user),
  getUsers: () => ipcRenderer.invoke('get-users'),
  addCustomer: (customer) => ipcRenderer.invoke('add-customer', customer),
  getCustomers: () => ipcRenderer.invoke('get-customers'),
  deleteCustomer: (customer) => ipcRenderer.invoke('delete-customer', customer),
  addCar: (car) => ipcRenderer.invoke('add-car', car),
  getCars: (customer) => ipcRenderer.invoke('get-cars', customer),
  deleteCar: (car) => ipcRenderer.invoke('delete-car', car),
  getMaxInvoiceId: () => ipcRenderer.invoke('get-max-invoice-id'),
  addInvoice: (invoice) => ipcRenderer.invoke('add-invoice',invoice),
  getInvoices: () => ipcRenderer.invoke('get-invoices'),
  updateInvoice: (invoice) => ipcRenderer.invoke('update-invoice', invoice),
  // addBill:() => ipcRenderer.invoke('addBill', bill)
});
