#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改

// 用于检查入口文件是否正常执行
import inquirer from 'inquirer'

import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs'
import ejs from 'ejs'

import { Command } from 'commander';
const program = new Command();
import chalk from 'chalk'
import ora from 'ora'

// inquirer.prompt([
//   {
//     type: 'input', //type： input, number, confirm, list, checkbox ... 
//     name: 'name', // key 名
//     message: 'Your Project name', // 提示信息
//     default: 'my-node-cli' // 默认值
//   }
// ]).then(answers => {
 
//  const destUrl= path.join(__dirname, 'templates'); 
//    // 生成文件目录
//   // process.cwd() 对应控制台所在目录
//   const cwdUrl = process.cwd();
//    // 从模版目录中读取文件
//   fs.readdir(destUrl, (err, files) => {
//     if (err) throw err;
//     files.forEach((file) => {
//       // 使用 ejs 渲染对应的模版文件
//       // renderFile（模版文件地址，传入渲染数据）
//       ejs.renderFile(path.join(destUrl, file), answers).then(data => {
//         // 生成 ejs 处理后的模版文件
//         fs.writeFileSync(path.join(cwdUrl, file) , data)
//       })
//     })
//   })


// })




// program
// .version('0.1.0')
// .command('create <name>')
// .description('create a new project')
// .action(name => { 
//     // 打印命令行输入的值
//      // 文本样式
//     console.log("project name is " + chalk.bold(name))

//     // 颜色
//     console.log("project name is " + chalk.cyan(name))
//     console.log("project name is " + chalk.green(name))

//     // 背景色
//     console.log("project name is " + chalk.bgRed(name))

//     // 使用RGB颜色输出
//     console.log("project name is " + chalk.rgb(4, 156, 219).underline(name));
//     console.log("project name is " + chalk.hex('#049CDB').bold(name));
//     console.log("project name is " + chalk.bgHex('#049CDB').bold(name))


// })

// program.parse()


// // 自定义文本信息
// const message = 'Loading unicorns'
// // 初始化
// const spinner = ora(message);
// // 开始加载动画
// spinner.start();
// setTimeout(() => {
//     // 修改动画样式

//     // Type: string
//     // Default: 'cyan'
//     // Values: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
//     spinner.color = 'red';    
//     spinner.text = 'Loading rainbows';

//     setTimeout(() => {
//         // 加载状态修改
//         spinner.stop() // 停止
//         spinner.succeed('Loading succeed'); // 成功 ✔
//         // spinner.fail(text?);  失败 ✖
//         // spinner.warn(text?);  提示 ⚠
//         // spinner.info(text?);  信息 ℹ
//     }, 2000);
// }, 2000);




import spawn from 'cross-spawn';

// 定义需要按照的依赖
const dependencies = ['vue', 'vuex', 'vue-router'];

// 执行安装
const child = spawn('yarn', ['add', '-D'].concat(dependencies), { 
    stdio: 'inherit' 
});

// 监听执行结果
child.on('close', function(code) {
    // 执行失败
    if(code !== 0) {
        console.log(chalk.red('Error occurred while installing dependencies!'));
        process.exit(1);
    }
    // 执行成功
    else {
        console.log(chalk.cyan('Install finished'))   
    }
})

