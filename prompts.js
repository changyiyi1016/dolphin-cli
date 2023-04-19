const {
    yellow,
    green,
    cyan,
    blue,
    red,
    lightGreen,
    lightCyan
} = require('kolorist')
const prompts = require('prompts')
const fs = require('fs')

function isEmpty(path) {
    return fs.readdirSync(path).length === 0
}

module.exports = async function (targetDir) {
    // 获取模板列表
    const FRAMEWORKS = [
        {
          name: 'vue',
          color: green,
          variants: [
            {
              name: 'vue-ts-prettier',
              value: 'vue-ts-prettier',
              color: lightGreen
            },
            {
              name: 'vue-ts-prettier-通用表单-通用表格',
              value: 'vue-ts-prettier-form-table',
              color: blue
            },
          ]
        },
        {
          name: 'react',
          color: cyan,
          variants: [
            {
              name: 'react-ts-prettier',
              value: 'react-ts-prettier',
              color: lightCyan
            }
          ]
        }
    ]
    const defaultProjectName = !targetDir ? 'biomap-web-project' : targetDir
    const result = await prompts(
        [
            {
                type: 'text',
                name: 'projectName',
                message: '项目名称:',
                initial: defaultProjectName,
                onState: (state) =>
                (targetDir = state.value.trim() || defaultProjectName)
            },
            {
                type: () =>
                !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
                name: 'overwrite',
                message: () =>
                (targetDir === '.'
                    ? '当前目录'
                    : `目标目录 "${targetDir}"`) +
                ` 已存在. 是否删除已存在的目录并继续?`
            },
            {
                type: (_, { overwrite } = {}) => {
                if (overwrite === false) {
                    throw new Error(red('✖') + ' 操作取消')
                }
                return null
                },
                name: 'overwriteChecker'
            },
            {
                type: 'select',
                name: 'framework',
                message: '选择模板：',
                initial: 0,
                choices: FRAMEWORKS.map((framework) => {
                const frameworkColor = framework.color
                return {
                    title: frameworkColor(framework.name),
                    value: framework
                }
                })
            },
            {
                type: (framework) =>
                framework && framework.variants ? 'select' : null,
                name: 'variant',
                message: '选择类型：',
                choices: (framework) =>
                framework.variants.map((variant) => {
                    const variantColor = variant.color
                    return {
                    title: variantColor(variant.name),
                    value: variant.value
                    }
                })
            },
            {
                type: 'confirm',
                name: 'git',
                message: '是否同步到git：'
            }
        ],
        {
            onCancel: () => {
                throw new Error(red('✖') + ' 操作取消')
            }
        }
    )
    return result
}