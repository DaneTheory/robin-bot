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
          console.error('Could not retrieve user list.');
          return reject(new Error(err));
        }

        this._memberListCache = userList.members;

        resolve(this._memberListCache);
      });
    });
  },

  getPrankedMembers(prankedMemberList) {
    return this.getMembers().then((members) => {
      let filteredMembers = members.filter((member) => {
        if(prankedMemberList.hasOwnProperty(member.name)) {
          member.prankData = prankedMemberList[member.name];

          return true;
        }

        return false;
      });

      return filteredMembers;

    }, (err) => console.error(err));
  }
};


module.exports = { BotKitHelper };
