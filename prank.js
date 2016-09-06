const { Utils } = require('./utils');
const { controller, bot, RobinBot } = require('./app');
const { BotKitHelper } = require('./botKitHelper');

controller.on('ambient', (bot, message) => {
  BotKitHelper.getPrankedMembers(RobinBot.prankedUsers).then((members) => {
    for(let [, member] of members.entries()) {
      if(message.user === member.id) {

        let lowerMsg = message.text.toLowerCase();

        if(lowerMsg.includes('whoa') || lowerMsg.includes('wow')) {
          let reply = `Holy ${RobinBot.exclamations._randomItem()}, ${member.profile.first_name}!`;
          bot.reply(message, reply);

        } else {
          if(member.prankData.lastPrankTime === 0) {

          }
          //randomizer code
        }
        break;
      }
    }
  });
});

// Refresh member cache
controller.on('channel_leave', () => {
  console.log('CHANNEL_LEAVE');
  BotKitHelper.getMembers(true);
});

controller.on('user_channel_join', () => {
  console.log('user_channel_join');
  BotKitHelper.getMembers(true);
});

controller.on('bot_channel_join', () => {
  BotKitHelper.getMembers(true);
});
