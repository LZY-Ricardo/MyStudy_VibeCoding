import Editor from './Editor'
import FileNameList from './FileNameList'
import { useContext } from 'react'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import { debounce } from 'lodash-es'

export default function CodeEditor() {
    const { 
        files, 
        setFiles,
        selectedFileName,
    } = useContext(PlaygroundContext)
    const file = files[selectedFileName]
    const onEditorChange = (value: string) => {
        console.log('编辑器内容变化:', value)
        // 创建新的files对象，确保React能检测到状态变化
        const newFiles = {
            ...files,
            [selectedFileName]: {
                ...files[selectedFileName],
                value: value
            }
        }
        setFiles(newFiles)
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <FileNameList />
            <Editor
                file={file}
                onChange={debounce(onEditorChange, 500)}
            />
        </div>
    )
}