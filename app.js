require('./utils');

const Botkit = require('botkit');
const fs = require('fs');
const logger = require('morgan');

const RobinBot = {
  exclamationsByLetter: {}
};

try {
  RobinBot.tokens = JSON.parse(fs.readFileSync(__dirname + '/private/auth.json'));
  RobinBot.exclamations = JSON.parse(fs.readFileSync(__dirname + '/data/exclamations.json'));
} catch(error) {
  RobinBot.authToken = '';
  RobinBot.exclamations = ['Failure'];
  console.log('Missing valid exclamations file or auth token.');
  console.error(error);
}

const logFormat = ':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

const controller = Botkit.slackbot({
  debug: true,
  json_file_store: './data/storage.json'
});

const bot = controller.spawn({
  token: RobinBot.tokens.authToken
});

bot.startRTM((err) => {
  if (err) {
    console.error('Error occurred while starting bot.', err);
  }
});

bot.api.team.info({}, (err, res) => {
  if(err) {
    return console.error(err);
  }

  controller.saveTeam(res.team, (err) => {
    if(err) {
      console.error(err);
    }
  });
});

for(let [, exclamation] of RobinBot.exclamations.entries()) {

  if(!RobinBot.exclamationsByLetter.hasOwnProperty(exclamation[0])) {
    RobinBot.exclamationsByLetter[exclamation[0]] = [];
  }

  RobinBot.exclamationsByLetter[exclamation[0]].push(exclamation);
}

controller.setupWebserver(3000, (err, webserver) => {
  webserver.use(logger(logFormat, {
    stream: require('file-stream-rotator').getStream({
      date_format: 'YYYY-MM-DD',
      filename: `${__dirname}/logs/development-%DATE%.log`,
      frequency: '7d',
      verbose: false
    })
  }));

  controller.createWebhookEndpoints(webserver);
});

controller.on('tick', () => true);

controller.on('slash_command', (bot, message) => {
  console.log('onSlashCommand!', message);

  if (message.token !== RobinBot.tokens.commandVerifyToken) {
    return bot.res.send(401, 'Unauthorized');
  }

  bot.res.send(200, '');

  let msg = message.text.toUpperCase();
  let reply = {};

  if(RobinBot.exclamationsByLetter.hasOwnProperty(msg)) {
    reply.public = 'Holy ' + RobinBot.exclamationsByLetter[msg]._randomItem() + '!';

  } else if(msg.length === 0) {
    reply.public = 'Holy ' + RobinBot.exclamations._randomItem() + '!';

  } else if(msg._isSingleLetter()) {
    reply.private = 'Holy Try Again! I don\'t have any phrases that start with ' + msg + '!';

  } else {
    reply.private = 'Holy Try Again! Send an empty message or A-Z!';
  }

  if(reply.public) {
    bot.replyPublicDelayed(message, reply.public);
  }

  if(reply.private) {
    bot.replyPrivateDelayed(message, reply.private);
  }

});
