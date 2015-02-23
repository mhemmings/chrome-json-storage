/*!
 * A lightweight storage adapter allowing the storage of objects
 *
 * @license MIT
 * @copyright  2015 Mark Hemmings
 * @author     Mark Hemmings
 **/

/**
 * @param {Boolean} sync Optional. If true, this instance of JsonStorage will
 * use chrome.storage.sync
 */
var JsonStorage = function (sync) {
  /* set up */
  this.storageArea = sync ? 'sync' : 'local';
};

/**
 * Get an object from storage
 *
 * @param  {String}   key      Key of the object
 * @param  {Function} callback Callback with the object passed as a param
 */
JsonStorage.prototype.get = function (key, callback) {
  /* Get the object for the key */
  chrome.storage[this.storageArea].get(key, function(obj) {
    /* Get the stringified value */
    var str = obj[key];

    /* It exists in storage */
    if (str) {
      /* Parse string to JSON and pass to callback */
      callback(JSON.parse(str));
      return;
    }
    callback(null);
  });
};

/**
 * Set an object in storage
 *
 * @param {String}   key      Key of the object
 * @param {Object}   obj      Object to save
 * @param {Function} callback Optional.
 */
JsonStorage.prototype.set = function (key, obj, callback) {
  /* Stringify object */
  var value = JSON.stringify(obj);

  /* Create key value pairing */
  var toStore = {};
  toStore[key] = value;

  /* Save */
  chrome.storage[this.storageArea].set(toStore, callback);
};

/**
 * Add a listener for an item changing
 *
 * @param {String} key      The key of the item to listen for
 * @param {Function(newObj)} onChange Callback for when an item changes
 */
JsonStorage.prototype.addOnChangeListener = function (key, onChange) {
  var self = this;
  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === self.storageArea && changes[key]) {
      var obj = null;
      /* If value has been deleted, there will be no new value */
      if (changes[key].newValue) {
        obj = JSON.parse(changes[key].newValue);
      }
      onChange(obj);
    }
  });
};

/**
 * Dumps everything from the storage into an object and string
 *
 * @param {Function} callback
 */
JsonStorage.prototype.dump = function (callback) {
  chrome.storage[this.storageArea].get(function (data) {
    for (var obj in data) {
      data[obj] = JSON.parse(data[obj]);
    }
    callback(data, JSON.stringify(data));
  });
};

/**
 * Drops the storage
 *
 * @param {Function} callback Optional
 */
JsonStorage.prototype.clear = function (callback) {
  chrome.storage[this.storageArea].clear(callback);
};
