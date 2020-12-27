const fs = require('fs');
const path = require('path');
const { SourceMapConsumer } = require('source-map');
const { promisify } = require('util');

// 检测manifest文件
const isManifest = p => /manifest\.json/.test(p);

// 从sourcemap目录中找到sourcemap文件
const findManifest = baseDir => {
  const files = fs.readdirSync(baseDir);

  if (files.some(f => isManifest(f))) {
    return path.join(baseDir, files.filter(f => isManifest(f))[0]);
  }

  files.forEach(f => {
    if (notStrictlyIsDir(f)) {
      findManifest(path.join(baseDir, f));
    }
  });
};

/**
 * 获取源码位置
 * @param {sourcemap路径} sourcemap
 * @param {行号} line
 * @param {列号} col
 *
 * 通过 sourec-map 来解析错误源码
 */
const getOriginalPosition = async (sourcemap, line, column) => {
  const readFile = promisify(fs.readFile);
  const content = await readFile(sourcemap, 'utf8');
  const consumer = await new SourceMapConsumer(content, null);
  const parseData = consumer.originalPositionFor({ line, column });
  consumer.destroy();
  return parseData;
};

const getOriginSource = sourceMapPath => async (filename, colno, lineno) => {
  // 读取sourceMap文件
  const mapFile = `${sourceMapPath}/${filename}.map`;
  const readFile = promisify(fs.readFile);
  const content = await readFile(sourcemap, 'utf8');

  const parseData = consumer.originalPositionFor({ line, column });
  consumer.destroy();
  return parseData;
};


module.exports = { getOriginSource, getOriginalErrorStack };


// setTimeout(async () => { await getOrigin('bundle.2782550ae6ed279a38be.js', 5, 12012) })
