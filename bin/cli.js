#! /usr/bin/env node


//1 创建脚手架启动命令（commander）
//2 询问用户问题获取创建所需信息(inquirer)
//3 下载远程模板（使用 doenload-git-repo）
//(1)用户选择模版 (2)用户选择版本 (3) 获取下载模版的链接
//4 发布项目

import  createOptions from "../lib/create.js"
import {Command} from 'commander'
const program= new Command()
import figlet from 'figlet'
import chalk from "chalk"


program.command('create <name>')
       .description('create a new project')
       .option('-f --force','overwrite target directory if it exist')
       .action((name,options)=>{
           createOptions(name, options)
       })

//   配置版本号信息
// program.version(`v${require('./package.json').version}`).usage('<command> [option]')

program.on('--help',()=>{
      console.log('\r\n' +figlet.textSync('dolphin cli', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    //新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
})
//解析用户执行命令参数
program.parse(progress.argv)


