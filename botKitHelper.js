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

  getPrankedMembers(prankedMemberList, byMemberID = null) {
    return this.getMembers().then((members) => {
      return members.filter((member) => {
        if(prankedMemberList.hasOwnProperty(member.name)) {
          if(!byMemberID || prankedMemberList[member.name].meta.prankerID === byMemberID) {
            return true;
          }
        }

        return false;
      });
    }, (err) => console.error(err));
  },

  getMemberByName(name) {
    name = name.toLowerCase();
    return this.getMembers().then((members) => {
      return members.filter((member) => name === member.name)[0];
    });
  }
};


module.exports = { BotKitHelper };
