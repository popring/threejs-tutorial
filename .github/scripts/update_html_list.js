const fs = require('fs');
const path = require('path');

// 扫描目录下的 HTML 文件
function scanHtmlFiles(dirPath, baseDir = '') {
  const htmlFiles = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const relativePath = path.join(baseDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 递归扫描子目录
        const subFiles = scanHtmlFiles(fullPath, relativePath);
        htmlFiles.push(...subFiles);
      } else if (item.endsWith('.html')) {
        // 找到 HTML 文件
        htmlFiles.push({
          path: relativePath,
          name: path.basename(item, '.html'),
          fullPath: fullPath
        });
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error.message);
  }
  
  return htmlFiles;
}

// 按目录分组 HTML 文件
function groupByDirectory(files) {
  const groups = {};
  
  for (const file of files) {
    let groupKey = path.dirname(file.path);
    
    // 对于 journey 目录下的文件，都归到 journey 分组
    if (file.path.startsWith('journey/')) {
      groupKey = 'journey';
    }
    // 对于 packages 目录下的文件，按 packages 下一层文件夹分组
    else if (file.path.startsWith('packages/')) {
      const pathParts = file.path.split('/');
      if (pathParts.length >= 2) {
        groupKey = `packages/${pathParts[1]}`; // packages/xxx 作为分组
      }
    }
    
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(file);
  }
  
  return groups;
}

// 生成 Markdown 列表
function generateMarkdownList(groups) {
  let markdown = '\n';
  
  // 按目录名排序
  const sortedDirs = Object.keys(groups).sort();
  
  for (const dir of sortedDirs) {
    const files = groups[dir];
    
    // 使用目录名作为标题
    const dirName = path.basename(dir);
    markdown += `### ${dirName}\n\n`;
    
    // 按文件名排序
    files.sort((a, b) => a.name.localeCompare(b.name));
    
    for (const file of files) {
      // 使用绝对路径，文件名取文件夹名称
      let displayName = file.name === 'index' ? dirName : file.name;
      
      // 对于 journey 目录下的文件，使用上一层的上一层文件夹名称
      if (file.path.startsWith('journey/')) {
        const pathParts = file.path.split('/');
        if (pathParts.length >= 3) {
          displayName = pathParts[1]; // 获取 journey/xxx/src 中的 xxx
        }
      }
      
      const filePath = `./${file.path}`;
      markdown += `- [${displayName}](${filePath})\n`;
    }
    
    markdown += '\n';
  }
  
  return markdown;
}

// 更新 README 文件
function updateReadme(htmlList) {
  const readmePath = path.join(__dirname, '../../README.md');
  
  try {
    let content = fs.readFileSync(readmePath, 'utf8');
    
    // 查找占位符
    const startMarker = '<!-- HTML_LIST_START -->';
    const endMarker = '<!-- HTML_LIST_END -->';
    
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
      console.error('Could not find HTML list markers in README.md');
      return;
    }
    
    if (startIndex >= endIndex) {
      console.error('Invalid marker order in README.md');
      return;
    }
    
    // 替换占位符之间的内容
    const beforeContent = content.substring(0, startIndex + startMarker.length);
    const afterContent = content.substring(endIndex);
    
    const newContent = beforeContent + htmlList + afterContent;
    
    // 写入文件
    fs.writeFileSync(readmePath, newContent, 'utf8');
    console.log('README.md updated successfully');
    
  } catch (error) {
    console.error('Error updating README.md:', error.message);
  }
}

// 主函数
function main() {
  console.log('Scanning for HTML files...');
  
  const baseDir = path.join(__dirname, '../../');
  const journeyDir = path.join(baseDir, 'journey');
  const packagesDir = path.join(baseDir, 'packages');
  
  let allHtmlFiles = [];
  
  // 扫描 journey 目录
  if (fs.existsSync(journeyDir)) {
    console.log('Scanning journey directory...');
    const journeyFiles = scanHtmlFiles(journeyDir, 'journey');
    allHtmlFiles.push(...journeyFiles);
  }
  
  // 扫描 packages 目录
  if (fs.existsSync(packagesDir)) {
    console.log('Scanning packages directory...');
    const packagesFiles = scanHtmlFiles(packagesDir, 'packages');
    allHtmlFiles.push(...packagesFiles);
  }
  
  console.log(`Found ${allHtmlFiles.length} HTML files`);
  
  if (allHtmlFiles.length === 0) {
    console.log('No HTML files found');
    return;
  }
  
  // 按目录分组
  const groups = groupByDirectory(allHtmlFiles);
  
  // 生成 Markdown 列表
  const markdownList = generateMarkdownList(groups);
  
  // 更新 README
  updateReadme(markdownList);
  
  console.log('HTML list generation completed');
}

// 运行脚本
if (require.main === module) {
  main();
} 