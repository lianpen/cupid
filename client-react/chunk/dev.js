/**
 * @Author: lianpen
 * @Date:   2018-05-21 13:17:38
 * 开发环境启动
 * node dev.js
 * 防止npm版本不对称导致启动两个node进程 只能杀掉一个的情况
 */

require('./node_modules/webpack-dev-server/bin/webpack-dev-server.js')