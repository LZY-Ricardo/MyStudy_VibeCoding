import { ENTRY_FILE_NAME } from '../../ReactPlayground/files'
import { type Files, type File } from '../../ReactPlayground/PlaygroundContext'
import { transform } from '@babel/standalone'

export const beforeTransform = (filename: string, code: string) => {
    let _code = code
    const regexReact = /import\s+React/g
    if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
        _code = `import React from 'react';\n${_code}`
    }
    return _code
}

export const babelTransform = (filename: string, code: string, files: Files) => {
    // 将 code 进行编译
    let _code = beforeTransform(filename, code) // 处理 import React from 'react' 没有则引入
    let result = ''
    try {
        result = transform(_code, {
            filename,
            presets: ['react', 'typescript'],
            plugins: [customResolver(files)], // 将 from './App.tsx' 替换为 from 'blob://xxxxx'
            retainLines: true, // 保持格式不变
        }).code!
        return result
    } catch (error) {
        console.error('babelTransform error', error)
    }
}

// 手搓一个编译函数
export const compile = (files: Files) => {
    const main = files[ENTRY_FILE_NAME]
    return babelTransform(ENTRY_FILE_NAME, main.value, files)
}


// 自定义 babel 插件 用于将 import 语句中的路径替换为 blob: 开头的路径
function customResolver(files: Files) {
    return {
        visitor: {
            ImportDeclaration(path: any) {
                // console.log(path.node.source.value);
                const modulePath = path.node.source.value
                if (modulePath.startsWith('.')) {
                    const file = getModuleFile(files, modulePath) // ./App
                    if (!file) return
                    if (file.name.endsWith('.css')) {
                        path.node.source.value = css2JS(file) // blob:http://localhost:5173/b6c45088-51b6-4486-a1e4-1073b60eaa47
                    } else if (file.name.endsWith('.json')) {
                        path.node.source.value = json2JS(file)
                    } else { // 'xx.tsx'
                        path.node.source.value = URL.createObjectURL(
                            new Blob([babelTransform(file.name, file.value, files) || ''], { type: 'application/javascript'})
                        )
                    }
                }
            }
        }
    }
}


export function getModuleFile(files: Files, modulePath: string) {
    let moduleName = modulePath.split('./').pop() || ''
    if (!moduleName.includes('.')) {
        const realModuleName = Object.keys(files).filter(key => {
            return key.endsWith('.ts') || key.endsWith('.tsx') || key.endsWith('.js') || key.endsWith('.jsx')
        }).find(key => {
            return key.split('.')[0].includes(moduleName)
        })
        if (realModuleName) {
            moduleName = realModuleName
        }
    }
    return files[moduleName]
}

export function css2JS(file: File) {
    // const js = `export default ${file.value}`
    const randomId = new Date().getTime()
    const js = `
    (() => {
      const style = document.createElement('style')
      style.setAttribute('id', 'style_${randomId}_${file.name}')
      document.head.appendChild(style)

      const styleText = document.createTextNode(\`${file.value}\`)
      style.innerHTML = ''
      style.appendChild(styleText)
    })()
  `
    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

export function json2JS(file: File) {
    const js = `export default ${file.value}`
    return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))  
}









