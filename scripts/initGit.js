const { execSync } = require('child_process');
const { join } = require('path')

const initGit = async (projectName) => {
    await execSync('git init', { cwd: join(process.cwd(), projectName)})
    await execSync('git add ./', { cwd: join(process.cwd(), projectName)})
    await execSync('git commit -m "feat: init project"', { cwd: join(process.cwd(), projectName)})
    await execSync('git push --set-upstream ssh://git@git.biomap-int.com:8222/biomap-fe/$(git rev-parse --show-toplevel | xargs basename).git $(git rev-parse --abbrev-ref HEAD)', { cwd: join(process.cwd(), projectName)})
}


module.exports = {
    initGit
}
