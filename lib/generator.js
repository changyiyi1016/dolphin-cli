
import {wrapLoading} from "./utils.js"

import { getRepoList } from "./http.js"

class Generator{
   constructor(name,targetDir){
       this.name=name
       this.targetDir= targetDir
   }

  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, 'waiting fetch template');
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map(item => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: 'Please choose a template to create project'
    })
    // 3）return 用户选择的名称
    return repo;
  }

  create(){}
}

export default Generator