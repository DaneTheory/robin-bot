const { bot } = require('./app');
require('./utils');

const BotKitHelper =  {
  _memberListCache: null,

  getMembers(updateCache = false) {
    return new Promise((resolve, reject) => {
      if(this._memberListCache && !updateCache) {
        return resolve(this._memberListCache);
      }

      bot.api.users.list({}, (err, userList) => {
        if(err) {
          return reject(new Error('Could not retrieve user list.', err));
        }

        this._memberListCache = userList.members;

        resolve(this._memberListCache);
      });
    });
  },

  getMemberByName(name) {
    return this.getMembers().then((members) => {
      let filteredMembers = members.filter((member) => {
        return member.name === name;
      });

      return filteredMembers.length ? filteredMembers[0] : null;

    }, (err) => console.error(err));
  }
};


module.exports = { BotKitHelper };
