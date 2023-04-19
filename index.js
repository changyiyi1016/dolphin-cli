const { Command } = require('commander');
const { log } = require('./utils')
const { resolve } = require('path')
const { version } = require('./package.json')
const { CMD_DIR_NAME } = require('./constants')


const program = new Command();

/** 初始化选项 */
program
    .option('-c, --create [name]', '创建项目', 'biomap-web-project')
    .option('-i, --install <tpl>', '安装项目模板')
    .option('-h, --help', '查看帮助')
    .action(() => {
        const options = program.opts()
        const cmd = Object.entries(options)[0]
        const script = require(resolve(CMD_DIR_NAME, cmd[0]))
        script(cmd[1])
    })
  
/** 解析参数 */
program.parse(process.argv);
/** 自定义错误文本颜色 */
program.configureOutput({
    outputError: str => log.error(str)
});
/** 错误后显示帮助信息 */
program.showHelpAfterError();
/** 版本 */
program.version(version, '-v, --version', '查看当前版本')