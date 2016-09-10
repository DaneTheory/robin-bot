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
        const ref = this.register[key];

        const nextMinTime = ref.lastTickTime + this.minTime;
        const nextMaxTime = ref.lastTickTime + this.maxTime;

        console.log('now = %d, nextMinTime = %d, nextMaxTime = %d', Date.now(), nextMinTime, nextMaxTime);
        console.log('now < nextMinTime = ', Date.now() < nextMinTime);
        console.log('now >= nextMaxTime = ', Date.now() >= nextMaxTime);

        if(Date.now() < nextMinTime) {
          return reject();
        }

        if(Date.now() >= nextMaxTime || Math.random() < 0.31) {
          ref.lastTickTime = Date.now();
          return resolve(ref.meta);
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
