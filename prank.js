require('./utils');
const { controller, bot, RobinBot } = require('./app');
const { BotKitHelper } = require('./botKitHelper');

controller.on('ambient', (bot, message) => {
  console.log('MSG_XX', message);
  BotKitHelper.getMemberByName('morgan').then((member) => {
    if(message.user === member.id) {
      bot.reply(message, 'Hello ' + member.name);
    }
  });
});
