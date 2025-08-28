import Editor from './Editor'
import FileNameList from './FileNameList'

export default function CodeEditor() {
    const file = {
        name: 'abc.tsx',
        language: 'typescript',
        value: `export default function App() {
      return (
        <div>xxx</div>
      )
    }
    `
    }
    const onEditorChange = (value: string) => {
        console.log(value)
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <FileNameList />
            <Editor
                file={file}
                options={{
                    theme: 'vs-dark',
                }}
                onChange={onEditorChange}
            />
        </div>
    )
}