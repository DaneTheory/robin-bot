'use strict';

if(!Object.entries) {
  require('object.entries').shim();
}

let Extension = {
  Array: {
    _randomItem: {
      value: function() {
        return this[Math.floor(Math.random() * this.length)];
      }
    }
  },
  String: {
    _isSingleLetter: {
      value: function() {
        return /^[a-z]$/i.test(this);
      }
    }
  }
};

for(let [objectType, object] of Object.entries(Extension)) {
  Object.defineProperties(global[objectType].prototype, object);
}
