'use strict';
import { App } from '@slack/bolt';
import { Logger } from '../logger/loggerBase';
import { ConfigSet } from './config-set';

const logger = Logger.instance;
const config = ConfigSet.instance;
const slackConf = config.slackConf();

const app = new App({
  token: slackConf.SLACK_BOT_TOKEN,
  signingSecret: slackConf.SLACK_SIGNING_SECRET
});

app.message('*', ({ message, say }) => {
  logger.trace(JSON.stringify(message));
  say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  logger.debug('⚡️ Bolt app is running!');
})();
