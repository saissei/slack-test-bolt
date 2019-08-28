import * as Config from 'config';
import * as Log4js from 'log4js';
import * as path from 'path';

export class Logger {
  private log4js: Log4js.Log4js;
  private static _instance: Logger | null;
  private _level?: string;

  private constructor() {
    const configure = Config.util.loadFileConfigs(path.join(__dirname, '../../config')).log4js;
    this.log4js = Log4js.configure(configure as Log4js.Configuration);
    this._level;
  }

  public static get instance(): Logger {
    if (!this._instance) {
      return (this._instance = new Logger());
    }
    return this._instance;
  }

  public connectLogger(_level: string | undefined): any {
    return this.log4js.connectLogger(this.log4js.getLogger('access'), { level: _level });
  }

  public info(message: string): void {
    const logger = this.log4js.getLogger('access');
    logger.level = 'info';
    logger.info(message);
  }

  public warn(message: string): void {
    const logger = this.log4js.getLogger('access');
    logger.level = 'warn';
    logger.warn(message);
  }

  public error(message: string): void {
    const logger = this.log4js.getLogger('access');
    logger.level = 'error';
    logger.error(message);
  }

  public debug(message: string): void {
    const logger = this.log4js.getLogger('debug');
    logger.level = 'debug';
    logger.debug(message);
  }

  public setLevel(_level: string): void {
    return this.log4js.connectLogger(this.log4js.getLogger('access'), { level: _level });
  }
  public setName(message: string): void {
    const logger = this.log4js.getLogger('debug');
    logger.debug(message);
  }
  public trace(message: string): void {
    const logger = this.log4js.getLogger('trace');
    logger.level = 'trace';
    logger.trace(message);
  }
  public fatal(message: string): void {
    const logger = this.log4js.getLogger('access');
    logger.level = 'fatal';
    logger.fatal(message);
  }
}
