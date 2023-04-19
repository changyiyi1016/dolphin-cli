const prompts = require('../prompts')
const { emptyDir, log, copy, walkSync } = require('../utils')
const { DIR_TPL } = require('../constants')
const { initGit } = require('./initGit')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const figlet = require('figlet');
const bcliStr = figlet.textSync('BCLI', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
});
const lolcatjs = require('lolcatjs');
lolcatjs.options.colors = true

/**
 * 通过模板生成项目
 */
module.exports = async function(targetDir) {
    try {
        const result = await prompts(targetDir)

        const { framework, overwrite, variant, projectName, git } = result

        const projectTitle = projectName.replace(/-/g, '_')

        const publicPath = projectName.replace('biomap-web-', '')

        const appName = publicPath.split('-').map(name => name.replace(name[0], name[0].toUpperCase())).join('')

        const root = path.join(process.cwd(), projectName)
        if (overwrite) {
            emptyDir(root)
        } else if (!fs.existsSync(root)) {
            fs.mkdirSync(root)
        }
        const template = variant || framework
        log.info(`\nScaffolding project in ${root}...`)
        const templateDir = path.join(DIR_TPL, `template-${template}`)
        const copyProject = async (file) => {
            const targetPath = renameFiles[file]
                ? path.join(root, renameFiles[file])
                : path.join(root, file)
            copy(path.join(templateDir, file), targetPath)
        }
        const files = fs.readdirSync(templateDir)
        const renameFiles = {
            '_gitignore': '.gitignore',
            '_env': '.env',
            '_env.development': '.env.development',
            '_env.test': '.env.test',
            '_env.production': '.env.production',
            '_cz-config.js': '.cz-config.js',
            '_eslintrc.js': '.eslintrc.js',
            '_prettierignore': '.prettierignore',
            '_stylelintignore': '.stylelintignore',
            '_npmrc': '.npmrc'
        }        
        for (const file of files) {
            await copyProject(file)
        }

        walkSync(root, async (filePath) => {
            console.log(filePath)
            fs.writeFileSync(filePath, await ejs.renderFile(filePath, { projectName, projectTitle, publicPath, appName }))
        })
       
        if (git) {
            try {
                await initGit(projectName)
                log.success('\n项目git初始化完成\n')
            } catch (e) {
                log.error('\n项目git初始化失败\n')
            }
        }
        log.success('\n创建完成. 执行以下命令:\n')
        log.default(`  cd ${projectName}\n`)
        log.default('  npm run bootstrap\n')
        log.default('  npm run dev\n')
        lolcatjs.fromString(bcliStr)
    } catch (e) {
        log.error(e.message)
        return
    }
}
 