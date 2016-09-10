const { Utils } = require('./utils');
const { controller, bot, RobinBot, PrankedUsers } = require('./app');
const { BotKitHelper } = require('./botKitHelper');

controller.on('ambient', (bot, message) => {
  BotKitHelper.getPrankedMembers(PrankedUsers.register).then((members) => {
    for(let [, member] of members.entries()) {
      if(message.user === member.id) {

        let lowerMsg = message.text.toLowerCase();

        if(lowerMsg.includes('whoa') || lowerMsg.includes('wow')) {
          let reply = `Holy ${RobinBot.exclamations._randomItem()}, ${member.profile.first_name}!`;
          bot.reply(message, reply);

        } else {
          console.log('CALLING TICK ON', member.name);
          PrankedUsers.tick(member.name).then(() => {
            let reply = `Holy ${RobinBot.exclamations._randomItem()}, ${member.profile.first_name}!`;
            bot.reply(message, reply);
          }, (err) => console.log('Something terrible happened.', err));
        }
        break;
      }
    }
  });
});

// Refresh member cache
controller.on('channel_leave', () => {
  BotKitHelper.getMembers(true);
});

controller.on('user_channel_join', () => {
  BotKitHelper.getMembers(true);
});

controller.on('bot_channel_join', () => {
  BotKitHelper.getMembers(true);
});
