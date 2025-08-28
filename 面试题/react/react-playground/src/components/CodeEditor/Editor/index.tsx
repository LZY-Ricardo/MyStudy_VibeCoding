import { Editor as MonacoEditor } from '@monaco-editor/react'
import type { OnMount, EditorProps } from '@monaco-editor/react'
import { editor } from 'monaco-editor'
import { createATA } from '../ata'

// 定义文件类型
interface EditorFile {
    name: string
    value: string
    language: string
}

// 定义组件Props接口
interface Props {
    file: EditorFile,
    onChange?: EditorProps['onChange'],
    options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
    const { file, onChange, options } = props
//     const code =
//         `export default function App() {
//   return (
//         <div>
//             <h1>Hello, world!</h1>
//         </div>
//     )
// }`
    const handleEditorMount: OnMount = (editor, monaco) => {
        // 配置TypeScript编译选项 让编辑器支持jsx
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            target: monaco.languages.typescript.ScriptTarget.Latest,
            allowJs: true,
        })

        // 创建ATA实例用于自动类型获取
        const ata = createATA((code, path) => {
            try {
                // 确保路径格式正确，避免 inmemory://model 错误
                const uri = path.startsWith('file://') ? path : `file://${path}`
                // 检查是否已存在相同的库，避免重复添加
                const existingLibs = monaco.languages.typescript.typescriptDefaults.getExtraLibs()
                if (!existingLibs[uri]) {
                    monaco.languages.typescript.typescriptDefaults.addExtraLib(code, uri)
                }
            } catch (error) {
                console.warn('添加类型库时出错:', error)
            }
        })

        // 监听编辑器内容变化，触发类型获取
        editor.onDidChangeModelContent(() => {
            try {
                ata(editor.getValue())
            } catch (error) {
                console.warn('ATA处理时出错:', error)
            }
        })
        ata(editor.getValue())
    }
    return (
        <MonacoEditor
            path={file.name}
            height="100%"
            language={file.language}
            value={file.value}
            options={{
                minimap: {
                    enabled: false,
                },
                fontSize: 16,
                scrollBeyondLastLine: false,
                scrollbar: {
                    verticalSliderSize: 6,
                    horizontalSliderSize: 6,
                    vertical: 'auto',
                    horizontal: 'auto',
                },
                ...options,
            }}
            onMount={handleEditorMount}
            onChange={onChange}
        />
    )
}
