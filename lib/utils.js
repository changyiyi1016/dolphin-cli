import ora from "ora";
// 添加加载动画
export const wrapLoading=async  (fn, message, ...args)=> {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();
  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改成功
    spinner.fail('Request f, refetch...')
  } 
}

