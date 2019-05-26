const { join, resolve } = require('path');
const fs = require('fs');
const {
  createReadStream,
  readdirSync,
  statSync,
  existsSync,
  readFileSync
} = require('fs');

const readFilesRecursively = (distPath, fullDistPath) => {
  fullDistPath = fullDistPath || distPath;
  let filesMapped = [];
  const files = readdirSync(distPath);
  if (!files.length) return filesMapped;
  for (let i = 0; i < files.length; i++) {
    const file = resolve(distPath, files[i]);

    const stat = statSync(file);

    if (stat && stat.isDirectory()) {
      const results = readFilesRecursively(file, fullDistPath);

      filesMapped = [...filesMapped, ...results];
    } else {
      const filesSplited = file.split(`${fullDistPath}/`);
      const fileMapped = filesSplited[1].replace('/', '-');
      filesMapped.push(fileMapped);
    }
  }
  return filesMapped;
}

const getFileByName = (fullpath, filename) => {
  const pathMapped = join(fullpath, filename);
  const isExist = existsSync(pathMapped);
  if (isExist) {
      return readFileSync(pathMapped, 'utf8')
  }

  throw new Error('Path specified is not a file');
}

const getFileByNameStreaming = (fullpath, filename) => {
  const pathMapped = join(fullpath, filename);
  const isExist = existsSync(pathMapped);
  if (isExist) {
    return createReadStream(pathMapped);
  }

  throw new Error('Path specified is not a file');
}

const getDirectoriesName = (pathDir) => {
  const directoriesNames = [];
  const files = readdirSync(pathDir);
  for (let i = 0; i < files.length; i++) {
    const file = resolve(pathDir, files[i]);
    const stat = statSync(file);
    if (stat && stat.isDirectory()) {
      directoriesNames.push(files[i])
    }
  }

  return directoriesNames;
}

module.exports = {
  getDirectoriesName,
  getFileByName,
  getFileByNameStreaming,
  readFilesRecursively
}