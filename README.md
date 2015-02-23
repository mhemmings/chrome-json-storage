# Chrome JSON Storage

A wrapper for the localstorage API within Chrome Extensions. (see [here](https://developer.chrome.com/extensions/storage))

Simplifies the API and allows JSON objects as values. Works with both local and synced
storage.

## Usage

Just drop the js file into your project:

```html
<script src="/js/chrome-json-storage-1.0.0.min.js"></script>
```

Then create an instance of storage, passing a boolean whether to sync the storage
or not:

```javascript
// Local storage
var storage = new JsonStorage();
```
or
```javascript
// Synced storage
var storage = new JsonStorage(true);
```

### Setting Values

Set values with the `set(key, value, callback[optional])` method:

```javascript
var user = {
  first: 'Bob',
  last: 'Smith'
};

storage.set('user', user);
```
or with an optional callback:
```javascript
storage.set('user', user, function() {
  console.log('user now saved');
});
```

### Getting Values

Get values with the `get(key, callback)` method:

```javascript
storage.get('user', function(value) {
  console.log(value);
  // Prints: {first: "Bob", last: "Smith"}
});
```

### Listening for a change

You can listen for a change on a value with `storage.addOnChangeListener(key, callback)`.
When the value is changed elsewhere in the extension, the callback is fired.

```javascript
storage.addOnChangeListener('user', function (newObj) {
  console.log(newObj);
});
```

### Deleteing the entire storage

The storage can be wiped with `clear(callback[optional])`:

```javascript
storage.clear(function() {
  console.log('Nothing left!');
});
```

### Dumping the entire storage

Get the entire contents of the storage with `dump(callback[optional])`. Handy for debugging.
The callback passes both a json object and a string representation of the storage.

```javascript
storage.dump(function(obj, str) {
  console.dir(obj);
  console.log(str);
});
```

## TODO:

- Implement any missing methods
- Testing
- Support managed storage
