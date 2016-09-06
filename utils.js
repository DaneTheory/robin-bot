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

let Utils = {
  TIME: {
    ONE: {
      SECOND: 1000,
      MINUTE: 1000 * 60,
      HOUR: 1000 * 60 * 60,
      DAY: 1000 * 60 * 60 * 24
    }
  },
  randomInteger(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

for(let [objectType, object] of Object.entries(Extension)) {
  Object.defineProperties(global[objectType].prototype, object);
}

module.exports = { Utils };
