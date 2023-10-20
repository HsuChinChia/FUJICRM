const { exec } = require('child_process'); // nodejs子进程模块，用于创建一个cmd进程并执行命令行
const { readdirSync } = require('fs');

/** 更新模組 */
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => `powershell git -C ${source}/${dirent.name} pull`)
    .join('; ');

exec(
  getDirectories('./vendor/modules'),
  { shell: 'powershell.exe' },
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    // do whatever with stdout
  },
);