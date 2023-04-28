import path from 'path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import Generator from "./lib/generator.js"
const createOptions = async function (name,options){
   
    //执行创建目录

    //当前命令行选择的目录
    const cwd=process.cwd()
    const targetAir=path.join(cwd,name)
   
    //目录是否已经存在
    if(fs.existsSync(targetAir)){
        if(options.force){
           await fs.remove(targetAir)
        }else{ 
           let {action} =await inquirer.prompt([
            {
               name:'action',
               type:'list',
               message:'Target directory already exists Pick an action',
               choices:[
                {
                    name:'Overwrite',
                    value:'overwrite'
                },
                {
                    name:'Cancel',
                    value:false
                }
               ]
            }
           ])
           if(!action){
            return;
           }else if(action === 'overwrite'){
             await fs.remove(targetAir)
           }
        }
    }

    //创建项目
    const generator = new Generator(name, targetAir);

    //开始创建项目
    generator.create()
}




