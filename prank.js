const { Utils } = require('./utils');
const { controller, bot, RobinBot } = require('./app');
const { BotKitHelper } = require('./botKitHelper');

controller.on('ambient', (bot, message) => {
  console.log('PRANKEDUSERS', RobinBot.prankedUsers);
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
