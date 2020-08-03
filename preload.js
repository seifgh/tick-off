const Store = require('./dataStore.js');


const dataStore = new Store('tick-off','store.json');

window.dataStore = dataStore;