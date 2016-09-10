const { Utils } = require('./utils');

class Randomizer {

  constructor(minTime, maxTime) {
    this.minTime = minTime;
    this.maxTime = maxTime;
    this.register = {};
  }

  add(key, meta=null) {
    if(!this.register.hasOwnProperty(key)) {
      this.register[key] = { lastTickTime: Date.now(), meta };
    }
  }

  tick(key) {
    return new Promise((resolve, reject) => {
      if(this.register.hasOwnProperty(key)) {
        if(this.register[key].lastTickTime + this.minTime > Date.now()) {
          return reject();
        }

        if(this.register[key].lastTickTime + this.maxTime < Date.now() ||
              Math.random() < 0.31) {
          this.register[key].lastTickTime = Date.now();
          return resolve(this.register[key].meta);
        }
      }
    });
  }

  remove(key) {
    delete this.register[key];
  }

  getMeta(key) {
    return this.register.hasOwnProperty(key) ? this.register[key].meta : {};
  }

}

module.exports = { Randomizer };
