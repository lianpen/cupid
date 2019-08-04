/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1556183716307_5278';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    csrf: {
      enable: false,
      ingoreJSON: true,
    },
    domainWhiteList: [ 'http://localhost:8100' ],
  };

  config.cors = {
    origin: '*',
    allowMethods: 'get,head,put,post,delete,patch',
  };

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123',
      database: 'cupid1',
    },
    app: true,
    agent: false,
  };

  config.view = {
    mapping: {
      '.nj': 'nunjucks'
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
