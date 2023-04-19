const path = require('path')
const fs = require('fs')
const {
    yellow,
    green,
    cyan,
    red,
    white
} = require('kolorist')

const log = {
    /**
     * 错误信息展示
     * @param {string} str 
     */
    error (str) {
        console.log(red(str))
    },
    /**
     * 成功信息展示
     * @param {string}} str 
     */
    success (str) {
        console.log(green(str))
    },
    /**
     * 通用信息展示
     * @param {string} str 
     */
    info (str) {
        console.log(cyan(str))
    },
    /**
     * 警告信息展示
     * @param {string} str 
     */
    warning (str) {
        console.log(yellow(str))
    },
    /**
     * 默认信息展示
     * @param {string}} str 
     */
    default (str) {
        console.log(white(str))
    }
}

/**
 * 清空文件夹
 * @param {string} dir 
 * @returns 
 */
function emptyDir(dir) {
    if (!fs.existsSync(dir)) {
      return
    }
    for (const file of fs.readdirSync(dir)) {
      const abs = path.resolve(dir, file)
      // baseline is Node 12 so can't use rmSync :(
      if (fs.lstatSync(abs).isDirectory()) {
        emptyDir(abs)
        fs.rmdirSync(abs)
      } else {
        fs.unlinkSync(abs)
      }
    }
}

/**
 * 复制文件夹
 * @param {string} srcDir 
 * @param {string} destDir 
 */

function copyDir(srcDir, destDir) {
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file)
      const destFile = path.resolve(destDir, file)
      copy(srcFile, destFile)
    }
}

/**
 * 复制文件/文件夹
 * @param {string} src 
 * @param {string} dest 
 */
function copy(src, dest) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
      copyDir(src, dest)
    } else {
      fs.copyFileSync(src, dest)
    }
}

function walkSync(currentDirPath, callback) {
  var fs = require('fs'),
      path = require('path');
  fs.readdirSync(currentDirPath).forEach(function (name) {
      var filePath = path.join(currentDirPath, name);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
          callback(filePath, stat);
      } else if (stat.isDirectory()) {
          walkSync(filePath, callback);
      }
  });
}

module.exports = {
    log,
    copy,
    copyDir,
    emptyDir,
    walkSync
}