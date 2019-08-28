import * as Config from 'config';
import * as path from 'path';

interface slackParams {
  SLACK_SIGNING_SECRET: string;
  SLACK_BOT_TOKEN: string;
}

export class ConfigSet {
  private allConf: {
    slack: any;
    log4js: any;
  };

  private static _instance: ConfigSet | null;

  private constructor() {
    this.allConf = Config.util.loadFileConfigs(path.join(__dirname, '../../config'));
  }

  public static get instance(): ConfigSet {
    if (!this._instance) {
      return (this._instance = new ConfigSet());
    }
    return this._instance;
  }

  public slackConf(): slackParams {
    return {
      SLACK_SIGNING_SECRET: this.allConf.slack.SLACK_SIGNING_SECRET,
      SLACK_BOT_TOKEN: this.allConf.slack.SLACK_BOT_TOKEN
    };
  }
}
